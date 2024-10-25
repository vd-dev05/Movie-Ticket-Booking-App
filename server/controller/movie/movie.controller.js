// import { getMovieById } from './getMovieByID.js';
import { Movies }  from '../../models/movie/index.js';

const MovieController = {
    getByID : async (req,res) => { 
        const {id} = req.params
        const {title} = req.body
        getMovieById({value : id, title : title})
    },
    getMovie : async (req ,res ) => {
        const { limit = 20 , page = 1 } = req.query; 
        const options = {
            limit: parseInt(limit), 
            skip: (page - 1) * limit
        };

        try {
            const movies = await Movies.find({})
            .limit(options.limit)
            .skip(options.skip);
            const totalCount = await Movies.countDocuments();

           return res.status(200).json({
                success : true,
                data :movies,
                total : totalCount,
                message:'Movies fetched successfully!',
            });
        } catch (error) {
            res.status(500).send({
                message: 'Server Error',
                data :null,
                success: false,
            });
        }
    }
}
export default MovieController 