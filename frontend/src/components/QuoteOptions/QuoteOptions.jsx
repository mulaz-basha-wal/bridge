import React, { useState } from "react";
import Select from "react-select";
import PropTypes from "prop-types";

export default function QuoteOptions({ type, supportedCoins }) {
  const [selectedOption, setSelectedOption] = useState(null);
  const handleChange = (e) => {
    setSelectedOption(e);
  };

  return (
    <div className="p-2 rounded-lg bg-slate-700">
      <p className="capitalize text-left text-sm font-medium mb-1 pl-1">
        {type}
      </p>
      <div className="flex items-center">
        <input
          type="number"
          className="quote-input w-[75%] p-2 mr-1 text-white bg-slate-700 font-extrabold text-xl"
          defaultValue={0}
          min={0}
        />
        <Select
          isSearchable
          className="coin-selector w-fit"
          placeholder="Select Token"
          value={selectedOption}
          options={supportedCoins}
          onChange={handleChange}
        />
      </div>
    </div>
  );
}

QuoteOptions.propTypes = {
  type: PropTypes.string.isRequired,
  supportedCoins: PropTypes.arrayOf(PropTypes.object),
};
