import React, { useEffect, useState } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from 'react-router-dom';
import { app ,db} from '../../firebase/firebase';
import { getAuth, signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { useUser } from '@/components/Layout/Product/GetApi/GetContext'; // Sử dụng hook
import { collection, getDocs } from "firebase/firestore";
import { useTheme } from '../Theme';
const Otp = () => {
    const themeCtx = useTheme()    
    const { setDataUser } = useUser(); //get hook
    const navigate = useNavigate();
    const auth = getAuth(app);
    const provider = new GoogleAuthProvider();

    const [data, setData] = useState({
        email: "",
        password: "",
        valueUser: "",
    
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setData(prevData => ({
            ...prevData,
            [name]: value,
        }));
    };

    const LoginGoogle = () => {
        signInWithPopup(auth, provider)
            .then((result) => {
                setData(prevData => ({
                    ...prevData,
                    valueUser: result.user.email
                }));
                console.log(result);
                
                setDataUser({ 
                    user: '', 
                    phone: '',
                    email: result.user.email ,
                    total:0,
                    loveMovie:[],
                    dataComent:[],
                    card: {
                        name:"",
                        numberCard:"",
                        date:"",
                        cvv:""
                    },
                    dataTicket:[],
                });
            })
            .catch((err) => {
                console.log(err);
            });
    };

    // useEffect(() => {
    //     if (data.valueUser) {
    //         navigate('/home');
    //     }
    // }, [data.valueUser, navigate]);

    const LoginUser = (e) => {
        e.preventDefault();
        signInWithEmailAndPassword(auth, data.email, data.password)
            .then((data) => {
                navigate('/home');  
                console.log(data);
                      
            })
            .catch((err) => {
                console.log(err);
            });

        setData({
            email: "",
            password: "",
            valueUser: ""
        });
    };

    return (
        <div className={`iphone-12-pro-max:flex flex flex-col h-max iphone-12:w-[390px] font-movie ${themeCtx.theme == 'dark' ? 'bg-dark-bg text-light-bg':'bg-white'} `}>
            <div className=" flex justify-center h-56 ">
                <img src="/src/assets/img/logo1.png" className=" h-96 -translate-y-20" alt="" />
            </div>
            <div className=" text-center text-3xl">
                <h1 className="font-logo text-4xl">Welcome Back</h1>
                <p className="text-xl px-10 text-gray-400">
                    Log in to your account using email or social networks
                </p>
            </div>
            <div>
                <div className=" px-6 mt-5">
                    <Button
                        className="w-full flex mb-10 p-6 border-gray-300"
                        variant="outline"
                    >
                        <div className="mr-2">
                            <box-icon type='logo' name='apple' color={ themeCtx.theme == 'dark' ? 'white'  :'black'}></box-icon>
                        </div>
                        <div>Login with Apple</div>
                    </Button>
                    <Button
                        onClick={LoginGoogle}
                        className="w-full outline-none border-gray-300"
                        variant="outline"
                    >
                        <div className="mr-2">
                            <img src="/src/assets/img/google.png" className="w-5" alt="" />
                        </div>
                        <p> Login with Google</p>
                    </Button>
                </div>
            </div>
            <div className="relative my-10">
                <hr className="mx-6 border-[1px]" />
                <p className={`absolute -top-3  text-gray-400 px-3 left-[70px] ${themeCtx.theme == 'dark' ? 'bg-dark-bg text-light-bg'  :'bg-white'} `}>Or continue with social account</p>
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
                            className={`w-full mb-5 py-6 ${themeCtx.theme == 'dark' ? 'bg-dark-bg text-light-bg'  :'bg-white'}`}
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
                            className={`w-full mb-5 py-6 ${themeCtx.theme == 'dark' ? 'bg-dark-bg text-light-bg'  :'bg-white'}`}
                            required 
                            />
                            

                    </div>
                    <div className="text-right mt-3 mb-5">
                        <Link to="/reset" className='text-primary-textMovie'>Forgot Password ?</Link>
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
                        Didn't have an account ? <Link to="/signup" className='text-primary-textMovie'>Register</Link>
                    </p>


                </form>

            </div>
        </div>
    );
}

export default Otp;
