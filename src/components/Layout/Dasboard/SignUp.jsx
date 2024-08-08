import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { Link } from "react-router-dom";
// fire base 
import {app } from '../../firebase/firebase' 
import { getAuth ,createUserWithEmailAndPassword  } from "firebase/auth";
const SignUp = () => {
    // fire base 
    const auth = getAuth(app)   
    
    const appVerifier = window.recaptchaVerifier;
 


    const [data,setData] = useState({
        email : "",
        password:"",
        phone:"", 
        realignPass:"", 
    })
    const ClickFireBase = () => {   
        createUserWithEmailAndPassword(
            auth,data.email,data.password
        ).then((value) => {
            
            console.log(value)
            alert("Done")
            console.log(data);
            
        })
     
    }
    const handleChange = (e) => {
        const { name, value } = e.target;
        setData(prevData => ({
            ...prevData,
            [name]: value,
    
        }));
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        if (data.realignPass !== data.password)alert("sai pass")
        ClickFireBase()

        // reset 
        setData({
            email : "",
            password:"",
            phone:"", 
            realignPass:"", 
        })
       
        
       
    }
    return (
        <div>
            <div className="iphone-12-pro-max:flex h-[100vh]  flex-col text-left font-movie  bg-gray-500">
                <div className="p-3 text-center">
                    <div className="flex justify-center h-56 ">
                        <img src="/src/assets/img/logo1.png" className=" h-96 -translate-y-20" alt="" />
                    </div>
                    <div className="text-gray-400">
                        <h1 className="font-logo text-[29px] text-nowrap text-black font-movieTicket ">Create New Account </h1>
                        <p className="text-xl mt-2">Set Up yoyur username and password </p>
                        <p className="text-xl mb-4">You can always change it later</p>
                    </div>
                    <div>
                    
                        <Input
                        className ="py-6 my-5 outline-none"
                        placeholder="Name"
                        type="text"
                        value={data.email}
                        onChange={handleChange}
                        name="email"
                        ></Input>
                        <Input
                         placeholder="Mobile Number"
                        className ="py-6 my-5 outline-none"
                        value={data.phone}
                        onChange={handleChange}
                        name="phone"
                        type="text"></Input>
                        <Input
                         placeholder="Password"
                        className ="py-6 my-5 outline-none"
                        name="password"
                        value={data.password}
                        required 
                        onChange={handleChange}
                        type="password"></Input>
                        <Input 
                        placeholder="Enter the password"
                        className ="py-6 my-5 outline-none"
                        name="realignPass"
                        value={data.realignPass}
                        required 
                        onChange={handleChange}
                        type="password"></Input>
                    </div>
                    <div>
                        <Button
                            onClick={handleSubmit}
                            className="bg-primary-textMovie w-full p-6 focus:bg-chairMovie-chairSelected"
                        ><p className="text-white ">
                        Signup</p></Button>
                    </div>
                    <div>
                        <p className="mt-20">Aleady have an account?<Link to="/L">Login</Link></p>
                    </div>
                </div>

            </div>
        </div>
    );
}

export default SignUp;