import express from 'express';

const rootRouter = express.Router();
rootRouter.get("/check_me", (req, res) => {
  res.json({
    mag: 'check me'
  })
});

export default rootRouter;