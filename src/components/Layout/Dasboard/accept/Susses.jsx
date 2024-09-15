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

import { useThemeClasses } from "@/components/Layout/Theme/themeStyles";
import { Link } from "react-router-dom";
import React, { memo, useContext, useEffect, useState } from "react";
import { useTheme } from "../../Theme";
import { CiCircleCheck } from "react-icons/ci";
const Susses = ({ text,isTrue}) => {
    const { buttonClasses, backGround, textClasses, backGroundTow ,themeSussesOTp} = useThemeClasses();
    const themeCtx = useTheme()
    return (
        <div>
              <AlertDialog className={``} open={isTrue}>
                <AlertDialogTrigger >
                    {text}
                </AlertDialogTrigger>
                <AlertDialogContent className={`${themeCtx.theme == 'dark' ? 'bg-[#130d0d]': 'bg-white'} ${textClasses} max-w-[96vw] right-3 h-max  top-[25%] rounded-lg border-none outline-none`}>

                    <AlertDialogHeader className="flex items-center">
                        <div className='flex justify-center items-center h-[200px] '>
                            <div className={` fixed w-[92px] h-[92px] ${themeSussesOTp} animate-move bg-[#d3f1e0] rounded-full flex items-center justify-center`}>

                            </div>
                            <div className="bg-chairMovie-chairSelected h-[80px] w-[80px] z-100 absolute flex justify-center items-center rounded-full drop-shadow-2xl">
                                <CiCircleCheck size={50} color='white' />

                            </div>

                        </div>
                        <AlertDialogTitle className="text-2xl w-[200px] ">Account Created Successfully</AlertDialogTitle>
                        <AlertDialogDescription  >
                            <div className=' flex justify-center items-center flex-col gap-3'>
                                <div className='w-[300px] text-base translate-y-5   '>
                                    <p>Your account created successfully.</p>
                                    <p>Listen your favourite music</p>
                                </div>

                            </div>
         
                        </AlertDialogDescription>
                        <div>

                        </div>

                        <AlertDialogAction className="gap-y-5  py-10 w-full mt-5 flex flex-col  ">

                            <div className='w-full border-none bg-chairMovie-chairSelected h-20 flex justify-center items-center rounded-lg hover:scale-105'>
                                <Link className='w-full text-white hover:text-white ' to={'/home'}>
                                    <button type="submit" className="   text-xl">Go to Home</button>
                                </Link>
                            </div>
                        </AlertDialogAction>
                    </AlertDialogHeader>


                </AlertDialogContent>
            </AlertDialog>
        </div>
    );
}

export default memo(Susses);