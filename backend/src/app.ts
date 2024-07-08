import path from 'path';
import cors from 'cors';
import bodyParser from 'body-parser';
import compression from 'compression';
import cookieParser from 'cookie-parser';
import RateLimiter from './middlewares/rateLimiter';
import express, { Request, Response } from 'express';
import loggerM from './middlewares/logger';
import helmet from 'helmet';

const app = express();
app.use(loggerM);
app.use(RateLimiter);
app.use(compression());
app.use(express.json());
app.use(cookieParser());
app.use(helmet.hidePoweredBy())
app.use(cors({ credentials: true }));
app.use(bodyParser.json({ limit: '1MB' }));
app.use(express.urlencoded({ extended: false }));
app.use('/static', express.static(path.join(__dirname, 'public')));

app.get('/status', function (req: Request, res: Response) {
  res.status(200).json({ code: 200, message: 'System is running' });
});

export default app;
