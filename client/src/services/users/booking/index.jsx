import axios from "axios"

const baseURl = import.meta.env.VITE_REACT_API_URL

const BookingController = {
    getBookingSeller :async (type) => {
        try {
            if (type) {
                const response = await axios.post(`${baseURl}/api/v1/users/seller/all`,{
                    type ,
                },{
                    headers : {
                        'Authorization': `Bearer ${localStorage.getItem('access_token')}`
                    }
                })
                return response.data
            }
        } catch (error) {
            throw new Error (error)
        }
    },

     getMovieBook  : async (movieId) => {
         try {
             const response = await axios.get(`${baseURl}/api/v1/movies/${movieId}`)
             return response.data
         } catch (error) {
             console.error('Error fetching movie:', error)

         }
     },
     seatsBookings : async (token,value,movieId, addressPared ,timeStart ,timeEnd ,datepared ) => {
         try {
            
             const response = await axios.post(`${baseURl}/api/v1/users/ticket`, {
               seat : value.seats,
               price  : value.totalprice ,
               movieId  : movieId,
               status : "Booked",
               event :{
                start : timeStart,
                end : timeEnd
               },
               address : addressPared,
               date : datepared
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