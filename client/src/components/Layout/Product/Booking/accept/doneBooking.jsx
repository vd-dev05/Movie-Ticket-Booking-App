import React, { memo } from 'react';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger
} from "@/components/ui/alert-dialog";
import { truncateText } from "../../../../../hooks/GetApi/GetApi";
import { useThemeClasses } from "@/context/Theme/themeStyles";
import { CiCircleCheck } from "react-icons/ci";
import { Link } from 'react-router-dom';
import { useTheme } from '@/context/Theme';
import { toast, ToastContainer } from 'react-toastify';
const DoneBooking = ({ text,isOpenPay,payBookData }) => {
    const { buttonClasses, backGround, textClasses ,themeUniver} = useThemeClasses();
    const themeCtx = useTheme()
//    console.log(isOpenPay);
   
    
    
  
    return (
        <div>
            <AlertDialog open={isOpenPay} >
                {/* <AlertDialogTrigger >
                    {text}
                </AlertDialogTrigger> */}
                <AlertDialogContent className={`${themeUniver} ${textClasses} max-w-[96vw] right-3  h-max top-[25%] rounded-lg border-none`}>

                    <AlertDialogHeader >
                        <div className='flex justify-center items-center h-[300px] '>
                            <div className=" fixed w-[92px] h-[92px]  animate-move bg-[#d3f1e0] rounded-full flex items-center justify-center">

                            </div>
                            <div className="bg-[#50c57d] h-[80px] w-[80px] z-100 absolute flex justify-center items-center rounded-full drop-shadow-2xl">
                                <CiCircleCheck size={50} color='white' />

                            </div>

                        </div>
                        <AlertDialogTitle className="text-xl">Congratulations !</AlertDialogTitle>
                        <AlertDialogDescription  >
                            <div className=' flex justify-center items-center flex-col gap-3'>
                                <div className='w-[200px] text-sm '>
                                    <p className="text-gray-500 ">You have successfully placed order for movie ticket.</p>
                                    <p className="text-gray-500 ">Enjoy the movie !</p>
                                </div>

                            </div>
         
                        </AlertDialogDescription>
                        <div>

                        </div>

                        <AlertDialogAction className="gap-y-5  p-2 w-full mt-5 flex flex-col  h-full">
                            <div className='w-full rounded-lg'>
                                <Link to={'/qrcode'} className='text-white' state={{data:payBookData}}>
                                    <button type="submit" className="w-full h-20 bg-primary-textMovie  text-xl">View E-Ticket</button>
                                </Link>
                            </div>

                            <div className='border-primary-textMovie w-full border-[1px] h-20 flex justify-center items-center rounded-lg'>
                                <Link className='w-full text-primary-textMovie ' to={'/home'}>
                                    <button type="submit" className="   text-xl">Go to Home</button>
                                </Link>
                            </div>
                        </AlertDialogAction>
                    </AlertDialogHeader>


                </AlertDialogContent>
            </AlertDialog>
            <ToastContainer></ToastContainer>
        </div>
    );
};

export default memo(DoneBooking);
