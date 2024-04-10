import { createLogger, format, transports } from 'winston';
import moment from 'moment';

// set default log level.
const logLevel: string = 'info';

const logger = createLogger({
    level: logLevel,
    levels: {
        fatal: 0,
        crit: 1,
        warn: 2,
        info: 3,
        debug: 4,
        trace: 5,
        http: 6,
    },
    format: format.combine(
        format.colorize(),
        format.prettyPrint(),
        format.timestamp({
            format: 'DD-MM-YYYY hh:mm:ss A'
        }),
        format.printf(nfo => {
            return `[${nfo.level}] - ${nfo.timestamp}: ${nfo.message}`;
        })
    ),
    transports: [
        new transports.Console(),
        new transports.File({
            filename: 'app.log'
        })
    ],
});

// Extend logger object to properly log 'Error' types
const origLog = logger.log;

// @ts-ignore
logger.log = function (level, msg) {
    if (msg instanceof Error) {
        const args = Array.prototype.slice.call(arguments);
        args[1] = msg.stack;
        // @ts-ignore
        origLog.apply(logger, args);
    } else {
        // @ts-ignore
        origLog.apply(logger, arguments);
    }

}

/* LOGGER EXAMPLES
  import logger from './log';
  logger.trace('testing');
  logger.debug('testing');
  logger.info('testing');
  logger.warn('testing');
  logger.crit('testing');
  logger.fatal('testing');
 */

export default logger;
