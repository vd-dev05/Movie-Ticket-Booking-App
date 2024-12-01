import mongoose from "mongoose";
import { Users } from "../../../models/movie/index.js";
import { v2 as cloudinary} from 'cloudinary';
const UserUpdateMovie = {

    updateUser: async (req, res) => {
        try {
            // const userId = new mongoose.Types.ObjectId(req.params.id);
            const user = await Users.findByIdAndUpdate(req.userId, {
                name: req.body.name,
                address: req.body.address,
                phone: req.body.number,
            }, { new: true });

            if (user) {
                res.status(200).json("Edit Profile SuccessFull !");
            }


        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    },
    upLoadAvatar: async (file,  userId) => {
        try {
        
            const dataUrl = `data:${file.mimetype};base64,${file.buffer.toString('base64')}`;
            const fileName = file.originalname.split('.')[0];

            const result = await cloudinary.uploader.upload(dataUrl, {
                public_id: fileName + new Date().getTime(),
                resource_type: 'auto',
                folder: 'folder-avatar',
            });
            await  Users.findByIdAndUpdate(userId, {avatar:result.secure_url})

            return result.secure_url
   
          
        } catch (error) {
            return error

        }
    }
}
export default UserUpdateMovie