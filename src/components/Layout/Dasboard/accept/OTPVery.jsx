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
import { useThemeClasses } from "../../Theme/themeStyles";
import { Link } from "react-router-dom";
import SendOTp from "./SendOtp";
import { memo } from "react";
const OTPVery = ({ text, phone }) => {
    const { buttonClasses, backGround, textClasses, backGroundTow } = useThemeClasses();
    return (
        <div>
            <AlertDialog >
                <AlertDialogTrigger className="w-full bg-primary-textMovie text-white text-xl py-3">{text}</AlertDialogTrigger>
                <AlertDialogContent className={`${backGroundTow} ${textClasses} border-none top-[30%]  h-[350px] rounded-2xl iphone-12:w-full   max-w-[90%]  sm:max-w-[80%] iphone-12:left-5 min-[400px]:left-7  lg:max-w-[60%] `}>

                    <AlertDialogHeader>
                        <AlertDialogTitle className='my-5'>Verify Your Email Address</AlertDialogTitle>
                        <AlertDialogDescription className='flex flex-col justify-center items-center'>
                            <span className="text-2xl font-bold">{phone}</span>
                            <div className="my-5 w-[250px] ">
                                <p>We will send the authentication code to this mobile number you entered.</p>
                                <p>Do you want continue ?</p>
                            </div>
                        </AlertDialogDescription>
                        <div className="flex gap-2  w-full my-5  ">

                            <AlertDialogAction className="w-full h-20 border-primary-textMovie text-primary-textMovie text-2xl" >
                                Cancel
                            </AlertDialogAction>
                            <div className="w-full text ">

                                <SendOTp text={'Next'} phone={phone}></SendOTp>
                            </div>
                        </div>
                    </AlertDialogHeader>


                </AlertDialogContent>
            </AlertDialog>
        </div>
    );
}

export default memo(OTPVery);