import axios from "axios";
import { toast } from "react-toastify";


export const addUser = async (value,formik) =>  {
    
    try {
        
        const r = await axios.post("http://localhost:8080/api/v1/users/signup", {
            name: value.name,
            phone: value.phone,
            password: value.password,
            role: 'User',
            // email:  Math.random().toString() * 10 + '@gmail.com'  ,
        });
        console.log(r);
        
        if (r.status === 201) {
       
            
            localStorage.setItem("account-basic-info" , JSON.stringify({username : value.name , id : r.data.data._id}))
            toast.success('Create account done!', {
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
