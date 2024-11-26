import { v2 as cloudinary} from 'cloudinary';
import dotenv from 'dotenv'
dotenv.config()

const cloundinaryImageQr = cloudinary

//  clound up ma qr  
cloundinaryImageQr.config({
        cloud_name: process.env.CLOUND_NAME , 
        api_key: process.env.API_KEY_CLOUDINARY, 
        api_secret: process.env.SECRET_KEY_CLOUDINARY 
})
export {
    cloundinaryImageQr
}