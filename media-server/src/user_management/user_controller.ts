import {User} from './user.model';
import {UserManager} from './user.manager';
import {Request,Response} from 'express';
import {FileManager} from '../file_management/file.manager';


export class UserController{

    private userManager: UserManager;
    private fileManager:FileManager;

    constructor(){
        this.userManager = new UserManager();
        this.fileManager = new FileManager();

    }

 public async register(req: Request, res: Response) {

    const user = new User({
        username: req.body.username,
        password: req.body.password,
        email: req.body.email,
        rootFolder: req.body.username
    });

    try {

        const registeredUser = await this.userManager.register(user);
        await this.fileManager.createFile(registeredUser._id, 'folder', '.', registeredUser.username, null);
        return res.status(201).send({ success: true, message: 'User registered successfully', user: registeredUser });

    } catch (error) {

        // TODO:logErrors

                return res.set(400).send({ success: false, message: 'Invalid user registration.' });


    }
}

public async logIn(req: Request, res: Response) {
    // TODO: send back authToken
   
            
    try{
        const user = await  this.userManager.logIn(req.body.username,req.body.password);
    
    
            if (user) {
    
    
    
                return res.send({ success: true, message: 'User logged in successfully', user });
            }else{
                return res.status(400).send({ success: false, message: 'Invalid username or password' });
    
    
            }
    
    
    
    
    
            }catch(error){
    
                 // TODO:log error
                 return res.status(500).send({ success: false, message: 'Something went wrong. Please retry.' });
    
            }




}

}