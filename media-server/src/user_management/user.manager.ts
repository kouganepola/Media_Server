import {User,IUser} from './user.model';
import {FileManager} from '../file_management/file.manager';


export class UserManager{



    private fileManager:FileManager;

     constructor(){

        this.fileManager = new FileManager();



    }


 public async register(user:IUser) :Promise<IUser>{


    try {

        return await user.save();



    } catch (error) {

        // TODO:logErrors



                throw error;



    }
}

public async logIn(username:string,password:string){
    // TODO: send back authToken

     
    try{
        const user = await User.findOne({ username }).exec();

            if (user) {

                const isMatch = await user.comparePassword(password);
                    if (isMatch) {

                        return user ;
                    }
                    else{
                        return null;
                    }
            }else{
                return null;
            }




        }catch(error){
            // TODO:log error


            throw error;

        }
        
        
      
            


       
    }

}