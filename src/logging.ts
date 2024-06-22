import {
  createLogger as createWinstonLogger,
  format,
  transports
} from 'winston';

export const createLogger = (serviceName: string) => {
  const logger = createWinstonLogger({
    format: format.combine(format.timestamp(), format.logstash()),
    defaultMeta: { serviceName },
    transports: [
      new transports.Console(),
      new transports.File({ dirname: 'logs', filename: 'combined.log' })
    ]
  });

  return logger;
};
