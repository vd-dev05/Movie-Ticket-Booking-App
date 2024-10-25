import bcrypt from 'bcrypt';

export const hashPass = (password) => {
    let salt = bcrypt.genSaltSync(10);
    let hash = bcrypt.hashSync(password, salt);
    return {
        salt,
        hash
    };
}
export const verifyPass = (enteredPassword, storedHash) => {
    return bcrypt.compareSync(enteredPassword, storedHash);
}