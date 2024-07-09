import React, { useEffect, useMemo, useState } from "react";
import debounce from "lodash.debounce";
import QuoteOptions from "../QuoteOptions/QuoteOptions";
import {
  getNetworkList,
  getNetworkListOfTokens,
  getQuote,
} from "../../api/bridge";
import TokenSelector from "../TokenSelector/TokenSelector";
import { numberFormatter } from "../../utils/commonUtils";
import TransactionData from "../TransactionData/TransactionData";

export default function BridgeForm() {
  const [quote, setQuote] = useState({});
  const [open, setOpen] = useState(false);
  const [whichModal, setWhichModal] = useState(null);
  const [note, setNote] = useState(null);

  const [fromValue, setFromValue] = useState(0);
  const [toValue, setToValue] = useState(0);

  const [network, setNetwork] = useState({});
  const [supportedNetworks, setSupportedNetworks] = useState([]);

  const [from, setFrom] = useState({});
  const [supportedFrom, setSupportedFrom] = useState([]);

  const [to, setTo] = useState({});
  const [supportedTo, setSupportedTo] = useState([]);

  const fetchNetworkList = async () => {
    try {
      let res = await getNetworkList();
      res = res.data?.data;
      res = res.map((network) => {
        return {
          label: network.name,
          value: network.id,
          icon: network.icon,
        };
      });
      setSupportedNetworks(res);
      setNetwork(res[0]);
    } catch (error) {
      setNote(error.message);
    }
  };

  const fetchNetworkListOfTokens = async (chainId) => {
    if (chainId) {
      try {
        setNote(null);
        setFrom({});
        setTo({});
        let res = await getNetworkListOfTokens(chainId);
        res = res.data.data;
        res = res.map((c) => {
          return {
            label: c.label,
            value: c.address,
            icon: c.logoURI,
            decimal: c.decimals,
          };
        });
        setSupportedFrom(res);
        setFrom(res[0]);
        setSupportedTo(res.filter((c) => c.label !== res[0].label));
      } catch (error) {
        setNote(error.message);
      }
    }
  };

  const onChangeFrom = (coin) => {
    let tempTo = [...supportedFrom];
    tempTo = tempTo.filter((c) => c.label !== coin.label);
    setSupportedTo(tempTo);
    setTo({});
    setToValue(0);
    setQuote({});
  };

  const onChangeTo = async (coin) => {
    if (fromValue > 0) fetchQuoteAPI(coin);
  };

  const fetchQuoteAPI = async (coin) => {
    console.log("🚀 ~ file: BridgeForm.jsx:87 ~ fetchQuoteAPI ~ coin:");
    if (
      fromValue > 0 &&
      to.value &&
      from.value &&
      coin.value &&
      network.value &&
      from.decimal
    ) {
      try {
        setQuote({});
        setNote("Fetching quote details...");
        const res = await getQuote({
          sellToken: from.value,
          buyToken: coin.value,
          sellAmount: fromValue * 10 ** from.decimal,
          networkId: network.value,
          decimals: from.decimal,
        });
        setQuote(res.data.data);
        setToValue(res.data.data.toAmount);
        setNote(null);
      } catch (error) {
        setNote(error.message);
      }
    }
  };

  useEffect(() => {
    fetchNetworkList();
  }, []);

  useEffect(() => {
    fetchNetworkListOfTokens(network.value);
  }, [network]);

  const onFromValueChange = useMemo(
    () =>
      debounce(() => {
        fetchQuoteAPI(to);
      }, 1000),
    [fetchQuoteAPI, to]
  );

  return (
    <div className="content p-4 rounded-lg w-[100%] min-w-[400px] lg:w-[420px] sm:w-[420px]">
      <h1 className="text-2xl font-semibold	text-center mb-4">
        Bridge anytime, anywhere.
      </h1>
      <div className="bridge-box text-center bg-slate-800 p-5 rounded-lg">
        <div className="flex justify-between p-2 mb-4 items-center rounded-lg text-white bg-slate-700">
          <p className="font-extrabold">Blockchain Network </p>
          <div className="flex items-center">
            <button
              className="flex items-center"
              onClick={() => {
                setWhichModal("network");
                setOpen(true);
              }}
            >
              {network.icon ? (
                <img className="img-icon mr-2" src={network.icon} alt="" />
              ) : (
                <p>{network.label}</p>
              )}
            </button>
          </div>
        </div>
        <QuoteOptions
          type="sell"
          value={numberFormatter(fromValue)}
          onChangeHandler={(value) => {
            setFromValue(value);
            onFromValueChange();
          }}
        >
          <button
            className="flex items-center w-fit"
            onClick={() => {
              setWhichModal("from");
              setOpen(true);
            }}
          >
            {from.icon ? (
              <img className="img-icon mr-2" src={from.icon} alt="" />
            ) : null}
            <p>{from.label}</p>
          </button>
        </QuoteOptions>
        &darr;
        <QuoteOptions
          type="buy"
          value={numberFormatter(toValue)}
          disabled
          onChangeHandler={(value) => {
            setToValue(value);
          }}
        >
          {to.label && to.icon ? (
            <button
              className="flex items-center w-fit"
              onClick={() => {
                setWhichModal("to");
                setOpen(true);
              }}
            >
              <img className="img-icon mr-2" src={to.icon} alt="" />
              <p>{to.label}</p>
            </button>
          ) : (
            <button
              className="text-xs"
              onClick={() => {
                setWhichModal("to");
                setOpen(true);
              }}
            >
              Select Token
            </button>
          )}
        </QuoteOptions>
        {fromValue > 0 && to.value && quote.price ? (
          <TransactionData from={from} to={to} quote={quote} />
        ) : null}
        <p className="text-red-500 text-xs py-2">{note}</p>
        <button
          className="bridge bg-purple-500 w-100"
          onClick={() => {
            setWhichModal("confirm");
            setOpen(true);
          }}
          disabled={!(from.label && to.label && fromValue > 0 && toValue > 0)}
        >
          Bridge
        </button>
      </div>

      {whichModal && whichModal === "from" ? (
        <TokenSelector
          isModalOpen={open}
          listLength={supportedFrom.length}
          onClose={() => {
            setOpen(false);
          }}
        >
          <div className="coins-list-menu">
            {supportedFrom.length === 0 ? (
              <div>
                <p>No options</p>
                <button
                  onClick={() => {
                    setOpen(false);
                  }}
                >
                  close
                </button>
              </div>
            ) : (
              supportedFrom.map((n) => {
                return (
                  <button
                    key={n.value}
                    className="flex gap-2 items-center py-2 px-4"
                    onClick={() => {
                      setFrom(n);
                      setOpen(false);
                      onChangeFrom(n);
                    }}
                  >
                    <img className="img-icon" src={n.icon} alt="" />
                    <p>{n.label}</p>
                  </button>
                );
              })
            )}
          </div>
        </TokenSelector>
      ) : null}

      {whichModal && whichModal === "to" ? (
        <TokenSelector
          isModalOpen={open}
          listLength={supportedTo.length}
          onClose={() => {
            setOpen(false);
          }}
        >
          <div className="coins-list-menu">
            {supportedFrom.length === 0 ? (
              <div>
                <p>No options</p>
                <button
                  onClick={() => {
                    setOpen(false);
                  }}
                >
                  close
                </button>
              </div>
            ) : (
              supportedTo.map((n) => {
                return (
                  <button
                    className="flex gap-2 items-center py-2 px-4"
                    onClick={() => {
                      setTo(n);
                      onChangeTo(n);
                      setOpen(false);
                    }}
                  >
                    <img className="img-icon" src={n.icon} alt="" />
                    <p>{n.label}</p>
                  </button>
                );
              })
            )}
          </div>
        </TokenSelector>
      ) : null}

      {whichModal && whichModal === "network" ? (
        <TokenSelector
          isModalOpen={open}
          onClose={() => {
            setOpen(false);
          }}
          listLength={supportedNetworks.length}
        >
          <div className="flex gap-2 items-center justify-center">
            {supportedNetworks.map((n) => {
              return (
                <button
                  className="flex gap-2 items-center py-2 px-4"
                  onClick={() => {
                    setNetwork(n);
                    setOpen(false);
                  }}
                >
                  <img className="img-icon" src={n.icon} alt="" />
                  <p>{n.label}</p>
                </button>
              );
            })}
          </div>
        </TokenSelector>
      ) : null}

      {whichModal && whichModal === "confirm" ? (
        <TokenSelector
          isModalOpen={open}
          onClose={() => {
            setOpen(false);
          }}
        >
          <div className="confirm-menu w-[100%] px-4">
            <h2 className="text-center text-xl font-extrabold my-4">
              Confirm the transaction
            </h2>
            <TransactionData from={from} to={to} quote={quote} />
            <br />
            <div className="flex justify-between mx-10">
              <button
                className="bg-red-500 p-2 rounded-lg"
                onClick={() => {
                  setOpen(false);
                }}
              >
                Cancel
              </button>
              <button
                className="bg-green-500 p-2 rounded-lg"
                onClick={() => {
                  setOpen(false);
                }}
              >
                Confirm
              </button>
            </div>
          </div>
        </TokenSelector>
      ) : null}
    </div>
  );
}
