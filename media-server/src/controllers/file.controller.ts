import {File, IFile} from '../models/file.model';
import mongodb, { ObjectID,GridFSBucket } from 'mongodb';
import fs from 'fs';
import mongoose from 'mongoose';
import path from 'path';



class FileController{

    // private gfs :g.Grid;

    private CHUNKS_COL = 'directory.chunks';
    private FILES_COL = 'directory.files';
    constructor(){



        // this.gfs= g(mongoose.connection,mongoose.mongo);
        this.createFile = this.createFile.bind(this);

    }


    public async createFile(userID:string,fileType:string,pathString:string,fileName:string,streamPath:string,size?:string){
         // TODO:handle delete for other file types
        // find whether a file exists with the same name on parent folder
        // if so change name
        // file save
        // set size

        fileName = fileName.replace(/\s+/g, '');
        try{



            let fileID = null;

            if(fileType!=='folder'){

                const bucket = new GridFSBucket(mongoose.connection.db,{bucketName:'directory'});

                if (!fs.existsSync(path.join(__dirname,'../../public'))){
                     fs.mkdirSync(path.join(__dirname,'../../public'),{recursive:true});

                }

                const tempFile = fs.createWriteStream(path.join(__dirname,'../../public',fileName));
                    tempFile.on('open', ()=> {

                                tempFile.write(streamPath);
                                 // tslint:disable-next-line
                                console.log('Temp file created successfully')
                    })

            //      fs.writeFile(path.join(__dirname,'../../public',fileName),streamPath,(err)=>{

            //     if(err) {

            //         throw err};
            //     // tslint:disable-next-line
            //     console.log('Temp file save successful')
            // });
            const uploadStream = bucket.openUploadStream(fileName);
                        fileID = uploadStream.id;
                       // TODO : update file path

                       fs.createReadStream(path.join(__dirname,'../../public',fileName)).pipe(uploadStream).on('finish',()=>{


                           fs.unlink(path.join(__dirname,'../../public',fileName), (err) => {
                               if (err) throw err;
                               // tslint:disable-next-line
                               console.log('Temp file was deleted');
                             })

                       });





            }

                const date = new Date();


                const file = new File({

                    fileName,
                    created:date,
                    lastUpdated:date,
                    size:Number(size)|0,
                    fileType,
                    path:pathString,
                    owner:userID,
                    fileID
                });



               return file.save();





    }catch(error){

        throw error;

    }


    }


    public async deleteFile(fileTodelete:string){
        // TODO:handle delete for other file types

        const file = JSON.parse(fileTodelete)




        try{

            if (file.fileType!=='folder'){

            const bucket = new GridFSBucket(mongoose.connection.db,{bucketName:'directory'});



            bucket.delete(new ObjectID(file.fileID),err=>{
                if(err) throw err;
                // tslint:disable-next-line
                console.log('Media successfully deleted')

            })

            return await File.findByIdAndDelete({_id:file._id});

            }
            else{

                return await this.deleteFileRecord(file._id)



            }





        }catch(error){
            throw error;

        }


    }

    private async deleteFileRecord(fileID:string){
            // TODO: make recursive
        try{

        const parentFile = await File.findById({_id:fileID});
        const childFiles = await File.find({path:parentFile.getCompletePath()});


        childFiles.forEach(file=>{


            if(file.fileType==='folder'){

                this.deleteFileRecord(file._id)

            }else{

            const bucket = new GridFSBucket(mongoose.connection.db,{bucketName:'directory'});



           bucket.delete(new ObjectID(file.fileID),err=>{
            if(err) throw err;
            // tslint:disable-next-line
            console.log('Media successfully deleted')


        })

           }






        }
        )
            await File.deleteMany({path:parentFile.getCompletePath()});
        return await File.findByIdAndDelete({_id:fileID})

        }catch(error){

                throw error;
        }



    }

    public async searchFile(ownerID:string,fileName:string,filePath:string){


        try{


            return await File.findOne({owner:ownerID,path:filePath,fileName});

        }catch(error){


            throw error;



        }



    }

    public async getAllUserFiles(ownerID:string){

        try{

                return await File.find({owner:ownerID});


        }catch(error){

            throw error;



        }



    }

    public async viewDirectoryFiles(ownerID:string,filePath:string){

        try{

                return await File.find({owner:ownerID,path:filePath});


        }catch(error){

            throw error;



        }



    }


    public async getFileDataStream(fileID:string){

        try{

            const fileTobeDownloaded = await File.findById({_id:fileID});
            const bucket = new GridFSBucket(mongoose.connection.db,{bucketName:'directory'})

            return { downloadStream: bucket.openDownloadStream(new ObjectID(fileTobeDownloaded.fileID)),
                file: fileTobeDownloaded}



        }catch(error){

            throw error;

        }


    }




}

export default FileController;