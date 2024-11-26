import { v2 as cloudinary} from 'cloudinary';
import dotenv from 'dotenv'
dotenv.config()


//  clound image nguoi dung  ( avartar , post )
const cloudinaryImageUser = cloudinary
cloudinaryImageUser.config({
    cloud_name : process.env.CLOUND_NAME2,
    api_key: process.env.API_KEY_CLOUDINARY_USER2, 
    api_secret: process.env.SECRET_KEY_CLOUDINARY_USER2 
})



export {
cloudinaryImageUser
}