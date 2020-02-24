import express from 'express';
import * as bodyParser from 'body-parser';
import cors from 'cors';
import {MainController} from './main.controller'
import mongoose from 'mongoose';
import Iconfig from 'config';
import * as log4js from 'log4js';



export class App{

        public app: express.Application;
        public port:number;
        public controller: MainController;
        private log :any
        

        constructor(){
            this.app = express();

            this.port = Iconfig.get('Backend.BACKEND_SERVER_PORT');
            this.loggerConfig();
            this.configure();
            this.mongoConfig();
            
            this.log = log4js.getLogger('app');
            
            this.controller = new MainController(this.app);



        }

        private configure(): void{


            // support application/json type post data
            this.app.use(bodyParser.json());


            // support x-www-form-urlencoded format
            this.app.use(bodyParser.urlencoded({ limit: '100mb', extended:true}));

            // Enables cors
            this.app.use(cors());

            this.app.use(log4js.connectLogger(log4js.getLogger("http"), { level: 'auto' }));

        }

        private mongoConfig(){
            mongoose.Promise = global.Promise;
            // const options = {
            //     autoReconnect: true,
            //     replicaSet: 'rs0',
            //     useNewUrlParser : true,
            //     useUnifiedTopology : false
            // };
            // mongoose.connect('mongodb://db:27017,db1:27018,db2:27019/MServer',options);

            // tslint:disable-next-line
            
            mongoose.connect(Iconfig.get('Backend.DB_URL'),{useNewUrlParser:true});




        }

        private loggerConfig(){

            log4js.configure({
                "appenders": {
                  "access": {
                    "type": "dateFile",
                    "filename": "log/access.log",
                    "pattern": "-yyyy-MM-dd",
                    "category": "http"
                  },
                  "app": {
                    "type": "file",
                    "layout": { 
                      "type": "colored"
                    }, 
                    "filename": "log/app.log",
                    "maxLogSize": 10485760,
                    "numBackups": 3
                  },
                  "errorFile": {
                    "type": "file",
                    "filename": "log/errors.log"
                  },
                  "errors": {
                    "type": "logLevelFilter",
                    "level": "ERROR",
                    "appender": "errorFile"
                  }
                },
                "categories": {
                  "default": { "appenders": [ "app", "errors" ], "level": "DEBUG" },
                  "http": { "appenders": [ "access"], "level": "DEBUG" }
                }
              })
        }

        public listen(){
            this.app.listen(this.port,() =>{
                // tslint:disable-next-line
                console.log(`Server listening at http://localhost:${this.port}`);
                this.log.info(`Server started listening at http://localhost:${this.port}`);
            });

        }



}






