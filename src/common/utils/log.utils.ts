import { LogLevel } from '@nestjs/common';

export const getLogLevels = (logLevel: number): LogLevel[] => {
  const logLevelArray: LogLevel[] = [
    'error',
    'warn',
    'log',
    'debug',
    'verbose',
  ];

  return logLevelArray.slice(0, logLevel + 1);
};
