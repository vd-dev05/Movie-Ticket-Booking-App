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
    createMovie : async (value) => {
        try {
            const {_id} = JSON.parse(localStorage.getItem('seller'))
 
            
            
            const response = await axios.post(`${baseURL}/api/v1/manager/ticket/${ value.movieId}` , {
                userId : _id , 
                type  : value.sellerId[0],
                event : value.time_slots,
                price : value.price,
                address : value.address
            })
            
            return response
        } catch (error) {   
            throw new Error( error.response.data.error)
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
    },
    loginManager : async (value) => {
        try {
            const response = await axios.post(`${baseURL}/api/v1/manager/signin`,{
                email : value.email,
                password : value.password,
            })         
            return response.data
        } catch (error) {
        throw new Error(error.response.data.error)
        }
    }
}
export default ManagerController