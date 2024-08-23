// import { useEffect } from "react";
// import axios from "axios";
import React from 'react';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { AiOutlineVideoCamera } from "react-icons/ai";
import { IoMdTime } from "react-icons/io";
import { CiStar } from "react-icons/ci";
import { Button } from '@/components/ui/button';
import {convertMinutesToHhMm} from'../GetApi/GetApi'
import { useTheme } from '../../Theme';
import { useItem } from '../GetApi/ItemContext';
import { useThemeClasses } from '../../Theme/themeStyles';
const ItemMovie = () => {
    const {color}= useTheme()
    const {backGround,textClasses} = useThemeClasses()
    // console.log(themeCtx.theme);
    
    const {item} = useItem()
    // console.log(item);
    
    // const location = useLocation();
    // const { item ,test } = location.state || {};
    // console.log(test);
    
    
    // console.log(item);
    return (
        
        <div>
            <div className={`iphone-12-pro-max:flex flex flex-col  h-[100vh] min-w-full font-movie px-5 ${backGround} ${textClasses}  `}>
                <div> 
                    <div className="translate-y-9">
                        <Link to="/lmovie">
                            <box-icon name='chevron-left' size={"40px"} color={color}> </box-icon>
                        </Link>

                    </div>
                    <h1 className='text-center font-logo'>Movie Details</h1>
                   
                </div>
 
                <div className='flex mt-10 w-full'>
                    <div >
                        <img src={item.poster} alt="helo" className='rounded-2xl  h-[300px] w-screen  object-cover bg-cover ' />
                    </div>

                    <div className='flex flex-col justify-between pl-5 text-center'>

                        <div className='flex flex-col items-center'>
                            <AiOutlineVideoCamera className='text-primary-textMovie' size={35} />
                            <span className='text-gray-400'>Type</span>
                            <p className='font-logo'>{item.type[0]}</p>
                          
                        </div>

                        <div className='flex flex-col items-center'>
                            <div><IoMdTime className='text-primary-textMovie' size={35} /></div>
                            <span className='text-gray-400'>Duration</span>
                            <p className='font-logo'>{convertMinutesToHhMm(item.runtime)}</p>
                        </div>

                        <div className='flex flex-col items-center'>
                            <div><CiStar className='text-primary-textMovie' size={35} /></div>
                            <span className='text-gray-400'>Rating</span>
                            <p className='font-logo'>{Number(item.rate).toFixed(1)}/10</p>
                        </div>
                    </div>

                </div>
                <div className='my-5'>
                    <h2 className='font-w900'>{item.title}</h2>
                    <p className='text-gray-400 mt-2'>{item.theFirm}</p>
                </div>
                <div>
                    <h2 className='font-w900'>Descriptions</h2>
                    <p>{item.description}</p>

                </div>
                <div className=''>
                    <Link className='text-white' to="/boking" state={item}>
                        <Button className="bg-chairMovie-chairSelected  h-16 mt-10 text-xl w-full">Select Seat</Button>
                        </Link>

                </div>

            </div>


        </div>
    );
}

export default ItemMovie;