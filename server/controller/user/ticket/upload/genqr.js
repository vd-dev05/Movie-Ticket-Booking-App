// create a new uplload img Cloudinary
import { v2 as cloudinary } from 'cloudinary';
import dotenv from 'dotenv';
dotenv.config();

const upLoadClound = async (data,idKey) => {
    try {
        cloudinary.config({ 
            cloud_name: 'dlpxfxpdn', 
            api_key: process.env.API_KEY_CLOUDINARY, 
            api_secret: process.env.SECRET_KEY_CLOUDINARY 
        });
        const result = await cloudinary.uploader.upload(data, {
            public_id: idKey,
            resource_type: 'auto', 
        });
        return result.secure_url
        // console.log('URL  QR:', result.secure_url);

    } catch (err) {
        console.log('Lỗi khi tải lên Cloudinary:', err.message);
    }
}
const autoUrl = async (idKey) => {
    cloudinary.url(idKey , {
        crop : 'auto',
        gravity : 'auto',
        width : 500,
        height : 500
    })
}

export {
    upLoadClound,
    autoUrl
}