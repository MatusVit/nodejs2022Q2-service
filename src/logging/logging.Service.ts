import { ConsoleLogger, Injectable, Scope } from '@nestjs/common';

@Injectable({ scope: Scope.TRANSIENT })
export class LoggingService extends ConsoleLogger {
  constructor() {
    super();
    this.setLogLevels(['log', 'error', 'warn', 'debug', 'verbose']); // ! *** LogLevel = 'log' | 'error' | 'warn' | 'debug' | 'verbose'
  }

  // TODO *** write to a log files

  // error(message: any, stack?: string, context?: string) {
  //   // add your tailored logic here
  //   super.error(message, stack, context);
  // }

  // log(message: any, context?: string): void {
  //   const newMessage = `>>> ${message}`; // ! ***
  //   super.log(newMessage, context);
  // }

  // debug(message: any, context?: string): void {
  //   const newMessage = `@@@ ${message}`; // ! ***
  //   super.debug(newMessage, context);
  // }
}
