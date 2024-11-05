import mongoose from "mongoose";    
import { Users } from "../../../models/movie/index.js";

const UserUpdateMovie = {

    updateUser : async (req ,res) => { 
        try {
            const userId = new mongoose.Types.ObjectId(req.params.id);
            const user = await Users.findByIdAndUpdate(userId, req.body, {new: true});
            res.status(200).json(user);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }
}
export default UserUpdateMovie