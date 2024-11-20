import axios from "axios"
const baseURL = import.meta.env.VITE_REACT_API_URL

const UserController = {
    loginUser : async (value) => {
        try {
            const response = await axios.post(`${baseURL}/api/v1/users/signin`, value)
            localStorage.setItem('access_token', response.data.asscessToken)          
            localStorage.setItem('account-info', JSON.stringify({name : response.data.data.name}))
            return response.data
        } catch (error) {
            return error?.response
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
    }
}

export default UserController