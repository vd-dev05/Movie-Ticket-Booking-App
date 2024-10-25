import { Movies } from "../../models/movie/index.js";

export const getMovieById = async (value) => {
    // console.log(value.title);
    
    try {
        const movie = await Movies.find({}, {_id : "573a1390f29313caabcd6377"} ) 
        if (!movie) {
            throw new Error("Error: Couldn't find Movie");
        }
        // console.log(movie.hash);
        
        
        return movie;  
    } catch (error) {
        throw new Error(error.message);  
    }
};