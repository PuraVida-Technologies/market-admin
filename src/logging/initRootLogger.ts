import { createLogger, format, transports, Logger } from "winston";
import { Format } from "logform";

export function initRootLogger(
  prettyLogs: boolean,
  consoleLogLevel: string,
  applicationVersion: string
): Logger {
  let consoleLogFormat: Format;

  /* istanbul ignore next */
  if (prettyLogs) {
    consoleLogFormat = format.combine(
      format.colorize(),
      format.timestamp(),
      format.align(),
      format.printf((info) => {
        const messagePrefix = "";
        return `${info.timestamp} ${info.level}: ${messagePrefix}${info.message}`;
      })
    );
  } else {
    consoleLogFormat = format.json();
  }

  const enabledTransports = [
    new transports.Console({
      level: consoleLogLevel,
      format: consoleLogFormat,
    }),
  ];

  return createLogger({
    level: "debug",
    levels: {
      none: 0,
      alert: 1,
      critical: 2,
      error: 3,
      warn: 4,
      notice: 5,
      info: 6,
      debug: 7,
      trace: 8,
    },
    exitOnError: false,
    defaultMeta: {
      project: "telescope",
      service: "telescope",
      version: applicationVersion,
    },
    transports: enabledTransports,
  });
}
