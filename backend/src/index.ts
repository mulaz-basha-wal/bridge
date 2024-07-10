import http from 'http';
import app from './app';
import rootRouter from './routes';
const debug = require('debug')('bridge:root');

async function init(): Promise<undefined> {
  debug('App initiated...');
  if (!process.env.NODE_ENV) process.env.NODE_ENV = 'development';

  debug('Loading env configuration...');
  require('dotenv').config();
  debug(`App name ${process.env.APP_NAME}`);
  debug('Env loading and setup completed');

  const PORT = process.env.SERVER_PORT ?? 786;
  if (process.env.NODE_ENV !== 'test') {
    app.use('/', rootRouter);
    
    const server = http.createServer(app);
    server.listen(PORT, () => {
      debug(`Server started on port ${PORT}...`);
    });

    process.on('exit', code => {
      debug('Process exit event with code: ', code);
    });

    process.on('unhandledRejection', (reason, promise) => {
      debug('unhandledRejection triggered', reason);
      process.exit(0);
    });

    process.on('uncaughtException', (err, origin) => {
      debug('uncaughtException triggered', err, origin);
      process.exit(0);
    });
  }
  debug('Application loading completed');
}

init();
