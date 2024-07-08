import React from "react";
import PropTypes from "prop-types";

export default function BlurryFloatDot({ top, left, img }) {
  return (
    <div className="blurry-float-dot" style={{ top: `${top}%`, left: `${left}%` }}>
      {img ? <img src={img} alt="" /> : null}
    </div>
  );
}

BlurryFloatDot.propTypes = {
  top: PropTypes.number.isRequired,
  left: PropTypes.number.isRequired,
  img: PropTypes.string,
};
