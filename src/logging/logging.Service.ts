import { ConsoleLogger, Injectable, Scope } from '@nestjs/common';
import { getLogLevels } from 'src/common/utils/log.utils';
import { LOG_TYPE } from 'src/constants/commons';
import { LogFileWriter } from './LogFileWriter';

@Injectable({ scope: Scope.TRANSIENT })
export class LoggingService extends ConsoleLogger {
  writerToFile: LogFileWriter;

  constructor() {
    super();
    this.setLogLevels(getLogLevels(+process.env.LOG_LEVEL));
    this.writerToFile = LogFileWriter.getInstance();
  }

  debug(message, ...optionalParams) {
    if (!this.isLevelEnabled('debug')) {
      return;
    }
    this.writerToFile.writeLog(this.getMessage(message, ' ', LOG_TYPE.DEBUG));
    super.debug(message, ...optionalParams);
  }

  log(message, ...optionalParams): void {
    if (!this.isLevelEnabled('log')) {
      return;
    }
    this.writerToFile.writeLog(this.getMessage(message, ' ', LOG_TYPE.LOG));
    super.log(message, ...optionalParams);
  }

  warn(message, ...optionalParams): void {
    if (!this.isLevelEnabled('warn')) {
      return;
    }
    this.writerToFile.writeLog(this.getMessage(message, ' ', LOG_TYPE.WARN));
    super.log(message, ...optionalParams);
  }

  error(message, ...optionalParams): void {
    if (!this.isLevelEnabled('error')) {
      return;
    }
    const log = this.getMessage(message, ' ', LOG_TYPE.ERROR);
    this.writerToFile.writeLog(log);
    this.writerToFile.writeError(log);
    super.error(message, ...optionalParams);
  }

  private getMessage(message, context = '', logLevel = 'LOG') {
    return `[${new Date().toISOString()}] - ${logLevel} [${context}] ${message}\n`;
  }
}
