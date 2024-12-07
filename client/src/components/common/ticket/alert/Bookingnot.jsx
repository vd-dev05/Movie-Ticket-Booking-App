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

import { Link } from "react-router-dom";
import React, { useEffect, useCallback, memo, useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { truncateText } from "../../../../hooks/GetApi/GetApi";
import { Box, Typography } from "@mui/joy";
import updateBookingStatus from '@/hooks/GetApi/GetRemoveData'
import { toast } from "react-toastify";
import CancelServices from "@/services/users/cancel";
import { showSuccessToast } from "@/lib/toastUtils";

const CancelTicket = ({ data, text, isOpen, setIsOpen, setDataLoad, dataLoad, ticketId, movieId, seat,commentId }) => {
 
    
    const test = useMemo(() => {
        if (data && data.title) {
            return truncateText(data.title, 15);
        }
        return '';
    }, [data]);
    const [rating, setRating] = useState(0);
    const [selectedValue, setSelectedValue] = useState('');

    const handleChangeText = (event) => {
        setRating(event.target.value)
        console.log(commentId);
    }
    const handleChange = (event) => {
        setSelectedValue(event.target.value);
    };

    const options = [
        "I have a better deal",
        "Some other work, can't come",
        "I want to book another movie",
        "Location is too far from my location",
        "Another reason"
    ];

    const handleSubmit = async () => {
      
        // console.log(selectedValue);
        // console.log(rating);
        // console.log(data);

        // console.log(id);
        // const data  =  {
        //     reason: selectedValue,
        //     rating: rating,
        //     movieId: id
        // }
        try {
            const response = await CancelServices.create(selectedValue, rating, ticketId, movieId, seat, commentId)
            if (response) {
                showSuccessToast(response.data)
                setIsOpen(!isOpen)
                setDataLoad(!dataLoad)
            }

        } catch (error) {

        }



        // await updateBookingStatus (data,{paid:false})
        // setIsOpen(!isOpen)
        // setDataLoad(!dataLoad)
        // toast(' Cancel ticket successfull !', {
        //     position: "top-right",
        //     autoClose: 5000,
        //     hideProgressBar: false,
        //     closeOnClick: true,
        //     pauseOnHover: true,
        //     draggable: true,
        //     progress: undefined,
        //     theme: "light",
        //     // transition: Bounce,
        //     });
    }
    return (
        <div >
            <div className="" >
                <AlertDialog open={isOpen} onOpenChange={setIsOpen} >
                    {/* <AlertDialogTrigger>{text}</AlertDialogTrigger> */}
                    <AlertDialogContent className="bg-white max-w-[96vw] right-3   rounded-lg border-none " >


                        <AlertDialogHeader >
                            <AlertDialogTitle className="text-center">Cancel Booking</AlertDialogTitle>
                            <AlertDialogDescription className="text-gray-500 mb-5 text-center">
                                Please select the reason for cancellation
                            </AlertDialogDescription>
                            <div>
                                {options.map((option, index) => (
                                    <div key={index} className='flex p-3 '>
                                        <input
                                            type="radio"
                                            name="reason"
                                            value={option}
                                            checked={selectedValue === option}
                                            onChange={handleChange}
                                            style={{ marginRight: "20px" }}
                                        />
                                        <label>{option}</label>
                                    </div>
                                ))}
                                <div>
                                    <textarea
                                        onChange={handleChangeText}
                                        placeholder="Tell us reason"
                                        className="h-52 border-[1px] w-full outline-none p-5"></textarea>
                                </div>
                            </div>
                        </AlertDialogHeader>

                        <AlertDialogFooter className=" flex gap-2 p-2 peer ">

                            <AlertDialogAction className="  bg-chairMovie-chairSelected hover:bg-chairMovie-chairSelected  text-white focus:bg-chairMovie-chairSelected  w-full h-[60px] p-5 rounded-lg  ">Cancel</AlertDialogAction>
                            <button
                                onClick={handleSubmit}
                                className=" focus:animate-jelly bg-chairMovie-chairSelected hover:bg-chairMovie-chairSelected  text-white focus:bg-chairMovie-chairSelected  w-full h-[60px] p-5 rounded-lg  "
                            >Submit</button>
                        </AlertDialogFooter>

                    </AlertDialogContent>
                </AlertDialog>

            </div>

        </div>
    );
}

export default memo(CancelTicket);
