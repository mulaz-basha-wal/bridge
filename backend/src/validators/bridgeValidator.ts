import Joi from "joi";
import { Request, Response, NextFunction } from "express";

export const validateBridgeTokens = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const schema = Joi.object().keys({});
  const { error } = schema.validate(req.query);
  if (error) {
    res.status(422).json({
      message: error.message,
    });
  } else {
    next();
  }
};

export const validateBridgeNetworks = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const schema = Joi.object().keys({});
  const { error } = schema.validate(req.query);
  if (error) {
    res.status(422).json({
      message: error.message,
    });
  } else {
    next();
  }
};

export const validateBridgeListOfTokens = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const schema = Joi.object().keys({
    network: Joi.string().required(),
  });
  const { error } = schema.validate(req.query);
  if (error) {
    res.status(422).json({
      message: error.message,
    });
  } else {
    next();
  }
};

export const validateGetQuote = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const schema = Joi.object().keys({
    sellToken: Joi.string().required(),
    buyToken: Joi.string().required(),
    sellAmount: Joi.string().required(),
    networkId: Joi.number().required(),
    decimals: Joi.number().required()
  });
  const { error } = schema.validate(req.query);
  if (error) {
    res.status(422).json({
      message: error.message,
    });
  } else {
    next();
  }
};
