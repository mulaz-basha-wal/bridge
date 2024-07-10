import { bridgeGetQuote, bridgeListOfTokens, bridgeNetworksList, bridgeTokensList } from '../controllers/bridgeController';
import { validateBridgeListOfTokens, validateBridgeNetworks, validateBridgeTokens, validateGetQuote } from '../validators/bridgeValidator';
import express from 'express';

const bridgeRouter = express.Router();
bridgeRouter.get("/tokens", validateBridgeTokens, bridgeTokensList);
bridgeRouter.get("/networksList", validateBridgeNetworks, bridgeNetworksList);
bridgeRouter.get("/listOfToken", validateBridgeListOfTokens, bridgeListOfTokens);
bridgeRouter.get("/getQuote", validateGetQuote, bridgeGetQuote);

export default bridgeRouter;