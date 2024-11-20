import axios from "axios";


export const getUser = async () =>  {
    try {
        let id = localStorage.getItem('id')
        const r = await axios.get("http://local:8080/api/v1/user", {
            params: {id}
        });
        console.log(r.data);
        localStorage.setItem('name', r.data.name)
        
        return r.data
    } catch (error) {
 
        console.error("Error adding user:", error);

    }
    
}
