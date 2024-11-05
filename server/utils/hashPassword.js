import bcrypt from 'bcrypt';

export const hashPass = async (password,saltRounds) => {
    const salt = bcrypt.genSaltSync(saltRounds);
    const hash = bcrypt.hashSync(password, salt);
    return {
        salt,
        hash
    };
}
export const verifyPass = (enteredPassword, storedHash) => {
    return bcrypt.hashSync(enteredPassword, storedHash);
}
// export const hashPass = {
//     hash: async (password) => {
//         const salt = await bcrypt.genSalt(10);
//         const hash = await bcrypt.hash(password, 10);
//         return {
//             salt,
//             hash
//         } 
//     },
//     verifyPass: async (enteredPassword, hash) => {
//         return await bcrypt.compare(enteredPassword, hash);
//     }
// };