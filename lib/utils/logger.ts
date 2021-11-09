import { resolve } from 'path';
import winston, { format } from 'winston';

let transports = [
    new winston.transports.File({
        filename: resolve('logs/error.log'),

        level: 'error',
    }),
    new winston.transports.File({ filename: resolve('logs/combined.log') }),
    new winston.transports.Console({
        format: winston.format.combine(winston.format.colorize(), winston.format.simple()),
    }),
];
const logger = winston.createLogger({
    level: 'info',
    format: format.combine(format.timestamp(), format.json()),
    transports: transports,
});

export default logger;
