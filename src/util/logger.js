import winston from 'winston';

const timestamp = new Date().toISOString();
const format = winston.format.printf(function(info) {
  return `[${info.level}]-${timestamp}: ${info.message}`;
});

winston.addColors({
  silly: 'magenta',
  debug: 'blue',
  verbose: 'green',
  info: 'cyan',
  warn: 'yellow',
  error: 'red'
});

const logger = winston.createLogger({
  transports: [
    new winston.transports.Console({
      level: 'info',
      format: winston.format.combine(winston.format.colorize(), format)
    })
  ]
});

export default logger;
