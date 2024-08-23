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

import { useThemeClasses } from "../../Theme/themeStyles";
import { Link } from "react-router-dom";
import React, { memo, useContext, useEffect, useState } from "react";
import Susses from "./Susses";
const SendOTp = ({ text, phone }) => {
    const { buttonClasses, backGround, textClasses, backGroundTow } = useThemeClasses();
    const [count, setCount] = useState('');
    const [isResendDisabled, setIsResendDisabled] = useState(true);

    useEffect(() => {
      if (count > 0) {
        const intervalId = setInterval(() => {
            setCount(prev => prev - 1);
        }, 1000);
        return () => clearInterval(intervalId);
      } else {
        setIsResendDisabled(false);
      }
    }, [count]);

    const handleResendCode = () => {
        // Reset timer and disable the resend button
        setCount(30);
        setIsResendDisabled(true);
    
        // Simulate code resend logic here
        console.log('Resending code...');
      };

    return (
        <div>
            <AlertDialog>
                <AlertDialogTrigger className="w-full border-2 border-blac p-[22px] bg-primary-textMovie text-2xl text-white" onClick={handleResendCode}>{text}</AlertDialogTrigger>
                <AlertDialogContent className={`${backGroundTow} ${textClasses} border-none top-[30%] left-10 h-[400px] rounded-2xl iphone-12:w-full   max-w-[90%]  sm:max-w-[80%] iphone-12:left-5 min-[400px]:left-7  lg:max-w-[60%]  `}>

                    <AlertDialogHeader>
                        <AlertDialogTitle>Enter Otp</AlertDialogTitle>
                        <AlertDialogDescription className='flex justify-center items-center text-xl'>
                            <p className="w-[300px] ">A verification codes has been sent to {phone}</p>
                        </AlertDialogDescription>
                        <div className='flex items-center justify-center p-10'>

                        <InputOTP maxLength={4} >
                            {...Array(4).keys().map((item, idx) => (
                                <InputOTPGroup className='' key={idx}>
                                    <InputOTPSlot
                                    //  onClick={(e) => {console.log(e)
                                    //  }}
                                     index={item} 
                                     className="w-[60px] h-[60px] text-xl font-bold" />
                                </InputOTPGroup>
                            ))}
                 
                        </InputOTP>
                     
                        </div>
                        <Susses text={'Verify'}></Susses>
                        <p >Didn't receive the code ? <span className="text-primary-textMovie cursor-pointer" onClick={() => setCount(30)}>Resend {count == 0 ? "code" : count}</span></p>
                    </AlertDialogHeader>


                </AlertDialogContent>
            </AlertDialog>
        </div>
    );
}

export default memo(SendOTp);