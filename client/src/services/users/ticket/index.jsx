import axios from "axios";

const TicketController = {
    getTicket : async (value) =>  {    
        try {
           const response = await axios.get(`${import.meta.env.VITE_REACT_API_URL}/api/v1/users/ticket/${value}`,{
             headers : {
                 'authorization': `Bearer ${localStorage.getItem('access_token')}`
             }
           })
          return response
           
        } catch (error) {
     return error       
        }
    },
    getAllTicket : async (value) => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_REACT_API_URL}/api/v1/users/ticket/all`,{
             headers : {
                 'authorization': `Bearer ${localStorage.getItem('access_token')}`
             }
           })
           return response
        } catch (error) {
            return error
        }
    },
    deleteTicketDb : async (value) => {
        try {
            const response = await axios.delete(`${import.meta.env.VITE_REACT_API_URL}/api/v1/users/deleteTicket`,{
             headers : {
                 'authorization': `Bearer ${localStorage.getItem('access_token')}`
             }
           })
           return response
        } catch (error) {
            return error
        }
    }
}
export  default TicketController