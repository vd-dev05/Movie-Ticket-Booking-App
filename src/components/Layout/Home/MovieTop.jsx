import { useEffect, useRef, useState } from "react"
import { dataMovie } from "../Product/GetApi/GetApi";
import { useThemeClasses } from "../Theme/themeStyles";
import { BarcodeOutlined, HeartOutlined } from "@ant-design/icons";
import { useSwipeable } from 'react-swipeable';

import { truncateText } from '@/components/Layout/Product/GetApi/GetApi'
import { useTheme } from "../Theme";
import { Swiper, SwiperSlide } from "swiper/react";
import { Link } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
const MovieTop = () => {
    const [data, setData] = useState([])
    const [topMovie, setTopMovie] = useState([])
    const { themeUniver } = useThemeClasses()
    const themeCtx = useTheme()
    // console.log(themeCtx.theme);


    useEffect(() => {
        (
            async () => {
                try {
                    const data = await dataMovie('data/movies');
                    if (data) {
                        const test = Math.ceil(data.length / Math.ceil(Math.random() * data.length))
                        setData(data[test])
                        localStorage.setItem('pay',JSON.stringify(data[test]))
                        setTopMovie(data)
    
                        // console.log(data[0]);
                        // console.log(test);
    
                        // setisLoading(true)
                    }
    
                } catch (err) {
                    console.error(err);
                } finally {
                    // setisLoading(false);
                }
            }
        )()
    }, [1])
    const handleClickLove = () => {
        toast.success("Add SuccessFull !")
        console.log("hello");
        
    }
    return (
        <div className={`iphone-12-pro-max:flex  flex flex-col w-full font-movie px-5    `}>
            <div className="mt-5">
                {/* Banner phim */}
                <div>
                    {data ? (
                        <div className=" w-full  flex flex-col items-center text-white relative h-[700px] ">
                            <div className="group h-full w-full  ">

                                <div className="w-[60px] h-[100px] font-bold absolute rounded-tr-xl drop-shadow-2xl p-6 rounded-bl-3xl flex justify-center items-center right-0 z-10 text-white bg-primary-textMovie">
                                    Top 10
                                </div>
                                <div className=" p-10 mt-20 absolute top-0 left-0 w-full h-full group-hover:block duration-300 hidden ">
                                    <div className="bg-black z-20 absolute w-full h-[400px] opacity-40 top-0 left-0"></div>
                                    <p className="absolute z-20">{data.description}</p>
                                </div>
                            </div>

                            <img src={data.poster} className="w-full rounded-2xl opacity-90 bg-gradient-to-b object-cover  h-[700px] absolute bottom-0 " alt="" />
                            {/* <div className="absolute bottom-0 bg-black h-20 "></div> */}
                            {/* <div className='text-white text-4xl text-center'>hello</div> */}
                            <div className='bg-black w-full h-40 absolute bottom-10 opacity-25 rounded-lg z-0 blur-sm '></div>
                            <div className=" text-xl font-bold  absolute   bottom-0 flex flex-col items-center justify-center p-10 drop-shadow-2xl">

                                <p className="flex items-center z-10">{data.type && (data.type).join(" 〄 ")}</p>
                                <div className="flex gap-3  z-10 mt-2 ">
                                    <Link to='/boking' className="text-white hover:text-white " >
                                    <div className="cursor-pointer hover:scale-110 motion-reduce:transform-none flex rounded-lg bg-btn-gradient  px-2 py-5 text-nowrap w-full items-center justify-center gap-4">
                                        <span><BarcodeOutlined /></span>
                                        <p>Book Tickets</p>
                                    </div>
                                    </Link>
                                   
                                    <div
                                    onClick={() => handleClickLove()}
                                    className="cursor-pointer  hover:scale-110 motion-reduce:transform-none flex w-full rounded-lg  bg-gray-800 px-2 py-5 text-nowrap items-center justify-center gap-4">
                                        <span><HeartOutlined /></span>
                                        <p className='text-white'>Add list Love</p>
                                    </div>
                                </div>
                            </div>

                        </div>
                    ) : null}
                </div>
                <div>
                    <h1 className="text-2xl my-5  font-bold">Hoollywood Movie Top 10 series </h1>
                    <div>
                        <Swiper
                            // spaceBetween={10}
                            slidesPerView={2}
                            style={{ cursor: 'default', }}
                        >
                            {topMovie.length > 0 ? topMovie.map((item) => {
                                // console.log(item);

                                return (
                                    <SwiperSlide key={item.id}>
                                        <div className=" translate-x-10 w-full px-8">
                                            <Link to='/itemLove' state={{ data: item }} >
                                                <div className="saturate-150 z-10 " >
                                                    <img
                                                        src={item.poster}
                                                        alt={item.title}
                                                        loading="lazy"
                                                        className="rounded-e-2xl rounded-t-lg h-[300px] w-[290px]  object-cover  cursor-pointer "
                                                    />
                                                </div>
                                            </Link>
                                            <div className={`mt-2 `}>
                                                <h2 className={`font-bold -z-10 text-[150px] whitespace-normal ${themeCtx.theme == 'dark' || themeCtx.theme == 'travel' ? ' text-shadow-light text-dark-bg' : 'text-shadow-dark text-light-bg'} absolute -bottom-[53px] -translate-x-[60%]  drop-shadow-2xl`}>{item.id + 1}</h2>

                                            </div>
                                        </div>
                                    </SwiperSlide>
                                )
                            }) : <p>Not found</p>}
                        </Swiper>
                    </div>

                </div>
            </div>
            <div>

                <h1 className="text-2xl my-5  font-bold"> Family  Best Movie Top 10 series</h1>
                <div>
                    <Swiper
                        // spaceBetween={10}
                        slidesPerView={2}
                        style={{ cursor: 'default', }}
                    >
                        {topMovie.length > 0 ? topMovie.map((item) => {
                            // console.log(item);

                            return (
                                <SwiperSlide key={item.id}>
                                    <div className=" translate-x-10 w-full px-8 " >
                                        <Link to='/itemLove' state={{ data: item }} >
                                            <div className="saturate-150 z-10 " >
                                                <img
                                                    src={item.poster}
                                                    alt={item.title}
                                                    loading="lazy"
                                                    className="rounded-e-2xl rounded-t-lg h-[300px] w-[290px]  object-cover  cursor-pointer "
                                                />
                                            </div>
                                        </Link>
                                        <div className={`mt-2 `}>
                                            <h2 className={`font-bold -z-10 text-[150px] ${themeCtx.theme == 'dark' || themeCtx.theme == 'travel' ? ' text-shadow-light text-dark-bg' : 'text-shadow-dark text-light-bg'} absolute -bottom-[53px] -translate-x-[60%]  drop-shadow-2xl`}>{item.id + 1}</h2>

                                        </div>
                                    </div>
                                </SwiperSlide>
                            )
                        }) : <p>Not found</p>}
                    </Swiper>
                </div>
            </div>
            <ToastContainer></ToastContainer>
        </div>
    );
}

export default MovieTop;
