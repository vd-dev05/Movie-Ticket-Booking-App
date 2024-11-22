
import axios from "axios"
const baseURL = import.meta.env.VITE_REACT_API_URL

const MovieController = {
    getMovieId : async () => {
        try {
            const r = await axios.get(`${baseURL}/api/v1/movies/oscar/win`)
        } catch (error) {
            
        }

    },
    getTopMovie : async () => {
        try {
            const r  = await axios.get(`${baseURL}/api/v1/movies/oscar/win`)
            return r.data
            
        } catch (error) {
            return error
        }
    },
    getTopMovieCompany : async () => {
        try {
            const r  = await axios.get(`${baseURL}/api/v1/movies/products/company`, {
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
            // console.log(value);
            
            if (value) {
                
                const r  = await axios.post(`${baseURL}/api/v1/movies/search`, {
                    title : value,
                })
                // console.log(r);
                
                return r.data
            }
            
        } catch (error) {
            return error
        }
    },
    getGenersMovie : async (value) => {
   
      
         try {           
            if (value.rating || value.year) {
                const r  = await axios.get(`${baseURL}/api/v1/movies/genres/all`, {
                    year : value.year || 2024,
                    rating : value.rating || 9,
                    genres : value.genres,
                    test : "fix"
                    
                },{



                })
                console.log(r);
                
                return r.data
            }
       
            
        } catch (error) {
            return error
        }
    },
    // getGenersMovie : async (value) => {
    //     try {
    //     //    console.log(value);
           
    //         if (value) {
                
    //             const r  = await axios.get(`${baseURL}/api/v1/movies/genres`,{
    //                 genres : value,
    //             })
    //             return r.data
    //         }
    //     } catch (error) {
    //         return error
    //     }
    // }

}
export default MovieController