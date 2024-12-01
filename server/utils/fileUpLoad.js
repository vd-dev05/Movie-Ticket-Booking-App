import multer from "multer";
import { v2 as cloudinary} from 'cloudinary';

import dotenv from 'dotenv'
dotenv.config()



cloudinary.config({
    cloud_name : process.env.CLOUND_NAME,
    api_key: process.env.API_KEY_CLOUDINARY, 
    api_secret: process.env.SECRET_KEY_CLOUDINARY
})

const storage = multer.memoryStorage()

const upload = multer({storage : storage})

export {
    upload
}