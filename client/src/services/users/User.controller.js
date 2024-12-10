import { getNumber } from "@/lib/splitCode"
import axios from "axios"
const baseURL = import.meta.env.VITE_REACT_API_URL

const UserServices = {
    loginUser : async (credential) => {
        try {
            const response = await axios.post(`${baseURL}/api/v1/users/signin`, credential)
            localStorage.setItem('access_token', response.data.asscessToken)          
            localStorage.setItem('account_info', JSON.stringify({name : response.data.data.name}))
            return response.data
        } catch (error) {
            throw new Error (error?.response?.data?.error)
        }
    },
    getMovieId  : async (value) => {
        try {
            const response = await axios.get(`${baseURL}/api/v1/movies/${value}`, {
            })
            return response.data
        } catch (error) {
            console.error('Error fetching movie:', error)
        }
    },
    checkValidPhone  : async (value) => {
        try {
            const reponse = await axios.post(`${baseURL}/api/v1/users/signup`, {
                phone_number : value.phone
            })
            return reponse
        } catch (error) {
            return error?.response
        }
    },
    getTokenSend : async (value) => {
        try {
            const reponse = await axios.post(`${baseURL}/api/v1/users/token`, {
                phone_number : value
            })
            return reponse
        } catch (error) {
            return error?.response
        }
    },
    getOtp : async (value,token) => {
        try {
            const reponse = await axios.post(`${baseURL}/api/v1/users/send-code`, {
                phone_number : value
            }, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            if (!r) throw new Error("Couldn't send code")
            
            return reponse
        } catch (error) {
            return error?.response
        }
    },
    verifyCodeOtp : async (value, token,otp) => {
        try {
            // console.log(value, token,otp)
            const reponse = await axios.post(`${baseURL}/api/v1/users/verify-code`, {
                phone_number : value,
                otp : otp
            }, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            return reponse
        } catch (error) {
            return error?.response
        }
    },
    accessToken : async (value) => {
        try {
            const reponse = await axios.post(`${baseURL}/api/v1/users/create-token`, {
                name  : value.name ,
                phone_number : value.phone,
                password: value.password
            })
             localStorage.setItem('access_token', reponse.data.token)
            
            return reponse
        } catch (error) {
            return error?.response
        }
    },
    postRenameUser : async (value) => {
        try {
            const phone = getNumber(value.phone)
            
            const reponse = await axios.put(`${baseURL}/api/v1/users/update-name`, {
                name  : value.name,
                address: value.address,
                phone : phone.number,
            }, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('access_token')}`
                }
            })            
            return reponse
        } catch (error) {
            return error?.response
        }
    },
    upLoadAvatar : async (value) => {
        try {
            const formData = new FormData();
            formData.append('avatar', value);
            // console.log(value)
            const response = await axios.post(`${baseURL}/api/v1/users/upload-avatar`,formData, {
                headers : {
                    "Content-Type"  : 'multipart/form-data',
                     'Authorization': `Bearer ${localStorage.getItem('access_token')}`
                }
            })
            return response
            // console.log(response);
            //  if (response) {
            //     console.log(response);
                
            //  }
        } catch (error) {
            console.log(error);
            
        }
    },
    getUserProfile  :async () =>{
        try {
            const response = await axios.get(`${baseURL}/api/v1/users/profile`,{
                headers : {
                    'Authorization': `Bearer ${localStorage.getItem('access_token')}`
                }
            })
            return response
        } catch (error) {
            return error?.response
        }
    },
    createVoucherNewUser : async (value) => {
        try {
            const response = await axios.post(`${baseURL}/api/v1/users/create-voucher`,{
              
            }, {
                headers :{
                    'authorization': `Bearer ${localStorage.getItem('access_token')}`
                }
            })
            console.log(response);
            return response
        } catch (error) {
            return error?.reponse
        }
    },
    getvoucherUser  : async () => {
        try {
            const response = await axios.get(`${baseURL}/api/v1/users/vouchers/all`, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('access_token')}`
                }
            })
            return response
        } catch (error) {
            return error
        }
    }
}

export default UserServices