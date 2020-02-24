import { File } from './file.model';
import { ObjectID, GridFSBucket } from 'mongodb';
import fs from 'fs';
import mongoose from 'mongoose';
import path from 'path';
import * as log4js from 'log4js';

export class FileManager {

    private CHUNKS_COL = 'directory.chunks';
    private FILES_COL = 'directory.files';

    private bucket:GridFSBucket;
    private logger:any;



    constructor(){
        this.logger = log4js.getLogger();

    }




    public async createFile(userID: string, fileType: string, pathString: string, fileName: string, streamPath: string, size?: string) {
        // TODO:find whether a file exists with the same name on parent folder
        // if so change name

        try {

            fileName = fileName.replace(/\s+/g, '');

            let fileID = null;

            if (fileType !== 'folder') {


                const tempFolderExists = fs.existsSync(path.join(__dirname, '../../temp'));

                if (!tempFolderExists) {

                    fs.mkdirSync(path.join(__dirname, '../../temp'), { recursive: true });

                }

                const tempFile = fs.createWriteStream(path.join(__dirname, '../../temp', fileName));

                tempFile.on('open', () => {

                    tempFile.write(streamPath);
                    this.logger.info("Successful tempfile creation: ",fileName);
                    
                })

               const bucket = new GridFSBucket(mongoose.connection.db, { bucketName: 'directory' });
                const uploadStream = bucket.openUploadStream(fileName);
                fileID = uploadStream.id;
                

                fs.createReadStream(path.join(__dirname, '../../temp', fileName)).pipe(uploadStream).on('finish', () => {


                    fs.unlink(path.join(__dirname, '../../temp', fileName), (err) => {

                        if (err) throw err;
                        this.logger.info("Successful tempfile deletion: ",fileName);
                    })

                });

            }

            const date = new Date();

            const file = new File({

                fileName,
                created: date,
                lastUpdated: date,
                size: Number(size) | 0,
                fileType,
                path: pathString,
                owner: userID,
                fileID
            });

            return await file.save();

        } catch (error) {

            
            throw error;

        }

    }


    public async deleteFile(fileTodelete: string) {
        // TODO:handle delete for other file types

        const file = JSON.parse(fileTodelete)

        try {

            if (file.fileType !== 'folder') {


                const bucket = new GridFSBucket(mongoose.connection.db, { bucketName: 'directory' });
                bucket.delete(new ObjectID(file.fileID), err => {
                    if (err) throw err;
                    this.logger.info("Successful file deletion",file.fileID);
            })

                return await File.findByIdAndDelete({ _id: file._id }).exec();

            }
            else {

                return await this.deleteFileRecord(file._id);

            }

        } catch (error) {
            throw error;

        }

    }

    private async deleteFileRecord(fileID: string) {
        try {

            const parentFile = await File.findById({ _id: fileID }).exec();
            const childFiles = await File.find({ path: parentFile.getCompletePath() }).exec();


            childFiles.forEach(file => {


                if (file.fileType === 'folder') {

                    this.deleteFileRecord(file._id)

                } else {


                    const bucket = new GridFSBucket(mongoose.connection.db, { bucketName: 'directory' });
                    bucket.delete(new ObjectID(file.fileID), err => {
                        if (err) throw err;
                        this.logger.info("Successful file deletion",file.fileID);

                    })

                }

            }
            )

            await File.deleteMany({ path: parentFile.getCompletePath() }).exec();
            return await File.findByIdAndDelete({ _id: fileID })

        } catch (error) {

            throw error;
        }

    }

    public async searchFile(ownerID: string, fileName: string, filePath: string) {

        try {

            return await File.findOne({ owner: ownerID, path: filePath, fileName }).exec();

        } catch (error) {

            throw error;

        }

    }

    public async getAllUserFiles(ownerID: string) {

        try {

            return await File.find({ owner: ownerID }).exec();


        } catch (error) {

            throw error;

        }

    }

    public async viewFiles(ownerID: string, filePath?: string | object) {

        let query = null;

        if (filePath) {

            query = {
                owner: ownerID,
                path: filePath
            }

        } else {

            query = {
                owner: ownerID
            }
        }

        try {

            return await File.find(query).exec();


        } catch (error) {

            throw error;

        }

    }


    public async getFileDataStream(fileID: string) {

        try {

            const fileTobeDownloaded = await File.findById({ _id: fileID }).exec();

            const bucket = new GridFSBucket(mongoose.connection.db, { bucketName: 'directory' });

            return {
                downloadStream: bucket.openDownloadStream(new ObjectID(fileTobeDownloaded.fileID)),
                file: fileTobeDownloaded
            }


        } catch (error) {

            throw error;

        }


    }

}

