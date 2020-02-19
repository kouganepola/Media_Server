import * as log4js from 'log4js';


class Logger {
    private static logger: Logger | null;


    private constructor() {
          log4js.getLogger('app');
    }

    static getInstance() {
      if (!this.logger) {
        this.logger = new Logger();

      }
      return this.logger;
    }
  }

  // console.log(Singleton.getInstance() === Singleton.getInstance());