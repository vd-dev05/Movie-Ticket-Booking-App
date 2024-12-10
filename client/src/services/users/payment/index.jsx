import axios from "axios";

const Payment = {
    momo : async (value ) => {
        console.log(value);
        
        try {
            if (value) {
                const response = await axios.post(`${import.meta.env.VITE_REACT_API_URL }/api/v1/users/payments`, {
                    title : value.title,
                    price : 1000,
    
                  
                });
              return response.data
            }
        
           
        } catch (error) {
            console.error(error);
            return null;
        }
    }
}
export default Payment