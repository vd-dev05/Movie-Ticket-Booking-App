import axios from "axios"  
const baseURL = import.meta.env.VITE_REACT_API_URL

const ManagerController = {

    // searchMovieId : async (movieId) => {
    //     try {
    //         const response = await axios.get(`${baseURL}/api/v1/movies/${movieId}`, {
    //         })
    //         return response.data
    //     } catch (error) {
    //         console.error('Error fetching movie:', error)
    //         throw error
    //     }
    // } ,
    createMovie : async (movieId) => {
        try {
            const response = await axios.post(`${baseURL}/api/v1/manager/ticket/${movieId}`)
            console.log(response);
            
            return response
        } catch (error) {
            // console.log(error);
            
            return error.response
           
        }
    },
    searchMovieCreateId : async (movieId) => {
        try {
            const response = await axios.get(`${baseURL}/api/v1/manager/ticket/${movieId}`)
            return response.data
        } catch (error) {
            console.error('Error fetching movie:', error)
            throw error
        }
    },

    getAllMovie : async () => {
        try {
            const response = await axios.get(`${baseURL}/api/v1/manager/book`)         
            return response.data
        } catch (error) {
            console.error('Error fetching movies:', error)
            throw error
        }
    }
}
export default ManagerController