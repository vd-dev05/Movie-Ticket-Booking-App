import axios from "axios"

const CancelServices = {
    create : async ( selectedValue,rating,movieId,ticketId,seat) => {
     try {
        // console.log( selectedValue,rating,id);
        // console.log( JSON.parse(localStorage.getItem('account-info')));
        
        const response = await axios.put(`${import.meta.env.VITE_REACT_API_URL}/api/v1/cancels/create` ,{
            ticketId ,
            selectedValue,
            rating,
            movieId ,
            nameUser : JSON.parse(localStorage.getItem('account-info')),
            seats : seat
        },{
            headers : {
                'authorization': `Bearer ${localStorage.getItem('access_token')}`
            }
        })
        return  response
        // console.log(response);
        
     } catch (error) {
        console.log(error);
        
     }
    }
}
export default CancelServices 