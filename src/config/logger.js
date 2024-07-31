const winston = require('winston');
const path = require('path');

const logLevels = {
    levels: {
        debug: 0,
        http: 1,
        info: 2,
        warning: 3,
        error: 4,
        fatal: 5,
    },
    colors: {
        debug: 'blue',
        http: 'magenta',
        info: 'green',
        warning: 'yellow',
        error: 'red',
        fatal: 'red',
    },
};

winston.addColors(logLevels.colors);

const developmentLogger = winston.createLogger({
    levels: logLevels.levels,
    format: winston.format.combine(
        winston.format.colorize(),
        winston.format.timestamp(),
        winston.format.printf(({ timestamp, level, message }) => `${timestamp} ${level}: ${message}`)
    ),
    transports: [
        new winston.transports.Console({ level: 'debug' }),
    ],
});

const productionLogger = winston.createLogger({
    levels: logLevels.levels,
    format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.json()
    ),
    transports: [
        new winston.transports.Console({ level: 'info' }),
        new winston.transports.File({ filename: path.join(__dirname, '../logs/errors.log'), level: 'error' }),
    ],
});

const logger = process.env.NODE_ENV === 'production' ? productionLogger : developmentLogger;

module.exports = logger;
