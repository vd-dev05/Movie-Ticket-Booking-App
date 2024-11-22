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
import { useThemeClasses } from "@/context/Theme/themeStyles";
import { CiCircleCheck } from "react-icons/ci";
import { Link } from 'react-router-dom';
import { useTheme } from '@/context/Theme';

const DoneBooking = ({ text, isOpenPay, qrCode , dataTicket }) => {
    const { buttonClasses, backGround, textClasses, themeUniver } = useThemeClasses();
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
                        <AlertDialogTitle className="text-2xl text-center ">Congratulations !</AlertDialogTitle>
                        {/* <div className=' flex justify-center items-center flex-col gap-3'>
                                <div className='w-[200px] text-sm '>
                                    <p className="text-gray-500 ">You have successfully placed order for movie ticket.</p>
                                    <p className="text-gray-500 ">Enjoy the movie !</p>
                                </div>

                            </div> */}
                        <AlertDialogDescription className='text-center text- text-gray-500 ' >
                            You have successfully placed order for movie ticket.
                        </AlertDialogDescription>
                        <AlertDialogDescription className='text-center text-sm text-gray-500' >
                            Enjoy the movie !
                        </AlertDialogDescription>


                    </AlertDialogHeader>
                    <AlertDialogAction className="h-20 bg-primary-textMovie  text-xl ">

                        <Link to={`/qrcode/${dataTicket}`} className='text-white rounded-lg w-full flex items-center justify-center  ' state={{ data: qrCode }}>
                            View E-Ticket

                        </Link>

                    </AlertDialogAction>
                    <AlertDialogAction className="border-primary-textMovie w-full border-[1px] h-20  flex justify-center items-center rounded-lg">
                            <Link className='w-full text-primary-textMovie  text-xl ' to={'/home'}>
                            Go to Home
                            </Link>
                    </AlertDialogAction>

                </AlertDialogContent>
            </AlertDialog>
        </div>
    );
};

export default memo(DoneBooking);
