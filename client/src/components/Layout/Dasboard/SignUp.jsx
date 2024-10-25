import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
// import { db, database } from '../../firebase/firebase';
// import { collection, getDocs, addDoc, doc, updateDoc } from "firebase/firestore";
// import { getDatabase, ref, set, update } from 'firebase/database'
// import { getAuth } from "firebase/auth"
import { useTheme } from "../../../context/Theme";
// import AddCard from "../Product/Booking/accept/addCard";
// import OTPVery from "./accept/OTPVery";
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'
import { useThemeClasses } from "../../../context/Theme/themeStyles";
import React from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { userSchemaSignUp } from "@/validations/useYupForm";
import { Label } from "@/components/ui/label"
import { EyeInvisibleOutlined, EyeOutlined } from "@ant-design/icons";
import { useFormik } from 'formik';
import { addUser } from "@/controller/CreateUser.controller";
import { useNavURL } from "@/hooks/nav/NavUrl.jsx";
import { v4 } from 'uuid'

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
    useEffect(() => {
        console.log(True); // This will log the updated value whenever True changes
    }, [True]);
    const formik = useFormik({
        initialValues: {
            name: '',
            phone: '',
            password: '',
            confirmedPassword: '',
        },
        onSubmit:  (value) => {
          
            if (value.password !== value.confirmedPassword) {
                toast.error("Passwords do not match!");
                return;
            }
            addUser(value,formik);
            console.log(localStorage.getItem('id'));
           
        
            // console.log(True);
            
            // const  reponse = await axios.get("http://localhost:8080/v1/users")
            // console.log(reponse.data.data);

          
            // setTrue(true)
            // ClickAddUser();

        },
        validationSchema: userSchemaSignUp
    })
    // console.log(formik.values);
    useNavURL(localStorage.getItem("account-basic-info") ? "/home" : null, 2100);
    const typePass = () => {
        setVuaState(true)
       
    }
   
    const ClickAddUser = async () => {
        // const data = await getDocs(collection(db,"user"))
        // console.log(data.docs);
        try {
            // await addDoc(collection(db, "/users"), {
            //     name: formik.values.name,
            //     phone:formik.values.phone,
            //     password: formik.values.password,
            //     createdAt: serverTimestamp()
            // });
            // const userRefAuth = ref(database, 'users/' + 'auth')
            // const userRefData =  ref(database, 'users/');
            // await set(  userRefAuth , {
            //     name: formik.values.name,
            //     phone:formik.values.phone,
            //     password: formik.values.password,
            //     email:'',
            // })


        } catch (error) {
            // setTrue(false)
            console.error("Error adding document: ", error);
        }
    };
    return (
        <div >

            <div className={` iphone-12-pro-max:flex  flex-col text-left font-movie  ${themeUniver} `}>
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
                            <div className={`relative border border-gray-300 rounded-lg my-5  p-2 ${formik.errors.name ? 'border-primary-textMovie' : ''}  `}>
                                <Input
                                    className={`peer py-5 px-3 w-full outline-none border-none ${themeBackGround}   placeholder-transparent`}
                                    id='name'
                                    name='name'
                                    value={formik.values.name}
                                    onChange={formik.handleChange}
                                />
                                {/* text-gray-500 */}
                                <Label
                                    htmlFor="name"
                                    className={`absolute left-3 top-1/2 transform ${themeFocus} -translate-y-1/2 ${formik.errors.name ? 'text-primary-textMovie' : 'text-gray-400'}  transition-all 
                                    duration-300 peer-focus:-top-0  peer-focus:left-3 peer-focus:${formik.errors.name ? 'text-primary-textMovie' : 'text-gray-500'} peer-focus:text-xs
                                    peer-focus:${themeFocus} peer-focus:px-2 ${formik.values.name ? 'top-0 px-2 left-3 text-xs text-primary-textMovie' + { themeFocus } : ''}`}
                                >
                                    Name
                                </Label>
                            </div>
                            <div className="text-left p-0 m-0">
                                {formik.errors.name && (
                                    <p className="text-red-600"> {formik.errors.name}
                                    </p>
                                )}
                            </div>
                            <div className={`relative border border-gray-300 rounded-lg my-5  p-4 ${formik.errors.phone ? 'border-primary-textMovie' : ''}  `}>
                                <PhoneInput

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
                                />
                                <Label
                                    htmlFor="phone"
                                    className={`absolute left-[82px] top-1/2 transform ${themeFocus} -translate-y-1/2 ${formik.errors.phone ? 'text-primary-textMovie' : 'text-gray-400'} transition-all 
                                    duration-300 peer-focus:-top-0  peer-focus:left-3 peer-focus:text-gray-500 peer-focus:text-xs
                                    peer-focus:${themeFocus} peer-focus:px-2 ${formik.values.phone ? 'top-0 px-2 left-3 text-xs ' + { themeFocus } : ''}`}
                                >
                                    Phone
                                </Label>
                            </div>
                            <div className="text-left p-0 m-0">
                                {formik.errors.phone && (
                                    <p className="text-red-600"> {formik.errors.phone}
                                    </p>
                                )}
                            </div>
                            <div className={`relative border border-gray-300 rounded-lg my-5  p-2 ${formik.errors.password ? 'border-primary-textMovie' : ''}  `}>
                                <Input
                                    className={`peer py-5 px-3 w-full outline-none border-none ${themeBackGround} placeholder-transparent`}
                                    type={vuaState == true ? 'password' : 'text'}
                                    id='password'
                                    name='password'
                                    value={formik.values.password}
                                    onChange={formik.handleChange}
                                />
                                <div className="absolute top-5 right-5">
                                    {vuaState ? <EyeInvisibleOutlined onClick={() => setVuaState(!vuaState)} /> : <EyeOutlined onClick={typePass} />}
                                </div>

                                <Label
                                    htmlFor="realignPass"
                                    className={`absolute left-3 top-1/2 transform ${themeFocus} -translate-y-1/2 ${formik.errors.password ? 'text-primary-textMovie' : 'text-gray-400'}  transition-all 
                                    duration-300 peer-focus:-top-0  peer-focus:left-3 peer-focus:${formik.errors.password ? 'text-primary-textMovie' : 'text-gray-500'} peer-focus:text-xs
                                    peer-focus:${themeFocus} peer-focus:px-2 ${formik.values.password ? 'top-0 px-2 left-3 text-xs text-primary-textMovie' + { themeFocus } : ''}`}
                                >
                                    Password
                                </Label>
                            </div>
                            <div className="text-left p-0 m-0">
                                {formik.errors.password && (
                                    <p className="text-red-600"> {formik.errors.password}
                                    </p>
                                )}
                            </div>
                            <div className={`relative border border-gray-300 rounded-lg my-5  p-2 ${formik.errors.confirmedPassword ? 'border-primary-textMovie' : ''}  `}>
                                <Input
                                    className={`peer py-5 px-3 w-full outline-none border-none ${themeBackGround} placeholder-transparent`}
                                    type={vuaState == true ? 'password' : 'text'}
                                    id='confirmedPassword'
                                    name='confirmedPassword'
                                    value={formik.values.confirmedPassword}
                                    onChange={formik.handleChange}
                                />
                                <div className="absolute top-5 right-5">
                                    {vuaState ? <EyeInvisibleOutlined onClick={() => setVuaState(!vuaState)} /> : <EyeOutlined onClick={typePass} />}
                                </div>
                                <Label
                                    htmlFor="realignPass"
                                    className={`absolute left-3 top-1/2 transform ${themeFocus} -translate-y-1/2 ${formik.errors.confirmedPassword ? 'text-primary-textMovie' : 'text-gray-400'}  transition-all 
                                    duration-300 peer-focus:-top-0  peer-focus:left-3 peer-focus:${formik.errors.confirmedPassword ? 'text-primary-textMovie' : 'text-gray-500'} peer-focus:text-xs
                                    peer-focus:${themeFocus} peer-focus:px-2 ${formik.values.confirmedPassword ? 'top-0 px-2 left-3 text-xs text-primary-textMovie' + { themeFocus } : ''}`}
                                >
                                    Re-enter Password
                                </Label>
                            </div>
                            <div className="text-left p-0 m-0">
                                {formik.errors.confirmedPassword && (
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
                        <p className="mt-20">Already have an account? <Link to="/L" className="text-primary-textMovie">Login</Link></p>
                    </div>
                    <ToastContainer></ToastContainer>
                </div>
            </div>
        </div>
    );
};

export default SignUp;
