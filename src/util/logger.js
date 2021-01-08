import winston from 'winston';

const timestamp = new Date().toISOString();
const logging = winston.format.printf(function(info) {
  return `[${info.level}]-${timestamp}: ${JSON.stringify(info.message, null, 4)}`;
});

winston.addColors({
  silly: 'magenta',
  debug: 'blue',
  verbose: 'green',
  info: 'cyan',
  warn: 'yellow',
  error: 'red'
});

export const logger = winston.createLogger({
  transports: [
    new winston.transports.Console({
      level: 'info',
      format: winston.format.combine(
          winston.format.colorize(),
          winston.format.splat(),
          logging)
    })
  ]
});

