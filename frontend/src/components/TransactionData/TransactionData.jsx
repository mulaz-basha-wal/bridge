import React from "react";
import { numberFormatter } from "../../utils/commonUtils";

export default function TransactionData({from, to, quote}) {
  return (
    <>
      <p className="text-white-500 text-xs py-2 pl-2 text-left">
        1 {from.label} = {numberFormatter(quote.price)} {to.label}
      </p>
      <div className="grid grid-cols-2 text-left m-2 text-xs font-semibold">
        <p>Fee</p>
        <p className="text-right">{numberFormatter(quote.fee, true)}</p>
        <p>Max. slippage:</p>
        <p className="text-right">
          {numberFormatter(quote.estimatedPriceImpact)}%
        </p>
        <p>Network cost:</p>
        <p className="text-right">{numberFormatter(quote.gasPrice, true)}</p>
      </div>
    </>
  );
}
