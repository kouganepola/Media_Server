import { Request, Response } from 'express';
import MulterRequest from '../utils/multerRequest';
import { User } from '../user_management/user.model';
import {FileManager} from './file.manager';
import * as log4js from 'log4js';

export class FileController {

    private fileManager: FileManager;
    private logger:any;

    constructor() {

        this.fileManager = new FileManager();
        this.logger = log4js.getLogger()
        


    }



    public async createFolder(req: Request, res: Response) {

        try {

            const parent = await this.parentFolderExists(req.body.path,req.body._id);

            if (parent) {


                const duplicateFile = await this.fileManager.searchFile(req.body._id, req.body.fileName, parent.getCompletePath());
                if (!duplicateFile) {
                    const newFolder =  await this.fileManager.createFile(req.body._id, 'folder', parent.getCompletePath(), req.body.fileName, null);
                    return res.send({ success: true, message: 'Folder created successfully',file:newFolder });
                }
                return res.status(400).send({ success: false, message: 'A folder with that name already exists.' });

            }
            return res.status(400).send({ success: false, message: 'The parent folder does not exist.' });

        } catch (error) {
            this.logger.error('Something went wrong. Folder could not be created.\nError:',error)            
            return res.status(500).send({ success: false, message: 'Something went wrong. Folder could not be created.' });
        }
    }

    public async uploadFile(req: MulterRequest, res: Response) {
        try {

            const parent = await this.parentFolderExists(req.body.path,req.body._id);

            const fileToUpload = req.file;
            if (parent) {

                const duplicateFile = await this.fileManager.searchFile(req.body._id, fileToUpload.originalname, parent.getCompletePath());
                if (!duplicateFile) {
                    const newFile = await this.fileManager.createFile(req.body._id, fileToUpload.mimetype, parent.getCompletePath(), fileToUpload.originalname, fileToUpload.buffer, fileToUpload.size);
                    return res.send({ success: true, message: 'File created successfully' ,file:newFile});
                }
                return res.status(400).send({ success: false, message: 'A file with that name already exists.' });

            }
            return res.status(400).send({ success: false, message: 'The parent folder does not exist.' });
        } catch (error) {
            
            this.logger.error('Something went wrong. File could not be created.\nError:',error)  
            return res.status(500).send({ success: true, message: 'Something went wrong. File could not be created' });
        }
    }

    public async deleteFile(req: Request, res: Response) {

        try {
            const deletedFile = await this.fileManager.deleteFile(req.query.file);

            if (deletedFile) {
                return res.send({ success: true, message: 'File was deleted successfully.' });
            }
            return res.status(400).send({ success: false, message: 'No such file.' });

        } catch (error) {
            this.logger.error('Something went wrong. File could not be deleted.\nError:',error)  
            return res.status(500).send({ success: false, message: 'Something went wrong. File could not be deleted.' });
        }
    }

    public async viewAllFiles(req: Request, res: Response) {

        try {
            const files = await this.fileManager.viewFiles(req.query.id, { '$ne': '.' });
            return res.send(files);

        } catch (error) {
            this.logger.error('Server failed during file retrieval.\nError:',error)  
            return res.status(500).send({ success: false, message: 'Server failed during file retrieval' });

        }

    }

    public async viewDirectory(req: Request, res: Response) {



        try{
            const files = await this.fileManager.viewFiles(req.query._id, req.query.path);
            return res.send(files);

        } catch (error) {

            this.logger.error('Error in viewing files.\nError:',error)  
          
            return res.status(500).send({ success: false , message: 'Error in viewing files.'});

        }

    }

    public async getFileDataStream(req: Request, res: Response) {

        try {
            const { downloadStream, file } = await this.fileManager.getFileDataStream(req.query.id);
            res.writeHead(200, {
                'Content-Type': file.fileType,
                'Content-Length': file.size,
            });

            downloadStream.pipe(res);

        } catch (error) {

            this.logger.error('Error in file renderring.\nError:',error)  
            res.status(500).send({ success: false, message: 'Error in file renderring.' })

        }
    }

    private async parentFolderExists(path:string,_id:string){

        try{

            const parentNames = path.replace('./', '').split('/');
            let parentPath = '.';

            if (parentNames.length !== 1) {

                parentPath = ['.', parentNames.slice(0, parentNames.length - 1).join('/')].join('/');
            }
            const parentName = parentNames[parentNames.length - 1];
            return this.fileManager.searchFile(_id, parentName, parentPath);

        }catch(error){

                throw error;

        }



    }
}


