export class File
{
    _id:string;
    fileName:string;
    created:Date;
    lastUpdated:Date;
    size:number;
    fileType:string;
    path:string;
    owner:string;
    fileID:string;
    dateDisplayed:string;
    fileTypeDisplayed:string;
    sizeDisplayed : string;


                constructor(file){

                    
                    this._id= file._id;
                    this.fileName =file.fileName;
                    this.created=new Date(file.created);
                    this.lastUpdated=new Date(file.lastUpdated);
                    this.path=file.path;
                    this.owner = file.owner;
                    this.size=Number(file.size);
                    this.fileType=file.fileType;
                    this.fileID=file.fileID;
                    this.dateDisplayed=this.getDatetoDisplay();
                    this.fileTypeDisplayed = this.getFileTypetoDisplay()
                    this.sizeDisplayed = this.getsizetoDisplay()
    
    
            }

                private getDatetoDisplay():string{
                    return [this.lastUpdated.getDate(),this.lastUpdated.getMonth(),this.lastUpdated.getFullYear()].join('-');
    
    
            }

            private getFileTypetoDisplay():string{


                switch (this.fileType){
                    case 'folder':
                        return "";
                    case 'image/jpeg':
                        return "JPEG file";

                    case 'video/mp3':
                        return "MP3 file";
                    case 'image/gif':
                        return "GIF file";

                    default:

                        return this.fileType;
                }

            }


            private getsizetoDisplay():string{


                return this.size===0?null: [this.size/1000,'kB'].join(" ")
            }
               


}

