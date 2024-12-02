import { Movies } from "../models/movie/index.js"

const MovieMiddleware = {
    createMovie : async (req,res,next) => {
        try {
            const checkMovie = await Movies.aggregate([
                { $match: { title: req.body.value.title, plot: req.body.value.plot , years : req.body.value.years } }
 
            ])
        
          
            
            
            if (checkMovie.length > 0) {
                throw new Error("Movie already exists in the system")
            }
            return next()
       
        } catch (error) {
            res.status(401).json({error : error.message})
        }
       
    }
}  
export default MovieMiddleware