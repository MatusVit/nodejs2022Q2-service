import { ConsoleLogger, Injectable, Scope } from '@nestjs/common';
import { getLogLevels } from 'src/common/utils/log.utils';
import { LogFileWriter } from './writerLogFiles.service';

const LOG_TYPE = {
  VERBOSE: 'VERBOSE',
  DEBUG: 'DEBUG',
  LOG: 'LOG',
  WARN: 'WARN',
  ERROR: 'ERROR',
};

@Injectable({ scope: Scope.TRANSIENT })
export class LoggingService extends ConsoleLogger {
  writerToFile: LogFileWriter;

  constructor() {
    super();
    this.setLogLevels(getLogLevels(+process.env.LOG_LEVEL));
    this.writerToFile = LogFileWriter.getInstance();
  }

  debug(message, ...optionalParams) {
    this.writerToFile.writeLog(this.getMessage(message, ' ', LOG_TYPE.DEBUG));
    super.debug(message, ...optionalParams);
  }

  log(message, ...optionalParams): void {
    this.writerToFile.writeLog(this.getMessage(message, ' ', LOG_TYPE.LOG));
    super.log(message, ...optionalParams);
  }

  warn(message, ...optionalParams): void {
    this.writerToFile.writeLog(this.getMessage(message, ' ', LOG_TYPE.WARN));
    super.log(message, ...optionalParams);
  }

  error(message, ...optionalParams): void {
    this.writerToFile.writeLog(this.getMessage(message, ' ', LOG_TYPE.WARN));
    super.error(message, ...optionalParams);
  }

  private getMessage(message, context = '', logLevel = 'LOG') {
    return `[${new Date().toISOString()}] - ${logLevel} [${context}] ${message}\n`;
  }
}
