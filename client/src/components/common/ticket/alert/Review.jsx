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

const Review = ({ data, key, text, setRatingandReview, starReveiew, onSubmit, isOpen, setIsOpen }) => {
    
    const test = useMemo(() => {

        if (data && data?.movieId?.title) {
            return truncateText(data.movieId.title, 15);
        } 
        return '';
    }, [data]);


    
    const handleClick = (star) => {
 
        if (starReveiew.rating === star) {
           
            
            
            setRatingandReview(pre => ({
                ...pre,
                id: 0,
                rating: 0
            }));
        } else {        
            setRatingandReview(pre => ({
                ...pre,

                id: data._id,
                rating: star,

            }))
        }


    };

    return (
        <div >
            <div >
                <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
                    {/* <AlertDialogTrigger className="bg-chairMovie-chairSelected text-white w-full h-10 text-nowrap rounded-lg">{text}</AlertDialogTrigger> */}
                    <AlertDialogContent className="bg-white max-w-[96vw] right-3 " >


                        <AlertDialogHeader >
                            <AlertDialogTitle className="text-center">Leave a Review</AlertDialogTitle>
                            <AlertDialogDescription className="text-center">
                            Please share your valuable review
                
                            </AlertDialogDescription>
                        </AlertDialogHeader>
                        <div className="drop-shadow-2xl">
                            <div className="flex bg-gray-50 p-2 rounded-lg justify-between  ">
                                <div className="flex">

                                    <img src={data?.movieId?.poster} alt="" className="w-[120px] h-[100px] rounded-lg object-cover " />
                                    <div>
                                        <div className="pl-5 flex flex-col h-[100px] justify-evenly  text-left ">
                                            <h2 className="font-movie font-bold ">{test}</h2>
                                            <p className="text-gray-500 text-[11px]  text-nowrap">{data?.movieId?.tomatoes?.production}</p>
                                            <p className="text-[11px] ">Language: {data?.movieId?.languages}</p>
                                        </div>
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
                                                className={`fa-star fa-xl ${index < starReveiew.rating ? 'fa-solid' : 'fa-regular'}`}
                                                style={{ cursor: 'pointer', color: index < starReveiew.rating ? 'gold' : 'black ' }}
                                                onClick={() => handleClick(index + 1)}
                                            ></i>
                                        </div>

                                    ))}
                                </div>
                                <div className="">

                                </div>


                            </div>
                        </div>
                        <textarea

                            onChange={(e) => setRatingandReview(pre => ({ ...pre, review: e.target.value }))}
                            className="p-5    w-full outline-none border-gray-400 border-[1px] h-[210px]   opacity: 1 bg-none"
                            placeholder="Add a Comment"
                        />
                        <AlertDialogFooter className=" flex gap-2 p-5 ">
                            <AlertDialogCancel
                                className="w-full bg-[#fafafa] text-xl "
                            >Cancel
                            </AlertDialogCancel>
                            <AlertDialogAction
                                onClick={() => onSubmit(data?.movieId?._id)}
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
