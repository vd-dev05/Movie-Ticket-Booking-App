import mongoose from "mongoose";    
import { Users } from "../../../models/movie/index.js";
import { cloudinaryImageUser } from "../../../database/cloud/users.js";
const UserUpdateMovie = {

    updateUser : async (req ,res) => { 
        try {
            const userId = new mongoose.Types.ObjectId(req.params.id);
            const user = await Users.findByIdAndUpdate(userId, req.body, {new: true});
            res.status(200).json(user);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    },
    upLoadAvatar : async (file,idKey) => {
        try {
            const dataUrl = `data:${file.mimetype};base64,${file.buffer.toString('base64')}`;
            const fileName = file.originalname.split('.')[0];
            
            // const fileName = file.originalname.split('.')[0];
            const response = await cloudinaryImageUser.uploader(dataUrl,{
                resource_type : "auto",
                public_id : fileName,
                folder : 'folder-avatar',
            })
            console.log(response);
            
            console.log(response.secure_url);
            
            if (!response) {
                throw new Error(`Failed to upload`)
            }
            return  response.secure_url 
            
            // response.end(data)
            
        } catch (error) {
            return error
            
        }
    }
}
export default UserUpdateMovie