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

import { useThemeClasses } from "@/context/Theme/themeStyles";
import { Link } from "react-router-dom";
import React, { memo, useContext, useEffect, useState } from "react";
import { useTheme } from "../../../../context/Theme";
import { CiCircleCheck } from "react-icons/ci";
const Susses = ({ text,isTrue,paraPass1,paraPass2, titlePass}) => {
    const { buttonClasses, backGround, textClasses, backGroundTow ,themeSussesOTp,themeUniver} = useThemeClasses();
    const themeCtx = useTheme()
    return (
        <div>
              <AlertDialog className={``} open={isTrue}>
                <AlertDialogTrigger >
                    {text}
                </AlertDialogTrigger>
                <AlertDialogContent className={`${themeUniver} ${textClasses} max-w-[96vw] right-3 h-max  top-[25%] rounded-lg border-none outline-none text-center`}>

                    <AlertDialogHeader className="flex items-center ">
                        <div className='flex justify-center items-center h-[200px] '>
                            <div className={` fixed w-[92px] h-[92px] ${themeSussesOTp} animate-move bg-[#d3f1e0] rounded-full flex items-center justify-center`}>

                            </div>
                            <div className="bg-chairMovie-chairSelected h-[80px] w-[80px] z-100 absolute flex justify-center items-center rounded-full drop-shadow-2xl">
                                <CiCircleCheck size={50} color='white' />

                            </div>
                            {/* Account Created Successfully' */}
                        </div>
                        <AlertDialogTitle className="text-2xl w-[300px] text-center "> { titlePass ?  titlePass : 'not found'}</AlertDialogTitle>
                        <AlertDialogDescription  className="text-center" >
                            <div className=' flex justify-center items-center flex-col gap-3 pb-10'>
                                <div className='w-[300px] text-base translate-y-5   '>
                                    <p>{paraPass1 ? paraPass1 : 'not found'}</p>
                                    <p>{paraPass2 ? paraPass2 : 'not found'  }</p>
                                 
                                </div>

                            </div>
         
                        </AlertDialogDescription>
                        <div>

                        </div>

                        <AlertDialogAction className="gap-y-5  py-10 w-full mt-5 flex flex-col  ">

                            <div className='w-full border-none bg-chairMovie-chairSelected h-20 flex justify-center items-center rounded-lg hover:scale-105'>
                                <Link className='w-full text-white hover:text-white text-xl p-6 ' to={'/home'}>
                                    Go to Home
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