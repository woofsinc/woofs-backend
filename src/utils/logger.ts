import { formatISO } from "date-fns";
import winston from "winston";
import WinstonDailyRotateFile from "winston-daily-rotate-file";

export const logger = winston.createLogger({
  format: winston.format.combine(
    winston.format.timestamp({ format: formatISO(new Date()) }),
    winston.format.json(),
    winston.format.colorize(),
  ),
  level: "debug",
  transports: [
    new WinstonDailyRotateFile({
      auditFile: "./log/audit.json",
      datePattern: "YYYY-MM-DD",
      filename: "./log/app-%DATE%.log",
      maxFiles: "3d",
      maxSize: "10m",
    }),
  ],
});

const myFormat = winston.format.printf(({ level, message, timestamp }) => {
  return `{${timestamp}} ${level}: ${message}`;
});

if (process.env.NODE_ENV !== "production") {
  logger.add(
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.timestamp({ format: formatISO(new Date()) }),
        myFormat,
      ),
    }),
  );
}
