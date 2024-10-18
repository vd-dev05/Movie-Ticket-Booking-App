import React, { useState, useRef } from 'react';
import { useSwipeable } from 'react-swipeable';
import { useTheme } from '../../Theme';
import { truncateText } from '../GetApi/GetApi'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Link } from 'react-router-dom';
import { useThemeClasses } from '../../Theme/themeStyles';

const MovieDe = ({ data }) => {
    const {textClasses} = useThemeClasses()
    // console.log(textClasses);
    
    return (
        <div  >
            <Swiper
                spaceBetween={10}
                slidesPerView={3}
                style={{cursor:'default'}}
            >
                <div className='flex overflow-hidden '>
                    {data && data.map((item) => {
                        // console.log(item);

                        return (
                            <SwiperSlide key={item.id}  >
                                <div className="flex-shrink-0  cursor-default  mt-5 ">
                                    <Link to="/itemlove" state={{data:item}} className={`${textClasses} hover:${textClasses}  ` }>
                                    
                                    <div className="saturate-150">
                                        <img
                                            src={item.poster}
                                            alt={item.title}
                                            loading="lazy"
                                            className="rounded-2xl h-[300px] w-[190px]  object-cover "
                                        />
                                    </div>
                                    <div className={`mt-2`}>
                                        <h2 className="font-[700]">{truncateText(item.title, 15)}</h2>
                                        <p className=" text-xs">{(item.theFirm)}</p>
                                    </div>
                                    </Link>

                                </div>
                            </SwiperSlide>
                        )
                    })}
                </div>


            </Swiper>
        </div>  
    );
}

export default MovieDe;