import React, { useEffect, useState } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from 'react-router-dom';
import { app, db } from '../../firebase/firebase';
import { getAuth, signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth } from '@/components/firebase/firebase'
import { useUser } from '@/components/Layout/Product/GetApi/GetContext'; // Sử dụng hook
import { collection, getDocs } from "firebase/firestore";
import { useTheme } from '../Theme';
import { useFormik } from 'formik';
import { toast, ToastContainer } from 'react-toastify';
import { userSchemaSignUp } from '@/lib/useYupForm';
import { EyeInvisibleFilled, EyeOutlined } from '@ant-design/icons'
import { Label } from '@/components/ui/label';
import { useThemeClasses } from '../Theme/themeStyles';
const Otp = () => {
    const themeCtx = useTheme()
    const { dataUser, setDataUser } = useUser(); 
    const navigate = useNavigate();
    // const auth = getAuth(app);
    const provider = new GoogleAuthProvider();
    const { themeFocus, themeBackGround } = useThemeClasses()

    const [isOpen, setIsOpen] = useState(false)
    const LoginGoogle = () => {
        signInWithPopup(auth, provider)
            .then((result) => {
                console.log(result);
                console.log(result.user.reloadUserInfo.localId);
                
                // setData(prevData => ({
                //     ...prevData,
                //     valueUser: result.user.email
                // }));
                setDataUser(pre => ({ ...pre, email: result.user.email, }));
                if (dataUser.email) {
                    toast.success('Login Successfull', {
                        position: "top-right",
                        autoClose: 2000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                    });
                    setTimeout(() => {
                        navigate('/home', { state: { key: "value" }});
                    }, 2000); 
                }
                })
            .catch((err) => {
                // toast.error('Login Failed ')
                console.log(err);
            });
    };
    const formik = useFormik({
        initialValues: {
            phone: '',
            password: '',
        },


        onSubmit: (value) => {
            console.log(value);
            console.log("hello");

            toast.success('Login Success done!', {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
            navigate('/home')
        },
        validationSchema: userSchemaSignUp
    })
    // console.log(formik.values);

    return (
        <div className={`iphone-12-pro-max:flex flex flex-col min-h-screen w-full font-movie ${themeCtx.theme == 'dark' ? 'bg-dark-bg text-light-bg' : 'bg-white'} `}>
            <div className=" flex justify-center h-56 ">
                <img src="/assets/img/logo1.png" className=" h-96 -translate-y-20" alt="" />
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
                            <box-icon type='logo' name='apple' color={themeCtx.theme == 'dark' ? 'white' : 'black'}></box-icon>
                        </div>
                        <div>Login with Apple</div>
                    </Button>
                    {/* <Link to={"/home"}> */}

                    <Button

                        onClick={LoginGoogle}
                        className="w-full outline-none border-gray-300"
                        variant="outline"
                    >
                        <div className="mr-2">
                            <img src="/assets/img/google.png" className="w-5" alt="" />
                        </div>
                        <p> Login with Google</p>
                    </Button>
                    {/* </Link> */}
                </div>
            </div>
            <div className="my-10 mx-5 flex flex-col justify-center items-center">
                <hr className="mx-6 border-[1px] bg-white w-full " />
                <p className={` -translate-y-3 w-[250px]  flex justify-center text-gray-400  ${themeCtx.theme == 'dark' ? 'bg-dark-bg text-light-bg' : 'bg-white'} `}>Or continue with social account</p>
            </div>
            <div className="p-5">
                <form onSubmit={formik.handleSubmit}>
                    {/* <div>
                        <Input
                            value={formik.values.phone}
                            name="phone"
                            type="phone"
                            onChange={formik.handleChange}
                            placeholder="Mobile Number"
                            className={`w-full mb-5 py-6 ${themeCtx.theme == 'dark' ? 'bg-dark-bg text-light-bg' : 'bg-white'}`}
                            required
                        />
                    </div> */}
                    <div className={`relative border border-gray-300 rounded-lg my-5 p-2  ${formik.errors.phone ? 'border-primary-textMovie' : ''}  `} >
                        <Input
                            value={formik.values.phone}
                            name="phone"
                            onChange={formik.handleChange}
                            className={`peer py-5 px-3 w-full outline-none border-none ${themeBackGround} placeholder-transparent`}
                            required
                        />
                        <Label
                            htmlFor="realignPass"
                            className={`absolute left-3 top-1/2 transform ${themeFocus} -translate-y-1/2 ${formik.errors.phone ? 'text-primary-textMovie' : 'text-gray-400'}  transition-all 
      duration-300 peer-focus:-top-0  peer-focus:left-3 peer-focus:${formik.errors.phone ? 'text-primary-textMovie' : 'text-gray-500'} peer-focus:text-xs
      peer-focus:${themeFocus} peer-focus:px-2 ${formik.values.phone ? 'top-0 px-2 left-3 text-xs text-primary-textMovie' + { themeFocus } : ''}`}
                        >
                            Phone Coming soom ... 
                        </Label>
                    </div>
                    <div>
                        {formik.errors.phone && (
                            <p className='text-primary-textMovie'>{formik.errors.phone}</p>
                        )}
                    </div>
                    <div className={`relative border border-gray-300 rounded-lg my-5 p-2  ${formik.errors.password ? 'border-primary-textMovie' : ''}  `} >


                        <Input
                            value={formik.values.password}
                            name="password"
                            type={isOpen ? 'text' : 'password'}
                            onChange={formik.handleChange}
                            className={`peer py-5 px-3 w-full outline-none border-none ${themeBackGround} placeholder-transparent`}
                            required
                        />
                        <Label
                            htmlFor="realignPass"
                            className={`absolute left-3 top-1/2 transform ${themeFocus} -translate-y-1/2 ${formik.errors.password ? 'text-primary-textMovie' : 'text-gray-400'}  transition-all 
                              duration-300 peer-focus:-top-0  peer-focus:left-3 peer-focus:${formik.errors.password ? 'text-primary-textMovie' : 'text-gray-500'} peer-focus:text-xs
                              peer-focus:${themeFocus} peer-focus:px-2 ${formik.values.password ? 'top-0 px-2 left-3 text-xs text-primary-textMovie' + { themeFocus } : ''}`}
                        >
                            Password
                        </Label>

                        <div className='absolute right-4 top-4'>
                            {isOpen ? <EyeOutlined onClick={() => setIsOpen(false)} /> : <EyeInvisibleFilled onClick={() => setIsOpen(true)} />}
                        </div>

                    </div>
                    <div>
                        {formik.errors.password && (
                            <p className='text-primary-textMovie'>{formik.errors.password}</p>
                        )}
                    </div>
                    <div className="text-right mt-3 mb-5">
                        <Link to="/reset" className='text-primary-textMovie'>Forgot Password ?</Link>
                    </div>
                    <button
                        // onClick={LoginUser}
                        type="submit"
                        className="w-full bg-primary-textMovie text-white h-14 "
                        variant="outline"
                    >
                        Login</button>
                </form>
                <p className="text-center mt-5">
                    Didn't have an account ? <Link to="/signup" className='text-primary-textMovie'>Register</Link>
                </p>


                <ToastContainer></ToastContainer>
            </div>
        </div>
    );
}

export default Otp;
