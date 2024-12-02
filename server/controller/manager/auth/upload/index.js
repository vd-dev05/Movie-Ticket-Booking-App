import { v2 as cloudinary } from 'cloudinary'
import dotenv from 'dotenv'
dotenv.config()

const upLoadLogo = {
    createSeller: async (req, res, next) => {
        try {
        
            const file = req.file
          
            
            const dataUrl = `data:${file.mimetype};base64,${file.buffer.toString('base64')}`;
            const fileName = file.originalname.split('.')[0];

            
            const result = await cloudinary.uploader.upload(dataUrl, {
                public_id: fileName +"logo" + Math.floor(10) * 2024,
                resource_type: 'video',
                folder: 'folder-seller',
            });

            const { storeName, email, address, password } = req.body
            if (!storeName || !email || !address || !password) {
                throw new Error("Fields are not left blank")
            }

            if (result) {
                req.logoUrl = result.secure_url
                return next()
            }
       
        } catch (error) {
                console.log(error);
                
            res.status(405).json({ err: error.message })
        }
    }
}
export default upLoadLogo