import axios from "axios";
import { toast } from "react-toastify";


export const loginUser = async (value,formik) =>  {
    
    try {
        
        const r = await axios.post("http://localhost:8080/api/v1/users/signin", {
            password: value.password,
            phone:(value.phone),
        });
        // console.log(r);
        
        if (r.status === 201) {
       
            
            localStorage.setItem("account-basic-info" , JSON.stringify({username : r.data.data.name , id : r.data.data._id}))
            toast.success('Login Successfull !', {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
          
            formik.resetForm();
           
           
            
        }
    } catch (error) {
        // toast.error("Error adding user:", error.message, {
         
        // })
        console.error("Error adding user:", error);
        // Optionally notify the user here
    }
  
    
}
