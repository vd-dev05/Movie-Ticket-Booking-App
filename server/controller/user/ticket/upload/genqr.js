// create a new uplload img Cloudinary
import { cloundinaryImageQr } from '../../../../database/cloud/qrUser.js';
// import { cloudinaryImageUser} from '../../../../database/cloud/users.js';

const upLoadClound = async (data,idKey) => {
    try {


        const result = await cloundinaryImageQr.uploader.upload(data, {
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
const deleteImage = async (publicId) =>  {
  try {
    const ressponse =  await cloundinaryImageQr.uploader.destroy(publicId , (result) => {
        return result
    }) 
    return ressponse
   
  } catch (error) {
    console.log('Error delete Cloudinary:', err.message);
  }
}

export {
    upLoadClound,
    autoUrl,
    deleteImage,
}