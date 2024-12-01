
const upload =(file) => {
    (
        async (req, res) => {
            try {
                const result = await     cloudinary.uploader.upload( "https://upload.wikimedia.org/wikipedia/commons/a/ae/Olympic_flag.jpg   ")
               console.log({   url: result.secure_url,
                public_id: "hello"});
               
                // res.json({
                //     url: result.secure_url,
                //     public_id: "hello"
                // })
            } catch (error) {
                console.error(error)
                // res.status(500).json({ message: 'Error uploading image' })
            }
        }
    )()
}

export {
cloudinaryImageUser,
upload
}