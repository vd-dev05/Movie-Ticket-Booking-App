
import axios from "axios";
import { toast } from "react-toastify";
import { Api } from "@/baseUrl";
export const addUser = async (value) => {
    try {

        
        const r = await axios.post(`${Api}/api/v1/users/signup`, {
            // password: value.password,
            phone_number: value.phone,
            // name: value.name
        })  
        return r
    } catch (error) {
        // console.log(error);
        // toast.error(error.response.data, {
        //     style: {
        //         textWrap: "nowrap"
        //     }
        // })
        return error?.response

    }


}

export const accessToken = async (value) => {
    try {     
        // truyen cho 1 token hearder 
        // console.log(value);
        
        const r = await axios.post(`${Api}/api/v1/users/create-token`,{
            name : value.name,
            phone_number : value.phone,
            password: value.password
        })
       return r
        
    } catch (error) {
       return error
    }
}
export const GetTokenSend = async (value) => {
    try {  
        const r = await axios.post(`${Api}/api/v1/users/token`, {
          phone_number  : value
        })
        return r
    } catch (error) {
        console.log(r);
        
    }
}
export const GetToken = async () => {
    try {
        const r = await axios.get(`${Api}/api/v1/users/token`, {
            headers: {
                "Authorization": `Bearer ${localStorage.getItem("token")}`
            }
        })
        console.log(r);
        return r.data
    } catch (error) {
       console.log(r);
       
    }
}

export const GetOtp = async (value,token) =>{
    try {

        const r = await axios.post(`${Api}/api/v1/users/send-code`, {
            phone_number : value,
            
        },{
            headers : {
                "Authorization": `Bearer ${token}`
            }
        })
        if (!r) throw new Error("Couldn't send code")
        // console.log(r);
        
        // toast.success(r.data)
        return
        
    } catch (error) {
        console.log(error);
        
        // toast.error(error.response.data.error, {
        //     style: {
        //         textWrap: "nowrap"
        //     }
        // })
    }
}
export const VerifyCodeOtp = async (value,token,otp) => {
    try {
        const r = await axios.post(`${Api}/api/v1/users/verify-code`, {
            phone_number : value,
            otp : otp,
            // headers : {
            //     "Authorization": `Bearer ${token}`
            // }
        }, { headers : { "Authorization": `Bearer ${token}`}})
        return r
    } catch (error) {
    //   toast.error(error.response.data.error)
        return error.response
        
    }

  
}
export const GetResetOtp = async (value) => {
    try {
        const r = await axios.post(`${Api}/api/v1/users/reset-code`, {
            phone_number : value
        })
        if (!r) throw new Error("Couldn't send code")
       return r
        
    } catch (error) {
        console.log(error);
        
        // toast.error(error.response.data.error, {
        //     style: {
        //         textWrap: "nowrap"
        //     }
        // })
    }
}