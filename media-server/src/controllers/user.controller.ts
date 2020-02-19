import {Request,Response} from 'express';
import {User, IUser} from '../models/user.model';
import fileController from './file.controller';
import {File, IFile} from '../models/file.model';
import MulterRequest from '../models/multerRequest';
import { Query } from 'mongoose';


class UserController{

    private fileManager:fileController;

    constructor(){

            this.fileManager = new fileController();
            this.register = this.register.bind(this);
            this.uploadFile = this.uploadFile.bind(this);
            this.deleteFile = this.deleteFile.bind(this);
            this.viewDirectory = this.viewDirectory.bind(this);
            this.createFolder = this.createFolder.bind(this);
            this.getFileDataStream = this.getFileDataStream.bind(this);
    }


    public async register(req:Request,res:Response){




        const user = new User({
            username:req.body.username,
            password:req.body.password,
            email:req.body.email,
            rootFolder:req.body.username

        });

        try {

            const registeredUser = await user.save();



            await this.fileManager.createFile(registeredUser._id,'folder','.',registeredUser.username,null);
            // tslint:disable-next-line
            console.log('success')

            return res.status(201).send({success:true,message:'User registered successfully',user:registeredUser});
        } catch (error) {

            // tslint:disable-next-line
            console.log(error);
            return res.set(400).send({success:false,message:'User could not be registered'});

        }





        // TODO: set responses
        // TODO: handle duplications, Invalid email



    }

    public logIn(req:Request,res:Response){

// TODO: set responses
// TODO: send back authToken
// TODO : handle errors properly

        User.findOne({ username: req.body.username }, (err, user: any) => {



            if (user) {
                user.comparePassword(req.body.password, (error: Error, isMatch: boolean) => {
                    if (err) { // tslint:disable-next-line
                        console.log(error);
                        return res.status(500).send({success:false,message:'Something went wrong'});}
                    else if (isMatch) {
                        // tslint:disable-next-line
                        console.log('User logged in successfully')
                        // tslint:disable-next-line
                        console.log(user)
                        return res.send({success:true,message:'User logged in successfully', user});
                    }
                    return res.status(400).send({success:false,message:'Invalid username or password'});
                });


            }
            else{


                return res.status(400).send({success:false,message:'Invalid username or password'});
            }



        });
    }

    public async createFolder(req:Request,res:Response){



        try{
            let parentName = req.body.path.replace('./','').split('/')

            let parentPath = '.';


            if(parentName.length!==1){
                parentPath= ['.',parentName.slice(0,parentName.length-1).join('/')].join('/')




            }

            parentName = parentName[parentName.length-1]


            const parent =  await this.fileManager.searchFile(req.body._id, parentName,parentPath);




             if(parent){

                const duplicateFile = await this.fileManager.searchFile(req.body._id,req.body.fileName,parent.getCompletePath());


            if(!duplicateFile){

                this.fileManager.createFile(req.body._id,'folder',parent.getCompletePath(),req.body.fileName,null);
                return res.send({success:true,message:'Folder created successfully'});

            }

            return res.status(400).send({success:false,message:'A folder with that name already exists.'});
            }

            return res.status(400).send({success:false,message:'The parent folder does not exist.'});



        }catch(error){

            // tslint:disable-next-line
            console.log(error);
            return res.status(500).send({success:false,message:'Folder could not be created'});


        }


    }

    public async uploadFile(req:MulterRequest,res:Response){

        // TODO : handle errors properly




        try{

            let parentName = req.body.path.replace('./','').split('/')

            let parentPath = '.';


            if(parentName.length!==1){
                parentPath= ['.',parentName.slice(0,parentName.length-1).join('/')].join('/')


            }

            parentName = parentName[parentName.length-1]

            const fileToUpload = req.file;
            const parent =  await this.fileManager.searchFile(req.body._id, parentName,parentPath);


             if(parent){

                const duplicateFile = await this.fileManager.searchFile(req.body._id,fileToUpload.originalname,parent.getCompletePath());


            if(!duplicateFile){


                await this.fileManager.createFile(req.body._id,fileToUpload.mimetype,parent.getCompletePath(),fileToUpload.originalname,fileToUpload.buffer,fileToUpload.size);
                return res.send({success:true,message:'File created successfully'});

            }
        }

            return res.status(400).send({success:false,message:'A file with that name already exists.'});

        }catch(error){

            // tslint:disable-next-line
            console.log(error);
            return res.status(500).send({success:true,message:'File could not be created'});


        }


    }


    public async deleteFile(req:Request,res:Response){
            // TODO: handle errors properly

        try{


            const deletedFile = await this.fileManager.deleteFile(req.query.file);

            if (deletedFile){
                return res.send({success:true,message:'File was deleted successfully.'});

            }
            return res.status(400).send({success:false,message:'No such file.'});

        }catch(error){
            // tslint:disable-next-line
            console.log(error);
            return res.status(500).send({success:false,message:'File could not be deleted.'});


        }


    }

    public async viewDirectory(req:Request,res:Response){

        try{

            const files = await this.fileManager.viewDirectoryFiles(req.query._id,req.query.path);



                return res.send(files);



        }catch(error){
            // tslint:disable-next-line
            console.log(error);
            return res.status(500).send({message:'Error in viewing files.',success:false});


        }




    }

    public async getFileDataStream(req:Request,res:Response){


        try{

            const {downloadStream, file} = await this.fileManager.getFileDataStream(req.query.id);
            res.writeHead(200, {
                'Content-Type': file.fileType,
                'Content-Length': file.size,

            });


            downloadStream.pipe(res);




        }catch(error){
             // tslint:disable-next-line
            console.log(error);
            res.status(500).send({success:false,message:'Error in file renderring'})
        }




    }


}

export default UserController;