import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useTheme } from "@/context/Theme";
import { useThemeClasses } from "@/context/Theme/themeStyles";
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'
import React from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { userSchemaSignUp } from "@/validations/useYupForm";
import { Label } from "@/components/ui/label"
import { EyeInvisibleOutlined, EyeOutlined } from "@ant-design/icons";
import { useFormik } from 'formik';
import { addUser } from "@/controller/CreateUser.controller";
import { useNavURL } from "@/hooks/nav/NavUrl.jsx";
import { v4 } from 'uuid'
import OTPVery from "@/components/Layout/Dasboard/accept/OTPVery";
import { useUser } from "@/context/User/index";
import { showErrorToast, showLoadingToast, showSuccessToast } from "@/lib/toastUtils";


// import {AddCard} from '../Product/Booking/accept/addCard'
const SignUp = () => {
    // console.log(v4(12));

    // const auth = getAuth()
    // console.log(auth);

    // const userId = auth.currentUser.uid;
    // console.log(userId);

    const themeCtx = useTheme()
    const { themeBackGround, themeFocus, themeUniver } = useThemeClasses()
    const [True, setTrue] = useState(false)
    const [vuaState, setVuaState] = useState(false)
    const [phone, setPhone] = useState(null)
    const { setDataUser } = useUser()
    const [message, setMessage] = useState()
    const [isMounted, setIsMounted] = useState(false);
    // const [isPhoneFocused, setIsPhoneFocused] = useState();
    // create notification toasts
    useEffect(() => {
        setIsMounted(true);
        return () => setIsMounted(false);
    }, []);
    const formik = useFormik({
        initialValues: {
            name: '',
            phone: '',
            password: '',
            confirmedPassword: '',
        },
        onSubmit: async (value) => {
            // const toastId = showLoadingToast("Please wait...");
            setDataUser({
                name: value.name,
                phone: value.phone,
                password: value.password,
            })
            try {
                // Your API call (e.g., addUser)
                const d = await addUser(value);
                // console.log(d);
                if (d.status === 403) {
                    if (isMounted) showErrorToast(d.data || "Phone number already registered!");

                }
                console.log(d);
                
                if (d.status === 200) {
                    setPhone(value.phone);
                    setTrue(true);
                    //   showSuccessToast("Account created successfully!"); // Show success toast
                    //   toast.dismiss(toastId); // Dismiss the loading toast
                }
            } catch (error) {
                console.log(error);
                // if (isMounted) {
                //     showErrorToast("An error occurred while creating the account.");
                //     // toast.dismiss(toastId); // Dismiss loading toast
                //   }
            }
        },


        validationSchema: userSchemaSignUp,
        validateOnChange: true,
        validateOnBlur: true,
    })
    // console.log(formik.values);
    useNavURL(localStorage.getItem("account-basic-info") ? "/home" : null, 2100);
    const typePass = () => {
        setVuaState(prevState => !prevState);
    };



    return (
            <div className={` iphone-12-pro-max:flex  flex-col text-left font-movie  ${themeUniver} `}>
                <div>
                    <OTPVery True={True} setTrue={setTrue} phone={phone} ></OTPVery>
                </div>

                <div className="p-3 text-center">
                    <div className="flex justify-center h-56">
                        <img src="assets/img/logo1.png" className="h-96 -translate-y-20" alt="Logo" />
                    </div>
                    <div className="">
                        <h1 className={`font-logo text-[29px] text-nowrap  font-movieTicket  `}>Create New Account</h1>
                        <p className="text-xl mt-2">Set up your username and password</p>
                        <p className="text-xl mb-4">You can always change it later</p>
                    </div>
                    <div >
                        <form onSubmit={formik.handleSubmit} className="flex flex-col  ">
                            <div onBlur={formik.handleBlur} className={`relative border border-gray-300 rounded-lg my-5  p-2 ${formik.errors.name && formik.touched.name ? 'border-primary-textMovie' : ""} `}>
                                <Input
                                    className={`peer py-5 px-3 w-full outline-none border-none ${themeBackGround}   placeholder-transparent`}
                                    id='name'
                                    name='name'
                                    value={formik.values.name}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                />
                                {/* text-gray-500 */}
                                <Label
                                    htmlFor="name"
                                    className={`absolute left-3 top-1/2 transform ${themeFocus} -translate-y-1/2 ${formik.errors.name && formik.touched.name ? 'text-primary-textMovie' : 'text-gray-400'}  transition-all 
                                    duration-300 peer-focus:-top-0  peer-focus:left-3 peer-focus:${formik.errors.name && formik.touched.name ? 'text-primary-textMovie' : 'text-gray-500'} peer-focus:text-xs
                                    peer-focus:${themeFocus} peer-focus:px-2 ${formik.values.name ? 'top-0 px-2 left-3 text-xs text-primary-textMovie' + { themeFocus } : ''}`}
                                >
                                    Name
                                </Label>
                            </div>
                            <div className="text-left p-0 m-0">
                                {formik.errors.name && formik.touched.name && (
                                    <p className="text-red-600"> {formik.errors.name}
                                    </p>
                                )}
                            </div>
                            <div className={`relative border border-gray-300 rounded-lg my-5  p-2 ${formik.errors.phone && formik.touched.phone ? 'border-primary-textMovie' : ""}  `}>
                                {/* <PhoneInput
                                     onBlur={formik.handleBlur}
                                    id='phone'
                                    name='phone'
                                    value={formik.values.phone}
                                    onChange={(value) => formik.setFieldValue('phone', value)}
                                    placeholder=""
                                    // containerClass="border-2 outline-none rounded-lg border-[1px]"
                                    buttonStyle={{ border: 'none' }}
                                    inputStyle={{ width: '100%', color: themeBackGround, paddingRight: '10px', border: 'none', backgroundColor: themeCtx.theme == 'dark' ? '#1a1a1a' : 'white' }}
                                    country={'us'}
                                    onlyCountries={['us', 'vn']}
                                /> */}
                                <Input
                                    className={`peer py-5 px-3 w-full outline-none border-none ${themeBackGround}   placeholder-transparent`}
                                    id='phone'
                                    name='phone'
                                    value={formik.values.phone}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                />
                                <Label
                                    htmlFor="phone"
                                    className={`absolute left-3 top-1/2 transform  ${themeFocus} -translate-y-1/2 ${formik.errors.phone && formik.touched.phone ? 'text-primary-textMovie' : 'text-gray-400'} transition-all 
                                    duration-300 peer-focus:-top-0  peer-focus:left-3 peer-focus:text-gray-500 peer-focus:text-xs
                                    peer-focus:${themeFocus} peer-focus:px-2 ${formik.values.phone ? 'top-0 px-2 left-3 text-xs ' + { themeFocus } : ''}`}
                                >
                                    Phone
                                </Label>
                            </div>
                            <div className="text-left p-0 m-0">
                                {formik.errors.phone && formik.touched.phone && (
                                    <p className="text-red-600"> {formik.errors.phone}
                                    </p>
                                )}
                            </div>
                            <div className={`relative border border-gray-300 rounded-lg my-5  p-2 ${formik.errors.password && formik.touched.password ? 'border-primary-textMovie' : ''}  `}>
                                <Input
                                    className={`peer py-5 px-3 w-full outline-none border-none ${themeBackGround} placeholder-transparent`}
                                    type={vuaState == true ? 'password' : 'text'}
                                    id='password'
                                    name='password'
                                    value={formik.values.password}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                />
                                <div className="absolute top-5 right-5">
                                    {vuaState ? <EyeInvisibleOutlined onClick={() => setVuaState(false)} /> : <EyeOutlined onClick={() => setVuaState(true)} />}
                                </div>

                                <Label
                                    htmlFor="PassWord"
                                    className={`absolute left-3 top-1/2 transform ${themeFocus} -translate-y-1/2 ${formik.errors.password && formik.touched.password ? 'text-primary-textMovie' : 'text-gray-400'}  transition-all 
                                    duration-300 peer-focus:-top-0  peer-focus:left-3 peer-focus:${formik.errors.password ? 'text-primary-textMovie' : 'text-gray-500'} peer-focus:text-xs
                                    peer-focus:${themeFocus} peer-focus:px-2 ${formik.values.password ? 'top-0 px-2 left-3 text-xs text-primary-textMovie' + { themeFocus } : ''}`}
                                >
                                    Password
                                </Label>
                            </div>
                            <div className="text-left p-0 m-0">
                                {formik.errors.password && formik.touched.password && (
                                    <p className="text-red-600"> {formik.errors.password}
                                    </p>
                                )}
                            </div>
                            <div className={`relative border border-gray-300 rounded-lg my-5  p-2 ${formik.errors.confirmedPassword && formik.touched.confirmedPassword ? 'border-primary-textMovie' : ''}  `}>
                                <Input
                                    className={`peer py-5 px-3 w-full outline-none border-none ${themeBackGround} placeholder-transparent`}
                                    type={vuaState == true ? 'password' : 'text'}
                                    id='confirmedPassword'
                                    name='confirmedPassword'
                                    value={formik.values.confirmedPassword}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                />
                                <div className="absolute top-5 right-5">
                                    {vuaState ? <EyeInvisibleOutlined onClick={() => setVuaState(false)} /> : <EyeOutlined onClick={() => setVuaState(true)} />}
                                </div>
                                <Label
                                    htmlFor="realignPass"
                                    className={`absolute left-3 top-1/2 transform ${themeFocus} -translate-y-1/2 ${formik.errors.confirmedPassword && formik.touched.confirmedPassword ? 'text-primary-textMovie' : 'text-gray-400'}  transition-all 
                                    duration-300 peer-focus:-top-0  peer-focus:left-3 peer-focus:${formik.errors.confirmedPassword ? 'text-primary-textMovie' : 'text-gray-500'} peer-focus:text-xs
                                    peer-focus:${themeFocus} peer-focus:px-2 ${formik.values.confirmedPassword ? 'top-0 px-2 left-3 text-xs text-primary-textMovie' + { themeFocus } : ''}`}
                                >
                                    Re-enter Password
                                </Label>
                            </div>
                            <div className="text-left p-0 m-0">
                                {formik.errors.confirmedPassword && formik.touched.confirmedPassword && (
                                    <p className="text-red-600"> {formik.errors.confirmedPassword}
                                    </p>
                                )}
                            </div>
                            <Button
                                type="submit"
                                className="bg-primary-textMovie w-full mt-10 p-6 hover:-translate-y-1 delay-150 hover:scale-105 transition duration-700 ease-in-out focus:bg-chairMovie-chairSelected hover:bg-primary-textMovie"
                            >
                                <span className="text-white ">Signup</span>
                            </Button>

                        </form>
                        <div>

                            {/* <OTPVery phone={formik.values.phone} setTrue={setTrue} True={True} ></OTPVery> */}
                        </div>
                    </div>
                    <div>
                        <p className="mt-20">Already have an account? <Link to="/login" className="text-primary-textMovie">Login</Link></p>
                    </div>

                </div>
            </div>
      
    );
};

export default SignUp;
