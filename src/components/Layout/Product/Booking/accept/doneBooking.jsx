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
import { truncateText } from "../../GetApi/GetApi";
import { useThemeClasses } from "@/components/Layout/Theme/themeStyles";
import { CiCircleCheck } from "react-icons/ci";
import { Link } from 'react-router-dom';
import { useTheme } from '@/components/Layout/Theme';
const DoneBooking = ({ text }) => {
    const { buttonClasses, backGround, textClasses } = useThemeClasses();
    const themeCtx = useTheme()
    return (
        <div>
            <AlertDialog className={``}>
                <AlertDialogTrigger className={`bg-chairMovie-chairSelected   min-w-full flex items-center justify-center rounded-lg py-4 text-white  ${backGround}`}>
                    {text}
                </AlertDialogTrigger>
                <AlertDialogContent className={`${themeCtx.theme == 'dark' ? 'bg-[#130d0d]': 'bg-white'} ${textClasses} max-w-[96vw] right-3  h-max top-[25%] rounded-lg border-none`}>

                    <AlertDialogHeader >
                        <div className='flex justify-center items-center h-[300px] '>
                            <div className=" fixed w-[92px] h-[92px]  animate-move bg-[#d3f1e0] rounded-full flex items-center justify-center">

                            </div>
                            <div className="bg-[#50c57d] h-[80px] w-[80px] z-100 absolute flex justify-center items-center rounded-full drop-shadow-2xl">
                                <CiCircleCheck size={50} color='white' />

                            </div>

                        </div>
                        <AlertDialogTitle><h2 className='text-xl'>Congratulations !</h2></AlertDialogTitle>
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
                                <Link to={'/qrcode'} className='text-white'>
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
        </div>
    );
};

export default memo(DoneBooking);
