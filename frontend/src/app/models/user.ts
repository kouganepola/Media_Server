
export class User{

    _id:string;
    username:string;
    email:string;
    rootFolder:string


    constructor(user){

        this._id = user._id;
        this.username = user.username;
        this.email = user.email;
        this.rootFolder = user.path;


    }
   
}