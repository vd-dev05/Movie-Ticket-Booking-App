import axios from "axios"
// import { jwtDecode } from "jwt-decode";

const decoded =localStorage.getItem("access_token");

const UserHistory = {
    loveMovie : async (action,movieId) => {
        try {
            const reponse = await axios.put(`${import.meta.env.VITE_REACT_API_URL}/api/v1/users/love-movie/add`,{
                action  : action ,
                movieId : movieId
            },{
                headers : {
                    'authorization': `Bearer ${decoded}`
                }
            })
          return reponse
            
        } catch (error) {
            return error.response
        }
    },
    lastMovie : async (value) => {      
        try {            
            await axios.put(`${import.meta.env.VITE_REACT_API_URL}/api/v1/users/last-movie/add`,{
               movieId  : value,
               action : 'save'
           }, {
               headers : {
                   'authorization': `Bearer ${decoded}`
               }
           })
        } catch (error) {
            return error
        }
    },
    getLastMovie : async (value) => {
            try {
                
                  const reponse = await axios.get(`${import.meta.env.VITE_REACT_API_URL}/api/v1/users/last-movie/all`, {
                    headers : {
                        'authorization': `Bearer ${decoded}`
                    }
 
                  })
                  console.log(reponse);
                  
               return reponse
            } catch (error) {
                return error
            }
    },
    getLoveMovie : async () => {
        try {
            const reponse = await axios.get(`${import.meta.env.VITE_REACT_API_URL}/api/v1/users/love-movie/all`,{
                action : "love",
                headers : {
                    'authorization': `Bearer ${decoded}`
                }
            })
            
            return reponse
        } catch (error) {
            return error
        }
    }
}
export default UserHistory