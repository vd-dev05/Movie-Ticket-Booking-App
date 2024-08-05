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
import { Rating } from "@mui/material";
import { CiStar } from "react-icons/ci";
import { yellow } from "@mui/material/colors";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
const CancelTicket = ({ data, text }) => {
    const test = useMemo(() => {

        if (data && data.title) {
            return truncateText(data.title, 15);
        }
        return '';
    }, [data]);
    const [rating, setRating] = useState(0);

    const handleClick = (star) => {
        if (rating === star) {
            setRating(0);
        } else {
            setRating(star);
        }
    };
    const handleSubmit = () => {
        const test = confirm("Xác nhânj đánh giá")
        //    console.log(test);

        if (test == true) alert("")
    }
    return (
        <div >
            <div >
                <AlertDialog>
                    <AlertDialogTrigger>{text}</AlertDialogTrigger>
                    <AlertDialogContent className="bg-white " >


                        <AlertDialogHeader >
                            <AlertDialogTitle>Cancel Booking</AlertDialogTitle>
                            <AlertDialogDescription>
                                <p className="text-gray-500 mb-5 "> Please select the reason for cancellation</p>
                            </AlertDialogDescription>
                        </AlertDialogHeader>
                        <div>
                            
                        </div>
                        <AlertDialogFooter className=" flex gap-2 p-5 ">
                         
                            <AlertDialogAction
                                onClick={handleSubmit}
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
