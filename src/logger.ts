import { LoggerService as LoggerServiceInterface } from '@nestjs/common';
import { AsyncLocalStorage } from 'async_hooks';
import { randomBytes } from 'crypto';
import Pino, { destination, Level, Logger, LoggerOptions } from 'pino';
import { PrettyOptions } from 'pino-pretty';
import configuration from './config/envs';

const asyncLocalStorage = new AsyncLocalStorage<string>();

export function setTraceId(requestId?: string) {
  const traceId = requestId || randomBytes(16).toString('hex');
  asyncLocalStorage.enterWith(traceId);
  return traceId;
}

const prettyConfig: PrettyOptions = {
  colorize: true,
  levelFirst: true,
  ignore: 'serviceContext',
  translateTime: 'SYS:HH:MM:ss.l',
};

const options: LoggerOptions = {
  level: configuration()['logLevel'],
  base: {
    serviceContext: {
      service: configuration()['applicationName'],
      version: configuration()['version'],
    },
  },
  redact: {
    paths: ['pid', 'hostname', 'body.password'],
    remove: true,
  },
  transport: {
    target: 'pino-pretty',
    options: prettyConfig,
  },
};

const stdout = Pino(options);
const stderr = Pino(options, destination(2));

const logger: Pick<Logger, Level> = {
  trace: stdout.trace.bind(stdout),
  debug: stdout.debug.bind(stdout),
  info: stdout.info.bind(stdout),
  warn: stdout.warn.bind(stdout),
  error: stderr.error.bind(stderr),
  fatal: stderr.fatal.bind(stderr),
};

export default logger;

export class LoggerService implements LoggerServiceInterface {
  error(message: unknown, trace?: string, context?: string) {
    logger.error({
      err: {
        message,
        stack: trace,
        context,
      },
    });
  }

  warn(message: string) {
    logger.warn(message);
  }

  log(message: string) {
    logger.info(message);
  }

  debug(message: string) {
    logger.debug(message);
  }

  verbose(message: string) {
    logger.trace(message);
  }
}
