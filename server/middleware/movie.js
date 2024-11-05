const MovieMiddleware = {
    createMovie : async (req,res,next) => {
        try {
            if(!req.body.title ||!req.body.genres ||!req.body.directors ||!req.body.writers ||!req.body.released ||!req.body.fullplot ||!req.body.price){
                return res.status(400).json({message : "Fields are not left blank"})
                // throw new Error(`Fields are not left blank`)
            } 
            return next ()
        } catch (error) {
           return  res.status(error).json({message : error.message})
        }
       
    }
}  
export default MovieMiddleware