import bcrypt from 'bcrypt';
import mongoose from 'mongoose';

export interface IUser extends mongoose.Document {

    username: string,
    email: string,
    password: string,
    rootFolder: string,
    comparePassword(password: string):Promise<boolean>;

}

const userSchema = new mongoose.Schema({

    username: {
        type: String,
        unique: true,
        required: true
    },

    email: {
        type: String,
        unique: true,
        match: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        required: true
    },

    password: {
        type: String,
        required: true
    },

    rootFolder: String
});

// userSchema.methods.comparePassword = function(candidatePassword: string, callback: (err: Error, isMatch: boolean) => {}) {
//     bcrypt.compare(candidatePassword, this.password, (err, result) => {
//         callback(err, result);
//     });
// };

userSchema.methods.comparePassword = function(candidatePassword: string):Promise<boolean> {
    return bcrypt.compare(candidatePassword, this.password)
};


userSchema.pre<IUser>('save', function(next) {
    const user = this;
    bcrypt.hash(user.password, 10, (err, hash) => {
        if (err) return next(err);
        user.password = hash;
        next();
    });
});

export const User = mongoose.model<IUser>('User', userSchema);

