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
import { useThemeClasses } from "../../../../context/Theme/themeStyles";
import { Link } from "react-router-dom";

import { customFormatPhoneNumber } from '@/lib/phone'

import 'react-toastify/dist/ReactToastify.css';
import { memo, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {  GetTokenSend } from "@/controller/CreateUser.controller";
import { useUser } from "@/context/User";
import { showSuccessToast } from "@/lib/toastUtils";
import UserController from "@/services/users/User.controller";
import SendOtp from "./SendOtp";
const OTPVery = ({ text, phone, setTrue, True }) => {
    const [isOpen, setOpen] = useState(false)
    const { buttonClasses, backGround, textClasses, backGroundTow } = useThemeClasses();
    const {dataUser,setDataUser} = useUser()

    useEffect(() => {
      
        if (phone) {
            (
                async () => {
                    const r =  await UserController.getTokenSend(phone);
                    setDataUser(pre => ({
                        ...pre,
                        token: r?.data?.token
                    }))
                    if (r) {
                        showSuccessToast("Send Otp SuccessFull")
                    }
                }
            )()
            // const r =  await GetOtp(phone);
            // console.log(r);
            
        }
    }, [phone]);
    // console.log(dataUser);
    
    return (
        <div>
            <AlertDialog open={True} onOpenChange={setTrue} >
                <AlertDialogContent className={`${backGroundTow} ${textClasses} border-none top-[30%]  h-[350px] rounded-2xl iphone-12:w-full   max-w-[90%]  sm:max-w-[80%] iphone-12:left-5 min-[400px]:left-7  lg:max-w-[60%] `}>

                    <AlertDialogHeader>
                        <AlertDialogTitle className='my-5'>Verify Your Phone Address</AlertDialogTitle>
                        <AlertDialogDescription className='flex flex-col justify-center items-center text-2xl font-bold'>
                        {phone ? customFormatPhoneNumber(phone) : null}
                            {/* <span className="text-2xl font-bold">{phone ? customFormatPhoneNumber(phone) : null}</span>
                            <div className="my-5 w-[250px] ">
                                <p>We will send the authentication code to this mobile number you entered.</p>
                                <p>Do you want continue ?</p>
                            </div> */}
                        </AlertDialogDescription>
                        <div className="flex flex-col gap-5 py-5">
                        <AlertDialogDescription >We will send the authentication code to this mobile number you entered.</AlertDialogDescription>
                        <AlertDialogDescription >Do you want continue ?</AlertDialogDescription>

                        </div>
                        <div className="flex gap-2  w-full my-5  ">

                            <AlertDialogAction className=" hover:scale-105 w-full h-20 border-primary-textMovie text-primary-textMovie text-2xl" >
                                Cancel
                            </AlertDialogAction>
                            <Button
                            
                                onClick={() => setOpen(true)}
                                className="w-full h-full border-2 border-blac p-[22px] bg-primary-textMovie text-2xl text-white hover:bg-primary-textMovie hover:scale-105"
                            >Next</Button>
                            {/* <AlertDialogAction className="w-full h-20 border-primary-textMovie text-primary-textMovie text-2xl" >
                            <SendOTp text={'Next'} phone={phone}></SendOTp>
                            </AlertDialogAction> */}
                            {/* <div className="w-full text ">

                                 
                            </div> */}
                            <SendOtp
                                phoneN={phone}
                                setOpen={setOpen}
                                isOpen={isOpen}
                                titlePass={'Account Created Successfully'}
                                paraPass1={'Your account created successfully.'}
                                paraPass2={'Find your favorite movie'}
                            ></SendOtp>
                        </div>
                    </AlertDialogHeader>


                </AlertDialogContent>
            </AlertDialog>
        </div>
    );
}

export default memo(OTPVery);