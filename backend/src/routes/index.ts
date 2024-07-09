import express from 'express';
import bridgeRouter from './bridge';

const rootRouter = express.Router();
rootRouter.use("/bridge", bridgeRouter);

export default rootRouter;