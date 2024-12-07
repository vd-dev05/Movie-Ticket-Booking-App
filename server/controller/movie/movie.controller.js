import { getMovieById , getMovieByTitle, getAllMovie,getTopMovie, getProductionMovie ,getHoolyWoodMovie, getMovieSettings, getSeats, putReview, getAllTrailers} from './getMovieByID.js';
const MovieController = {
   
    searchMovie :  async (req,res) => { 
        try {
            const {title} =  req.body
            console.log(req.body);
            
            const r = await getMovieByTitle({ title : title})

            res.status(200).json({
                success : true,
                data : r,
                message:'Movies Search fetched successfully!',
            })
        } catch (error) {
            res.status(404).json({ error : error.message })
        }
    
    },
    getByID : async (req,res) => { 
        try {
            const {id} = req.params
            const r = await getMovieById({value : id})
            return  res.status(200).json({
                success : true,
                data : r,
                message:'Movies ID fetched successfully!',
            })
        } catch (error) {
            res.status(404).json({ error : error.message })
        }
    
    },
    getAllMovie : async (req ,res ) => { 
        try {
            const query = req.query
            const r = await getAllMovie(query)            
           return res.status(200).json({
                success : true,
                dataTotal : r.movies.length,
                data : r.movies,
                total : r.totalCount,
                message:'Movies fetched successfully!',
            });
        }
         catch (error) {
            res.status(404).json({ error : error.message });
        }
    },
    getTopMovie : async (req ,res) => {
           
        try {
            const r = await getTopMovie(req.params)
            res.status(200).json({
                success : true,
                data : r,
                message:'Top Movies fetched successfully!',
            })
        } catch (error) {
             res.status(404).json({ error : error.message })
        }
    },
    getProductionMovie : async (req ,res) => {
        try {
            const r = await getProductionMovie(req.body)
            res.status(200).json({
                success : true,
                data : r,
                message:'Product Company Movies fetched successfully!',
            })
        } catch (error) {
             res.status(404).json({ error : error.message })
        }
    },
    getTopHoolyWord : async (req ,res) => {
        try {
            const r = await getHoolyWoodMovie(req.body)
            res.status(200).json({
                success : true,
                data : r,
                message:'Hooly Wood Movie fetched successfully!',
            })
        } catch (error) {
             res.status(404).json({ error : error.message })
        }
    },
    getMovieGenres : async (req ,res) => {
        try {
            const {year ,rating , genres} = req.body
            // console.log(year ,rating , genres);
            // console.log(req.body);
            
            
            
            const r = await getMovieSettings(year ,rating , genres)
            res.status(200).json({
                success : true,
                data : r,
                message:'Movie Genres fetched successfully!',
            })
        } catch (error) {
             res.status(404).json({ error : error.message })
        }
    },
    getSeats  : async (req,res) => {
        try {

            const {movieId, sellerId} = req.query

            const response = await getSeats(movieId,sellerId)
            res.status(200).json(response)
        } catch (error) {
            res.status(401).json({
              error: error.message
            })
        }
    },
    updateRevies : async (req,res) => {
        try {
            const {star, review} = req.body
            const userId = req.userId
            const movieId = req.params.id
            // console.log(movieId, userId, review,star);
            
            
            const response = await putReview(movieId, review,star,userId)
            res.status(200).json(response)
        } catch (error) {
            res.status(400).json({error: error.message})
        }
    },
    getTrailers : async (req,res) => {
        try {
            const response = await getAllTrailers()
            if (response) {
                res.status(200).json(response)
            }
        } catch (error) {
            res.status(400).json({error: error.message})

        }
    }
}


export default MovieController  