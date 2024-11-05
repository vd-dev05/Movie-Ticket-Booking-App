import { getMovieById , getMovieByTitle, getAllMovie,getTopMovie, getProductionMovie ,getHoolyWoodMovie} from './getMovieByID.js';
const MovieController = {
   
    searchMovie :  async (req,res) => { 
        try {
            const {title} =  req.body
            const r = await getMovieByTitle({ title : title})
            console.log(r);
            
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
            // console.log(id);
            
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
           return res.status(500).send({
                message: 'Server Error',
                data :null,
                success: false,
            });
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
            return res.status(500).send({
                message: 'Server Error',
                data :null,
                success: false,
            })
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
            return res.status(500).send({
                message: 'Server Error',
                data :null,
                success: false,
            })
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
            return res.status(500).send({
                message: 'Server Error',
                data :null,
                success: false,
            })
        }
    }
}


export default MovieController 