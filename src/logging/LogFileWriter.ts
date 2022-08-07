import { existsSync, mkdirSync, statSync, writeFileSync } from 'fs';
import { writeFile, stat } from 'fs/promises';
import { resolve } from 'path';
import { LOG_TYPE } from 'src/constants/commons';

export class LogFileWriter {
  static instance: LogFileWriter;
  logDir: string;
  maxLogFileSize: number;
  currentLogFilePath: string;
  currentErrorFilePath: string;

  constructor() {
    LogFileWriter.instance = this;
    this.logDir = process.env.LOG_DIR || './logs';
    this.maxLogFileSize =
      +process.env.MAX_LOG_FILE_SIZE * 1024 - 1024 || 10 * 1024;
    this.currentLogFilePath = this.createFile(LOG_TYPE.LOG);
    this.currentErrorFilePath = this.createFile(LOG_TYPE.ERROR);
  }

  async writeLog(log: string) {
    await writeFile(this.currentLogFilePath, log, { flag: 'a' });
    const { size } = statSync(this.currentLogFilePath);
    if (size > this.maxLogFileSize) {
      this.currentLogFilePath = this.createFile(LOG_TYPE.LOG);
    }
  }

  async writeError(log: string) {
    await writeFile(this.currentErrorFilePath, log, { flag: 'a' });
    const { size } = statSync(this.currentErrorFilePath);
    if (size > this.maxLogFileSize) {
      this.currentErrorFilePath = this.createFile(LOG_TYPE.ERROR);
    }
  }

  private createFile(type: LOG_TYPE) {
    const pathDir = resolve(this.logDir);
    if (!existsSync(pathDir)) {
      mkdirSync(pathDir, { recursive: true });
    }
    const nameFile = `${type}-[${new Date()
      .toISOString()
      .replace(/:/g, '-')}].log`;
    const path = resolve(this.logDir, nameFile);
    writeFileSync(path, '');
    return path;
  }

  static getInstance() {
    if (!LogFileWriter.instance) {
      LogFileWriter.instance = new LogFileWriter();
    }
    return LogFileWriter.instance;
  }
}
