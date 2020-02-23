import {Application} from 'express';
import multer from 'multer';
import {FileController} from './file_management/file_controller';
import {UserController} from './user_management/user_controller';



export class MainController {
    private file:FileController;
    private user:UserController;
    private upload:any;
    private storage:multer.StorageEngine;

    constructor(private app: Application){

        this.storage = multer.memoryStorage()
        this.upload = multer({storage:this.storage});
        this.file = new FileController();
        this.user = new UserController();
        this.routes();
    }

    public routes(){
        this.app.route('/').get((req,res)=>{
            res.status(200).send('Welcome');
        });
        this.app.post('/auth/signup',(req,res)=>{ this.user.register(req,res)} );
        this.app.post('/auth/login', (req,res)=>{

            res.status(200).send('Welcome');
            this.user.logIn(req,res)} );

        this.app.get('/file/files',(req,res)=>{

            this.file.viewDirectory(req,res)} );
        this.app.post('/file/create-folder',(req,res)=>{ this.file.createFolder(req,res)} );

        this.app.post('/file/upload',this.upload.single('file'),(req,res)=>{ this.file.uploadFile(req,res)} );
        this.app.delete('/file/delete',(req,res)=>{ this.file.deleteFile(req,res)} );

        this.app.get('/file/download',(req,res)=>{ this.file.getFileDataStream(req,res)} );


        this.app.get('/file/view',(req,res)=>{ this.file.getFileDataStream(req,res)});

        this.app.get('/file/view-all-files',(req,res)=>{


            this.file.viewAllFiles(req,res)})
        this.app.get('/file/edit',(req,res)=>{
            return res.status(200).send('Welcome Edit');
        });
    }
}

