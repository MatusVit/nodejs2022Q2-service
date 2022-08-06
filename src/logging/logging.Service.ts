import { ConsoleLogger } from '@nestjs/common';

export class AppLogger extends ConsoleLogger {
  // error(message: any, stack?: string, context?: string) {
  //   // add your tailored logic here
  //   super.error(message, stack, context);
  // }
  log(message: any, context?: string): void {
    const newMessage = `>>> ${message}`; // ! ***
    super.log(newMessage, context);
  }

  debug(message: any, context?: string): void {
    const newMessage = `@@@ ${message}`; // ! ***
    super.debug(newMessage, context);
  }
}
