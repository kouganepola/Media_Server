import mongoose, { Mongoose } from 'mongoose';
import { IUser } from './user.model';
import {ObjectID} from 'mongodb';


export interface IFile extends mongoose.Document{
        fileName:string,
        created:Date,
        lastUpdated:Date,
        size:number,
        fileType:string,
        path:string,
        owner:IUser['_id'],
        fileID:ObjectID,
        getCompletePath():string


}

const fileSchema = new mongoose.Schema({
    fileName: String,
    owner: {
        type:[mongoose.Schema.Types.ObjectId],
        required:true
    },
    created:{
            type:Date,
            required:true
        },
    lastUpdated:Date,
    size: {
        type:Number,

    },
    path: String,
    fileType:{type:String},
    deleted:Date,
    fileID:String
});


fileSchema.methods.getCompletePath = function():string{

    return this.path+'/'+this.fileName;
}





export const File = mongoose.model<IFile>('File',fileSchema);