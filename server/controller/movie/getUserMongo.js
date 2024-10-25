import { Users } from "../../models/movie/index.js";

export const getUserByPhone = async (value) => {
    try {
        const user = await Users.findOne({ phone : value }); 
        if (!user) {
            throw new Error("Error: Couldn't find Phone user");
        }
     
        
        
        return user;  
    } catch (error) {
        throw new Error(error.message);  
    }
};