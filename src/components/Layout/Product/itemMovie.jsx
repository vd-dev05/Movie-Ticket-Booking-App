// import { useEffect } from "react";
// import axios from "axios";
import React from 'react';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { AiOutlineVideoCamera } from "react-icons/ai";
import { IoMdTime } from "react-icons/io";
import { CiStar } from "react-icons/ci";
import { Button } from '@/components/ui/button';
const ItemMovie = () => {
    const location = useLocation();
    const { item } = location.state || {};

    // console.log(item);
    return (
        <div>
            <div className="iphone-12-pro-max:flex flex flex-col h-[100vh] iphone-12:w-[390px] font-movie px-5  ">
                <div>
                    <div className="translate-y-9">
                        <Link to="/lmovie">
                            <box-icon name='chevron-left' size={"40px"}> </box-icon>
                        </Link>

                    </div>
                    <h1 className='text-center font-logo'>Movie Details</h1>
                </div>

                <div className='flex mt-10'>
                    <div >
                        <img src={item.poster} alt="" className='rounded-2xl  h-[300px] w-[250px]  bg-cover ' />
                    </div>

                    <div className='flex flex-col justify-between px-5 text-center'>

                        <div className='flex flex-col items-center'>
                            <AiOutlineVideoCamera className='text-primary-textMovie' size={35} />
                            <span className='text-gray-400'>Type</span>
                            <p className='font-logo'>{item.content}</p>
                        </div>

                        <div className='flex flex-col items-center'>
                            <div><IoMdTime className='text-primary-textMovie' size={35} /></div>
                            <span className='text-gray-400'>Duration</span>
                            <p className='font-logo'>{item.time}</p>
                        </div>

                        <div className='flex flex-col items-center'>
                            <div><CiStar className='text-primary-textMovie' size={35} /></div>
                            <span className='text-gray-400'>Rating</span>
                            <p className='font-logo'>{item.rate}</p>
                        </div>
                    </div>

                </div>
                <div className='my-5'>
                    <h2 className='font-w900'>{item.Title}</h2>
                    <p className='text-gray-400 mt-2'>{item.Type}</p>
                </div>
                <div>
                    <h2 className='font-w900'>Descriptions</h2>
                    <p>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloribus dolorum eos error consectetur repellendus! Aspernatur numquam non reiciendis sit nesciunt consequatur, perferendis a ratione dolor, earum quia nobis aliquid. Blanditiis.</p>
                </div>
                <div className=''>
                    <Link className='text-white' to="/boking">
                        <Button className="bg-chairMovie-chairSelected  h-16 mt-10 text-xl w-full">Select Seat</Button>
                        </Link>

                </div>

            </div>


        </div>
    );
}

export default ItemMovie;