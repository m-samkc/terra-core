/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import PropTypes from 'prop-types';
import { parse } from 'react-docgen';
import Markdown from 'terra-markdown';
import classNames from 'classnames/bind';
import styles from './PropsTable.module.scss';

const cx = classNames.bind(styles);

const propTypes = {
  /**
   * Title of component
   */
  componentName: PropTypes.string,
  /**
   * Markdown source file
   */
  src: PropTypes.string.isRequired,
};

function formatShape(shape) {
  return JSON.stringify(shape, null, 1);
}

function determineType(type) {
  let typeName = type.name;

  if (typeName === 'enum') {
    typeName = 'enum';
  } else if (typeName === 'arrayOf') {
    if (type.value.name === 'shape') {
      typeName = (
        <span>
          {' '}
array of objects structured like:
          <pre className={cx('props-table-pre')}>
            {' '}
            {formatShape(type.value.value)}
            {' '}
          </pre>
        </span>
      );
    } else {
      typeName = `array of ${type.value.name}s`;
    }
  } else if (typeName === 'union') {
    const options = type.value.map((option) => {
      const name = option.name === 'shape' ? ((
        <span key={option.value}>
          {' '}
an object structured like:
          <pre className={cx('props-table-pre')}>
            {' '}
            {formatShape(option.value)}
            {' '}
          </pre>
        </span>
      )) : (
        <span key={option.name}>
          {' '}
          {option.name}
        </span>
      );
      return name;
    });
    typeName = options.reduce((curr, next) => [curr, <span key={`${curr.value}-${next.value}`}> or </span>, next]);
  } else if (typeName === 'shape') {
    typeName = (
      <span>
        {' '}
an object structured like:
        <pre className={cx('props-table-pre')}>
          {' '}
          {formatShape(type.value)}
          {' '}
        </pre>
      </span>
    );
  }

  return typeName;
}

/**
 * Renders a table view for the props metadata of a react component generated by react-docgen
 */
const PropsTable = ({ componentName, src, ...customProps }) => {
  /**
   * Runs component source code through react-docgen
   * @type {Object}
   */
  const componentMetaData = parse(src);

  /**
   * Alias for props object from componentMetaData
   * @type {Object}
   */
  const componentProps = componentMetaData.props;

  const tableRowClass = cx('prop-table-row');
  const tableClassNames = cx([
    'props-table',
    customProps.className,
  ]);

  return (
    <div dir="ltr" className="markdown-body">
      <h2>
        {componentName}
        {' '}
Props
      </h2>
      <table {...customProps} className={tableClassNames}>
        <thead>
          <tr>
            <th className={cx('prop-table-name')}>Prop Name</th>
            <th className={cx('prop-table-type')}>Type</th>
            <th className={cx('prop-table-required')}>Is Required</th>
            <th className={cx('prop-table-default')}>Default Value</th>
            <th className={cx('prop-table-description')}>Description</th>
          </tr>
        </thead>
        <tbody>
          {Object.keys(componentProps).map((key) => {
            const prop = componentProps[key];
            const type = determineType(prop.type);

            return (
              <tr className={tableRowClass} key={key} style={{ fontSize: '90%' }}>
                <td style={{ fontWeight: 'bold' }}>{key}</td>
                <td>{(prop.type ? type : '')}</td>
                {(prop.required
                  ? <td style={{ color: '#d53700' }}>required</td>
                  : <td style={{ color: '#444' }}>optional</td>)}
                {(prop.defaultValue
                  ? <td style={{ fontWeight: 'bold' }}>{prop.defaultValue.value}</td>
                  : <td style={{ color: '#444' }}>none</td>)}
                <td><Markdown src={prop.description} /></td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

PropsTable.propTypes = propTypes;

export default PropsTable;
