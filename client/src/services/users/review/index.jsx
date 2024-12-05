import axios from "axios";

const ReviewMovie = {
    create: async ({movieId ,star, review}) => {        
        try {
 
            
            const response = await axios.put(`${import.meta.env.VITE_REACT_API_URL }/api/v1/movies/${movieId}/review`, {
                star, review
            },{
                headers : {
                    'authorization': `Bearer ${localStorage.getItem('access_token')}`
                }
            });
          return response.data
           
        } catch (error) {
            console.error(error);
            return null;
        }
    }
}
export default ReviewMovie