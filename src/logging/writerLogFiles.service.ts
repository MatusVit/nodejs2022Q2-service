import { existsSync, mkdirSync, writeFileSync } from 'fs';
import { writeFile } from 'fs/promises';
import { resolve } from 'path';

export class LogFileWriter {
  static instance: LogFileWriter;
  logDir: string;
  maxLogFileSize: number;
  currentLogFilePath: string;

  constructor() {
    LogFileWriter.instance = this;
    this.logDir = process.env.LOG_DIR || './logs';
    this.maxLogFileSize = +process.env.MAX_LOG_FILE_SIZE || 1024;
    this.currentLogFilePath = this.createFile(this.logDir);
  }

  async writeLog(log: string) {
    await writeFile(this.currentLogFilePath, log, { flag: 'a' });
  }

  private getFileSize() {}

  private createFile(logDir: string) {
    const pathDir = resolve(logDir);
    if (!existsSync(pathDir)) {
      mkdirSync(pathDir, { recursive: true });
    }

    const nameFile = `log-[${new Date().toISOString().replace(/:/g, '-')}].txt`;
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
