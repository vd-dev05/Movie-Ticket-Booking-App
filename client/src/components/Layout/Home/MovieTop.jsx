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
import { get, ref, set } from "firebase/database";
import { database } from "@/components/firebase/firebase";
import { PostData } from "../Product/GetApi/PostApiBook";
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
                        // localStorage.setItem('pay', JSON.stringify(data[test]))
                        // setTopMovie(data)

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
        const fetchMovies = async () => {
            // const database = getDatabase();
            const moviesRef = ref(database, 'data/movies');
            const snapshot = await get(moviesRef);

            if (snapshot.exists()) {
                const moviesData = snapshot.val();
                const sortedMovies = Object.values(moviesData).sort((a, b) => b.rate - a.rate);
                console.log(sortedMovies);
                
                const top10Movies = sortedMovies.slice(0, 10);
                // setMovies(top10Movies);
                setTopMovie(top10Movies)
            }
        };

        fetchMovies();
    }, [1])
    const handleClickLove = async (movie) => {
        // console.log(movie.id);

        try {
            const loveRef = ref(database, 'users/loveMovie/');
            const snapshot = await get(loveRef);
            let currentArray = snapshot.exists() ? snapshot.val() : [];
            // console.log(snapshot.val()); 


            if (currentArray.some(item => item.id === movie.id)) {
                toast.warning("Movie already in the love list.");
                return;
            }

            currentArray.push(movie);


            await set(loveRef, currentArray);
            toast.success("Add Successful!");
        } catch (error) {
            console.error('Error adding to love list:', error);
            toast.error("Failed to add to love list.");
        }
    };

    const handlePay = async (data) => {
        localStorage.setItem('pay',data.id)
        const userRefData = ref(database, '/users/dataTicket/' + 'book');
        const dataBook = await get(userRefData)

        let arrBook = dataBook.exists() ? dataBook.val() : [];

        if (arrBook.some(item => item.id === data.id)) {
            console.log("fasle");
        } else {
            const postData = PostData(data);
            arrBook.push(postData)
            await set(userRefData, arrBook)
        }

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
                                    <Link
                                        state={data.id}
                                        to='/boking'
                                        className="text-white hover:text-white " onClick={() => handlePay(data)}>
                                        <div className="cursor-pointer hover:scale-110 motion-reduce:transform-none flex rounded-lg bg-btn-gradient  px-2 py-5 text-nowrap w-full items-center justify-center gap-4">
                                            <span><BarcodeOutlined /></span>
                                            <p>Book Tickets</p>
                                        </div>
                                    </Link>

                                    <div
                                        onClick={() => handleClickLove(data)}
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
                            {topMovie.length > 0 ? topMovie.map((item,idx) => {
                                // console.log(item);

                                return (
                                    <SwiperSlide key={idx}>
                                        <div className=" translate-x-10 w-full px-12">
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
                                                <h2 className={`font-bold -z-10 text-[140px] whitespace-normal ${themeCtx.theme == 'dark' || themeCtx.theme == 'travel' ? ' text-shadow-light text-dark-bg' : 'text-shadow-dark text-light-bg'} absolute -bottom-[53px] -translate-x-[65%]  drop-shadow-2xl`}>{idx + 1}</h2>

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
                        {topMovie.length > 0 ? topMovie.map((item,idx) => {
                            // console.log(item);

                            return (
                                <SwiperSlide key={idx}>
                                        <div className=" translate-x-10 w-full px-12">
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
                                                <h2 className={`font-bold -z-10 text-[140px] whitespace-normal ${themeCtx.theme == 'dark' || themeCtx.theme == 'travel' ? ' text-shadow-light text-dark-bg' : 'text-shadow-dark text-light-bg'} absolute -bottom-[53px] -translate-x-[70%]  drop-shadow-2xl`}>{idx + 1}</h2>

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
