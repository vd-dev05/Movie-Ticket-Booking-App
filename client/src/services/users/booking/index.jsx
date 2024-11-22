import axios from "axios"

const baseURl = import.meta.env.VITE_REACT_API_URL

const BookingController = {
     getMovieBook  : async (movieId) => {
         try {
             const response = await axios.get(`${baseURl}/api/v1/movies/${movieId}`)
             return response.data
         } catch (error) {
             console.error('Error fetching movie:', error)

         }
     },
     seatsBookings : async (token,value,movieId) => {
         try {
      
             const response = await axios.post(`${baseURl}/api/v1/users/ticket`, {
               day : value.day,
               hour : value.hour,
               seat : value.seats,
               price  : value.totalprice ,
               movieId  : movieId
             },{
                headers : {
                    'Authorization': `Bearer ${token}`
                }
             })
             return response.data
         } catch (error) {
            return error
         }
     }
}
 
export default BookingController;