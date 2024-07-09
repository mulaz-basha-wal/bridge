import axios from "../api/index";
import { bridge } from "../utils/urlResolver";

export const getNetworkList = () => {
  return axios({
    method: "get",
    url: bridge.networkList,
  });
};

export const getNetworkListOfTokens = (chainId) => {
  return axios({
    method: "get",
    url: bridge.networkListOfTokens,
    params: {
      network: chainId,
    },
  });
};

export const getQuote = (params) => {
  return axios({
    method: "get",
    url: bridge.getQuote,
    params,
  });
};
