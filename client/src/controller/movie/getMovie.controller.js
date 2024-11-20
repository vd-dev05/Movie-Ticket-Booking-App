
import axios from "axios"

const MovieController = {
    getTopMovie : async () => {
        try {
            const r  = await axios.get(`${Api}/api/v1/movies/oscar/win`)
            return r.data
            
        } catch (error) {
            return error
        }
    },
    getTopMovieCompany : async () => {
        try {
            const r  = await axios.get(`${Api}/api/v1/movies/products/company`, {
                genres : "Drama", 
            })
            return r.data
            
        } catch (error) {
            return error
        }
    },
    searchMovie : async (value) => {
        try {
            // search title for movie server    
            if (value) {
                
                const r  = await axios.post(`${Api}/api/v1/movies/search`, {
                    title : value,
                })
                console.log(r);
                
                return r.data
            }
        
            
          
            
        } catch (error) {
            return error
        }
    }

}
export default MovieController
