import React from "react";
import axios from "axios";
import Select from "react-select";
import QuoteOptions from "../QuoteOptions/QuoteOptions";

export default function BridgeForm() {
  const supportedCoins = [
    { value: "apple", label: "Apple", icon: "🍎" },
    { value: "banana", label: "Banana", icon: "🍌" },
    { value: "cherry", label: "Cherry", icon: "🍒" },
  ];
  const checkOXAPI = async () => {
    const params = {
      sellToken: "0x6B175474E89094C44Da98b954EedeAC495271d0F", //DAI
      buyToken: "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2", //WETH
      sellAmount: "100000000000000000000", // Note that the DAI token uses 18 decimal places, so `sellAmount` is `100 * 10^18`.
      takerAddress: "0xAb5801a7D398351b8bE11C439e05C5B3259aeC9B", //Including takerAddress is required to help with gas estimation, catch revert issues, and provide the best price
    };

    const headers = {
      "0x-api-key": "e811a2f9-0ee4-4a98-8a66-a13d1d22d8e7",
    };

    const response = await axios.get("https://api.0x.org/swap/v1/price", {
      params,
      headers,
    });
    console.log(response.data);
  };

  return (
    <div className="content p-4 rounded-lg w-[100%] min-w-[400px] lg:w-[420px] sm:w-[420px]">
      <h1 className="text-2xl font-semibold	text-center mb-4">
        Bridge anytime, anywhere.
      </h1>
      <div className="bridge-box text-center bg-slate-800 p-5 rounded-lg">
        <div className="flex justify-between px-2 mb-4 items-center rounded-lg text-white bg-slate-700">
          <p className="font-extrabold">Blockchain Network </p>
          <Select
            isSearchable
            className="coin-selector w-fit p-2"
            placeholder="Select Network"
            // value={supportedCoins[0]}
            options={supportedCoins}
          />
        </div>
        <QuoteOptions type="sell" supportedCoins={supportedCoins} />
        &darr;
        <QuoteOptions type="buy" supportedCoins={supportedCoins} />
        <button className="bg-purple-500 w-100" onClick={checkOXAPI}>
          Bridge
        </button>
      </div>
    </div>
  );
}
