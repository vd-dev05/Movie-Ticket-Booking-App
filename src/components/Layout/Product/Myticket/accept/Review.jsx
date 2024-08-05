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
const Review = ({ data, text }) => {

    // const labels = {
    //     0.5: 'Useless',
    //     1: 'Useless+',
    //     1.5: 'Poor',
    //     2: 'Poor+',
    //     2.5: 'Ok',
    //     3: 'Ok+',
    //     3.5: 'Good',
    //     4: 'Good+',
    //     4.5: 'Excellent',
    //     5: 'Excellent+',
    //   };

    //   function getLabelText(value) {
    //     return `${value} Star${value !== 1 ? 's' : ''}, ${labels[value]}`;
    //   }  
    //   const [value, setValue] = React.useState(2);
    //   const [hover, setHover] = React.useState(-1);
    const style = { color: " #FFD43B" }
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
                            <AlertDialogTitle>Leave a Review</AlertDialogTitle>
                            <AlertDialogDescription>
                                <p className="text-gray-500 mb-5 "> Phlase share your valuable review</p>
                            </AlertDialogDescription>
                        </AlertDialogHeader>
                        <div className="drop-shadow-2xl">
                            <div className="flex bg-gray-50 p-2 rounded-lg  ">
                                <img src={data.poster} alt="" className="w-[120px] h-[100px] rounded-lg object-cover " />
                                <div>
                                    <div className="pl-5 flex flex-col h-[100px] justify-evenly  text-left ">
                                        <h2 className="font-movie font-bold ">{test}</h2>
                                        <p className="text-gray-500 text-[11px]  text-nowrap">{data.theFirm}</p>
                                        <p className="text-[11px] ">Language: {data.language}</p>
                                    </div>
                                </div>
                                <div className="  h-8 w-14 flex justify-center items-center mt-12 rounded-md">
                                    <Link className="text-gray-500">
                                        <Button

                                        > Paid</Button>
                                    </Link>

                                </div>
                            </div>
                            <div className="text-center  ">
                                <div className="my-5">
                                    <Typography component="legend" >Please give your rating with us</Typography>
                                </div>

                                <div className=" flex flex-row justify-around mb-5">
                                    {[1, 2, 3, 4, 5].map((item, index) => (
                                        <div key={item} className="">
                                            <i
                                                class={`fa-star fa-xl ${index < rating ? 'fa-solid' : 'fa-regular'}`}
                                                style={{ cursor: 'pointer', color: index < rating ? 'gold' : 'black ' }}
                                                onClick={() => handleClick(index + 1)}
                                            ></i>
                                        </div>

                                    ))}
                                </div>
                                <div className="">

                                </div>

                                {/* <Rating name="size-large" defaultValue={0} size="large" /> */}
                            </div>
                        </div>
                        <textarea

                            className="p-5    w-full outline-none border-gray-400 border-[1px] h-[210px]   opacity: 1 bg-none"
                            placeholder="Add a Comment"
                        />
                        <AlertDialogFooter className=" flex gap-2 p-5 ">
                            <AlertDialogCancel
                                className="w-full bg-[#fafafa] text-xl "
                            >Cancel</AlertDialogCancel>
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

export default memo(Review);
