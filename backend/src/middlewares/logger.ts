import { DATE_TIME_FORMAT } from '@src/utils/constants';
const logger = require('morgan');
const moment = require('moment-timezone');
const debug = require('debug')('bridge:logger');

if (process.env.ENV !== 'production') {
  logger.token('date', () => moment().format(DATE_TIME_FORMAT));
  logger.token('customURL', (req: any, res: any) => {
    return req.originalUrl.split('?')[0];
  });
}

const loggerM = logger(
  ':date :method :customURL :status :res[content-length] :response-time ms',
  {
    stream: {
      write: function (message: string) {
        debug(message.trim());
      },
    },
  },
);

export default loggerM;