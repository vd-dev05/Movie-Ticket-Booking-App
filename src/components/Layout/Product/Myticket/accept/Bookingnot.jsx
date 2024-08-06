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
import { truncateText } from "../../GetApi/GetApi";
import { Box, Typography } from "@mui/joy";


const CancelTicket = ({ data, text }) => {
    const test = useMemo(() => {

        if (data && data.title) {
            return truncateText(data.title, 15);
        }
        return '';
    }, [data]);
    const [rating, setRating] = useState(0);
    const [selectedValue, setSelectedValue] = useState('');

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

    // const handleSubmit = () => {
    //     const test = confirm("Xác nhânj đánh giá")
    //     //    console.log(test);

    //     if (test == true) alert("")
    // }
    return (
        <div >
            <div >
                <AlertDialog>
                    <AlertDialogTrigger>{text}</AlertDialogTrigger>
                    <AlertDialogContent className="bg-white " >


                        <AlertDialogHeader >
                            <AlertDialogTitle>Cancel Booking</AlertDialogTitle>
                            <AlertDialogDescription>
                                <p className="text-gray-500 mb-5"> Please select the reason for cancellation</p>
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
                                    placeholder="Tell us reason"
                                    className="h-52 border-[1px] w-full outline-none p-5"></textarea>
                                </div>
                            </div>
                        </AlertDialogHeader>

                        <AlertDialogFooter className=" flex gap-2 p-2">

                            <AlertDialogAction
                                // onClick={handleSubmit}
                                className="w-full bg-primary-textMovie text-white mt-2 text-xl "
                            >Submit</AlertDialogAction>
                        </AlertDialogFooter>

                    </AlertDialogContent>
                </AlertDialog>

            </div>

        </div>
    );
}

export default memo(CancelTicket);
