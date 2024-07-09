import React from "react";
import PropTypes from "prop-types";

export default function QuoteOptions({ type, children, onChangeHandler, value, disabled }) {
  
  const handleChange = (e) => {
    e.preventDefault();
    const num = Number(e.target.value);
    if (typeof num === 'number') {
      onChangeHandler(num);
    }
  };

  return (
    <div className="p-2 rounded-lg bg-slate-700">
      <p className="capitalize text-left text-sm font-medium mb-1 pl-1">
        {type}
      </p>
      <div className="flex mr-2">
        <input
          type="number"
          disabled={disabled}
          className="quote-input w-[75%] p-2 mr-1 text-white bg-slate-700 font-extrabold text-xl"
          min={0}
          value={value}
          onInput={handleChange}
        />
        {children}
      </div>
    </div>
  );
}

QuoteOptions.propTypes = {
  type: PropTypes.string.isRequired,
  children: PropTypes.node,
};
