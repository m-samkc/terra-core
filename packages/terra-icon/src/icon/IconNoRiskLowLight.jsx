/* eslint-disable */
import React from 'react';
import IconBase from '../IconBase';

const SvgIcon = (customProps) => {
  const attributes = Object.assign({}, customProps);

  return (
    <IconBase {...attributes}>
      <style ></style><path className="st0" d="M24 2c12.1 0 22 9.9 22 22s-9.9 22-22 22S2 36.1 2 24 11.9 2 24 2m0-2C10.7 0 0 10.7 0 24s10.7 24 24 24 24-10.7 24-24S37.3 0 24 0zm-4 36.4L6.7 23.1l3.5-3.5 9.8 9.8 17.7-17.8 3.5 3.5L20 36.4z" ></path>
    </IconBase>
  );
};

SvgIcon.displayName = "IconNoRiskLowLight";
SvgIcon.defaultProps = {"viewBox":"0 0 48 48","xmlns":"http://www.w3.org/2000/svg","id":"Layer_1"};

export default SvgIcon;
/* eslint-enable */
