import {Application} from 'express';
import multer from 'multer';
import userController from './controllers/user.controller';




class Controller {
    private user:userController;
    private upload:any;
    private storage:multer.StorageEngine;

    constructor(private app: Application){

        this.storage = multer.memoryStorage()
        this.upload = multer({storage:this.storage});
        this.user = new userController();
        this.routes();
    }

    public routes(){
        this.app.route('/').get((req,res)=>{
            res.status(200).send('Welcome');
        });
        this.app.post('/signup', this.user.register );
        this.app.post('/login', this.user.logIn);
        this.app.get('/files',this.user.viewDirectory);
        this.app.post('/create-folder',this.user.createFolder);

        this.app.post('/upload',this.upload.single('file'),this.user.uploadFile);
        this.app.delete('/delete',this.user.deleteFile);

        this.app.get('/download',this.user.getFileDataStream);
        this.app.get('/edit',(req,res)=>{
            return res.status(200).send('Welcome Edit');
        });

        this.app.get('/view',this.user.getFileDataStream);

        this.app.get('/view-all-files',this.user.viewAllFiles)
    }
}

export default Controller;