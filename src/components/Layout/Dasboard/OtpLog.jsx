// import {
//     Form,
//     FormControl,
//     FormDescription,
//     FormField,
//     FormItem,
//     FormLabel,
//     FormMessage,
// } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
//   import { useForm } from "react-hook-form"
//   import { toast } from "@/components/ui/use-toast"
import { Button } from "@/components/ui/button"
// import { BugIcon } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import { useState } from "react";
import {app } from '../../firebase/firebase' 
import { getAuth ,signInWithEmailAndPassword,signInWithPopup,GoogleAuthProvider } from "firebase/auth";
// import { useNavigate } from "react-router-dom";


const Otp = () => {
    // const FormSchema = z.object({
    //     username: z.string().min(2, {
    //       message: "Username must be at least 2 characters.",
    //     }),
    //   })
    // const form = useForm<z.infer<typeof FormSchema>>({
    //     resolver: zodResolver(FormSchema),
    //     defaultValues: {
    //       username: "",
    //     },
    //   })

   
    //Create an instance
    const auth = getAuth(app)   
    const provider = new GoogleAuthProvider();

    const [data, setData] = useState({
        email: "",
        password: "",
        valueUser :""
    })
  
    const handleChange = (e) => {
        const { name, value } = e.target;
        setData(prevData => ({
            ...prevData,
            [name]: value,

        }));
    };
    const LoginGooggle = () => {
        signInWithPopup(auth,provider)
        .then((result) => {
            // if (result) {
            //     lognav("/home")
            //   }
            // console.log(result.user.email);
            setData(prevData => ({
                ...prevData,
                valueUser:result.user.email
    
            }))
     
        }).catch((err) => {
            console.log(err);
            
        });
        // console.log(data.valueUser);
        
    }

    const LoginUser = (e) => {
        e.preventDefault();
    
        // console.log(data);
        signInWithEmailAndPassword(auth,data.email,data.password)
        .then((value) =>  {
            // alert('Login success')
            // console.log("Login success",value)
        }
          )
        .catch((err) => console.log(err))

        setData({
            email:"",
            password:""

        })
        
    }
   
    return (
        <div className="iphone-12-pro-max:flex flex flex-col h-[100vh] iphone-12:w-[390px] font-movie ">
            <div className=" flex justify-center h-56 ">
                <img src="/src/assets/img/logo1.png" className=" h-96 -translate-y-20" alt="" />
            </div>
            <div class=" text-center text-3xl">
                <h1 className="font-logo text-4xl">Welcome Back</h1>
                <p className="text-xl  px-10 text-gray-400">
                    Log in to your account using email or social networks
                </p>

            </div>
            <div>

                <div className=" px-6 mt-5 " >
                    <Button
                        className="w-full flex mb-10 p-6  border-gray-300"
                        variant="outline"
                    >
                        <div className="mr-2">
                            <box-icon type='logo' name='apple' ></box-icon>
                        </div>
                        <div>
                            Login with Apple
                        </div>
                    </Button>
                    <Link to={"/home"} className="text-white" >
                    
                    <Button
                        onClick={LoginGooggle}
                        className="w-full outline-none border-gray-300"
                        variant="outline"
                    >
                        <div className="mr-2">
                            <img src="/src/assets/img/google.png" className="w-5 " alt="" />
                        </div>
                        <p> Login with Googgle</p>
                    </Button>
                    </Link>
                    
                </div>


            </div>
            <div className="relative my-10">
                <hr className="mx-6 border-[1px]"></hr>
                <p className="absolute  -top-3 bg-white text-gray-400 px-3 left-[70px]">Or continue with social account </p>
            </div>
            <div className="p-5">
                <form>
                    <div>
                        <Input
                            value={data.email}
                            name="email"
                            type="email"
                            onChange={handleChange}
                            placeholder="Mobile Number"
                            className="w-full mb-5"
                            required 
                        />
                    </div>
                    <div>
                        <Input
                            value={data.password}
                            name="password"
                            type="password"
                            onChange={handleChange}
                            placeholder="Password" 
                            required 
                            />
                            

                    </div>
                    <div className="text-right mt-3 mb-5">
                        <Link to="/reset">Forgot Password ?</Link>
                    </div>
                    <div >
                        {/* <Link to="/home" className="text-white"> */}
                            <Button
                                onClick={LoginUser}
                                className="w-full bg-primary-textMovie "
                                variant="outline"
                            >
                                Login</Button>
                        {/* </Link> */}

                    </div>
                    <p className="text-center mt-5">
                        Didn't have an account ? <Link to="/signup">Register</Link>
                    </p>


                </form>

            </div>
        </div>
    );
}

export default Otp;
