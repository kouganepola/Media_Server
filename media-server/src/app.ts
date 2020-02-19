import express from 'express';
import * as bodyParser from 'body-parser';
import cors from 'cors';
import mainController from './main.controller'
import mongoose from 'mongoose';
import {initialize} from 'express-openapi';
import {BACKEND_SERVER_PORT,DB_URL} from './constants'



class App{

        public app: express.Application;
        public port:number;
        public controller: mainController;


        constructor(){
            this.app = express();
            // initialize({

            //     apiDoc: './api-v1/api-doc.js',
            //     app:this.app,
            //     consumesMiddleware: {
            //         'application/json': bodyParser.json(),
            //         'text/text': bodyParser.text()
            //       },
            //     paths: './api-v1/paths',
            //     routesGlob:'**/*.{ts,js}',
            //     routesIndexFileRegExp: /(?:index)?\.[tj]s$/
            //   });
            this.port = BACKEND_SERVER_PORT;
            this.configure();
            this.MongoConfig();


            this.controller = new mainController(this.app);



        }

        private configure(): void{


            // support application/json type post data
            this.app.use(bodyParser.json());


            // support x-www-form-urlencoded format
            this.app.use(bodyParser.urlencoded({ limit: '100mb', extended:true}));

            // Enables cors
            this.app.use(cors());

        }

        private MongoConfig(){
            mongoose.Promise = global.Promise;
            // const options = {
            //     autoReconnect: true,
            //     replicaSet: 'rs0',
            //     useNewUrlParser : true,
            //     useUnifiedTopology : false
            // };
            // mongoose.connect('mongodb://db:27017,db1:27018,db2:27019/MServer',options);

            mongoose.connect(DB_URL,{useNewUrlParser:true});




        }

        public listen(){
            this.app.listen(this.port,() =>{
                // tslint:disable-next-line
                console.log(`Server listening at http://localhost:${this.port}`);
            });

        }



}


export default App;



