import bcrypt from 'bcrypt';
import dotenv from 'dotenv'
dotenv.config()


export const hashPass =  (password) => {
    const saltRounds = Number(process.env.SALT)
    const salt = bcrypt.genSaltSync(saltRounds);
    const hash = bcrypt.hashSync(password, salt);
    return {
        salt,
        hash
    };
}
export const verifyPass = (enteredPassword, storedHash) => {
    return bcrypt.compareSync(enteredPassword, storedHash);
}
