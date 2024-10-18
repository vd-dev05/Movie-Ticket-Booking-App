import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

import {
    InputOTP,
    InputOTPGroup,
    InputOTPSeparator,
    InputOTPSlot,

} from "@/components/ui/input-otp"
import { customFormatPhoneNumber } from '@/lib/phone'
import { useThemeClasses } from "../../Theme/themeStyles";
import { Link, Navigate, useLocation } from "react-router-dom";
import React, { memo, useContext, useEffect, useState } from "react";
import Susses from "./Susses";
import { Button } from "@/components/ui/button";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { toast, ToastContainer } from "react-toastify";
import { auth } from '@/components/firebase/firebase'
import generateRandomNumberString from '@/lib/radomOtp'
import { getAuth, signInWithPhoneNumber, RecaptchaVerifier, } from "firebase/auth";
import { Flex, Input, Typography } from 'antd';


// import from 'randn'
const SendOTp = ({ text, phone, setOpen, isOpen, titlePass,paraPass1,paraPass2 }) => {
    // console.log('+' +phone);
    // const randn = require('randn');
    // console.log(generateRandomNumberString(5));
    const { Title } = Typography;

    const auth = getAuth();


    const { buttonClasses, backGround, textClasses, backGroundTow,themeUniver } = useThemeClasses();
    const [count, setCount] = useState('');
    const [isResendDisabled, setIsResendDisabled] = useState(true);

    const [isTrue, setIsTrue] = useState({
        loading: false,
        openSussces: false
    })
    const [codeOtp, setCodeOtp] = useState(generateRandomNumberString(4))
    const [veryCode, setVeryCode] = useState()


    useEffect(() => {
  
        // if (veryCode != codeOtp && !isTrue.loading) {
        //     toast.warn('Otp not successfull !', {
        //         position: "top-right",
        //         autoClose: 10000,
        //         hideProgressBar: false,
        //         closeOnClick: true,
        //         pauseOnHover: true,
        //         draggable: true,
        //         progress: undefined,
        //         theme: "light",

        //         });

        // }
        if (count > 0) {
            const intervalId = setInterval(() => {
                setCount(prev => prev - 1);
            }, 1000);
            
            return () => clearInterval(intervalId);
            
        } 
       
    }, [count]);

    const onChange = (text) => {
        console.log('onChange:', text);
        if (text == codeOtp) {
            setVeryCode(text)
        }
    };
    const sharedProps = {
        onChange,
    };

    const handleClick = () => {
        setIsTrue(pre => ({ ...pre,loading: true}))
        setTimeout(() => {
            if (veryCode === codeOtp) {
                setIsTrue({
                    loading: false,
                    openSussces: true
                });
            
            }
            setIsTrue(prev => ({ ...prev, loading: false }));
        }, 1000);
        if (veryCode == codeOtp ) {
            toast.success('Otp  successfull !', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
    
                });   
        
        } else {

            toast.warn('Otp not successfull !', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
    
                });
             
        }
        // if (generateRandomNumberString(5)) {
        //     se
        // }
        // window.recaptchaVerifier = new RecaptchaVerifier(auth, 'recaptcha-container', {
        //     'size': 'normal',
        //     'callback': (response) => {
        //         console.log(response);

        //       // reCAPTCHA solved, allow signInWithPhoneNumber.
        //       // ...
        //     },
        //     'expired-callback': () => {
        //       // Response expired. Ask user to solve reCAPTCHA again.
        //       // ...
        //     }
        //   });


        // const appVerifier = window.recaptchaVerifier;
        // console.log(appVerifier);


        // console.log(new RecaptchaVerifier);

        // window.recaptchaVerifier = new RecaptchaVerifier("sign-in-button", {
        //     'callback': (response) => {
        //       console.log("prepared phone auth process");
        //       console.log(response);

        //     }
        //   }, auth);
        // console.log(`+${phone}`);

        // try {
        //     const recaptcha = new RecaptchaVerifier(auth, "recaptcha", {})
        //     const confirmation = signInWithPhoneNumber(auth, 123456, recaptcha)
        //     setUser(confirmation)
        //     console.log(confirmation);

        // } catch (error) {
        //     console.log(error);

        // }

        //  toasttify ̣
        // setTimeout(() => {
        //     setIsTrue({
        //         loading: false,
        //         openSussces: true
        //     })
        //     // const value = generateRandomNumberString(4)
        //     // setCodeOtp(value)
        // }, 1000);
    }

    return (
        <div>
            <AlertDialog open={isOpen} onOpenChange={setOpen}>
                {/* <AlertDialogTrigger className="w-full border-2 border-blac p-[22px] bg-primary-textMovie text-2xl text-white" onClick={handleResendCode}>{text}</AlertDialogTrigger> */}
                <AlertDialogContent className={`${themeUniver} ${textClasses} border-none top-[30%] left-10 h-[400px] rounded-2xl iphone-12:w-full   max-w-[90%]  sm:max-w-[80%] iphone-12:left-5 min-[400px]:left-7  lg:max-w-[60%]  `}>

                    <AlertDialogHeader>
                        <AlertDialogTitle>Enter Otp</AlertDialogTitle>
                        <AlertDialogDescription className='flex justify-center items-center text-xl'>
                            <p className="w-[300px] ">A verification codes has been sent to {phone ? customFormatPhoneNumber(phone) : null}</p>
                        </AlertDialogDescription>
                        <div className='flex items-center justify-center px-10 py-5'>

                            <Flex gap="large" className=" w-full h-[50px] justify-center " vertical>
                                {/* <Title level={5}>With formatter (Upcase)</Title> */}
                                <Input.OTP

                                    length={4}
                                    color=""
                                    size="40px"
                                    formatter={(str) => str.toUpperCase()} {...sharedProps} />

                            </Flex>
                            {/* 
                           coming sum update 
                            <div id="recaptcha-container" />
                            */}
                        </div>
                        <p className="text-center flex justify-center text-2xl py-2">Otp Code:{codeOtp}</p>

                        {/* <Button onClick={verifyOtp}>Click</Button> */}
                        <Button
                            onClick={handleClick}
                            className={`bg-primary-textMovie hover:bg-primary-textMovie hover:scale-105  w-full flex items-center justify-center rounded-lg py-6 text-white  `}
                        >
                            <span className="flex ">{isTrue.loading ? <AiOutlineLoading3Quarters size={20} color="white" className="animate-spin mr-2 " /> : null}  Verify   </span>
                        </Button>
                        {/* <ToastContainer containerId={"Otp susscefull !"}></ToastContainer> */}
                     
                        <Susses 
                        isTrue={isTrue.openSussces} 
                         titlePass={titlePass} 
                         paraPass1={paraPass1}
                         paraPass2 ={paraPass2}
                         ></Susses>
                        <p >Didn't receive the code ? <span className="text-primary-textMovie cursor-pointer" onClick={() => {
                            setCount(30) 
                            const value = generateRandomNumberString(4)
                            setCodeOtp(value)
                        } }>Resend {count == 0 ? "code" : count}</span></p>
                    </AlertDialogHeader>


                </AlertDialogContent>
            </AlertDialog>
            <ToastContainer containerId={"Otp not successfull !"}></ToastContainer>
            <ToastContainer containerId={"Otp  successfull !"}></ToastContainer>
        </div>
    );
}

export default memo(SendOTp);