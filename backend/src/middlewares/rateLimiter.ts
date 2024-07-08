import { Request, Response, NextFunction } from "express";
import { RateLimiterMemory } from "rate-limiter-flexible";

const rateLimiterOptions = { points: 2, duration: 1 };
const rateLimiter = new RateLimiterMemory(rateLimiterOptions);

const RateLimiter = (req: Request, res: Response, next: NextFunction) => {
  if (req.path.startsWith("/static")) return next();
  else
    return rateLimiter
      .consume(req.ip ?? "")
      .then((resp) => {
        next();
        return resp;
      })
      .catch(() => {
        res.status(429).json({
          code: 429,
          message: "Too Many Requests",
        });
      });
};

export default RateLimiter;
