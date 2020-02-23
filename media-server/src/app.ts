import express from 'express';
import * as bodyParser from 'body-parser';
import cors from 'cors';
import {MainController} from './main.controller'
import mongoose from 'mongoose';
import {initialize} from 'express-openapi';
import Iconfig from 'config';



export class App{

        public app: express.Application;
        public port:number;
        public controller: MainController;


        constructor(){
            this.app = express();

            this.port = Iconfig.get('Backend.BACKEND_SERVER_PORT');
            this.configure();
            this.mongoConfig();


            this.controller = new MainController(this.app);



        }

        private configure(): void{


            // support application/json type post data
            this.app.use(bodyParser.json());


            // support x-www-form-urlencoded format
            this.app.use(bodyParser.urlencoded({ limit: '100mb', extended:true}));

            // Enables cors
            this.app.use(cors());

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

        public listen(){
            this.app.listen(this.port,() =>{
                // tslint:disable-next-line
                console.log(`Server listening at http://localhost:${this.port}`);
            });

        }



}






