import {
  errorObjectHandler,
  oXSwapNumberConverter,
} from "../utils/commonUtils";
import { BRIDGE_NETWORKS, TOKENS } from "../utils/constants";
import axios from "axios";
import { Request, Response, NextFunction } from "express";

export const bridgeTokensList = async (req: Request, res: Response) => {
  try {
    res.json({ data: [] });
  } catch (error: any) {
    res.status(500).json(errorObjectHandler(error));
  }
};

export const bridgeNetworksList = async (req: Request, res: Response) => {
  try {
    res.json({ data: BRIDGE_NETWORKS });
  } catch (error: any) {
    res.status(500).json(errorObjectHandler(error));
  }
};

export const bridgeListOfTokens = async (req: Request, res: Response) => {
  try {
    const networkId = Number(req.query.network);
    const result = TOKENS.filter((c) => c.chainId === networkId).map(
      (token) => {
        return {
          chainId: token.chainId,
          address: token.address,
          label: token.symbol,
          decimals: token.decimals,
          logoURI: token.logoURI,
        };
      }
    );
    res.json({ data: result });
  } catch (error: any) {
    res.status(500).json(errorObjectHandler(error));
  }
};

export const bridgeGetQuote = async (req: Request, res: Response) => {
  try {
    const params = req.query;
    delete params.decimals;

    const networkId = Number(req.query.networkId);
    const decimals = Number(req.query.decimals);
    const network = BRIDGE_NETWORKS.find((n) => n.id === networkId);
    const headers = { "0x-api-key": process.env.OX_API_KEY };

    const result = await axios.get(`${network?.link}swap/v1/price`, {
      params: { ...params, skipValidation: true },
      headers,
    });
    const resultRes = result.data;
    const netResult = {
      price: resultRes.price,
      estimatedPriceImpact: resultRes.estimatedPriceImpact,
      toAmount: oXSwapNumberConverter(resultRes.buyAmount),
      gasPrice: resultRes.gasPrice / 10 ** 9,
      fee: oXSwapNumberConverter(resultRes.fees.zeroExFee.feeAmount / 10 ** 9),
    };
    resultRes.netResult = netResult;
    res.status(200).json({ data: netResult });
  } catch (error: any) {
    res.status(500).json(error?.response?.data || error);
  }
};
