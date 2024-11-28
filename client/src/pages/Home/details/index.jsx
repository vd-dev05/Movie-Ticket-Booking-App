import React, { useState, useRef, useEffect } from 'react';
// import { useSwipeable } from 'react-swipeable';
// import { useTheme } from '../../../../context/Theme';
// import { truncateText } from '../../../../hooks/GetApi/GetApi'
// import { Swiper, SwiperSlide } from 'swiper/react';
import { Link, useLocation } from 'react-router-dom';
import { useThemeClasses } from '@/context/Theme/themeStyles';
import UserHistory from '@/services/users/history';
import { AiOutlineVideoCamera } from 'react-icons/ai';
import { IoMdTime } from 'react-icons/io';
import { CiStar } from 'react-icons/ci';
import { Button } from '@/components/ui/button';
import { useTheme } from '@/context/Theme';
import { convertMinutesToHhMm } from '@/hooks/GetApi/GetApi';
import UserController from '@/services/users/User.controller';
import { HeartOutlined } from '@ant-design/icons';
import { FaHeart, FaRegHeart } from 'react-icons/fa6';
import { LoadingApp } from '@/layout/Loading';
import { showSuccessToast } from '@/lib/toastUtils';
import ReactPlayer from 'react-player'
const MovieDetails = () => {
    const { textClasses, backGround, themeBackGround, btnSubmit, buttonCLick } = useThemeClasses()
    const { color } = useTheme()
    const location = useLocation()
    // console.log(textClasses);



    const { data } = location.state || {};

    const [dataMovie, setDataMovie] = useState(data)
    const [isValid, setIsValid] = useState(false)
    const [IsTrue, setIsTrue] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const videoRef = useRef(null); // Sử dụng ref để điều khiển video
    const [isPlaying, setIsPlaying] = useState(false); // Trạng thái để kiểm tra video có đang phát không
    const [showBanner, setShowBanner] = useState(true); // Trạng thái để hiển thị banner

    const handlePlayButtonClick = () => {
        if (videoRef.current.paused) {
            videoRef.current.play();
            setIsPlaying(true);
            setShowBanner(false);
        } else {
            videoRef.current.pause();
            setIsPlaying(false);
        }
    };

    const handleVideoClick = () => {
        // Nếu video đang phát, tạm dừng video khi click vào
        if (videoRef.current.paused) {
            videoRef.current.play();
            setIsPlaying(true);
        } else {
            videoRef.current.pause();
            setIsPlaying(false);
        }
    };
    useEffect(() => {
        const fetchData = async () => {
            // const reponse = await UserHistory.lastMovie(data._id)
            // if (reponse) {
            //     setIsLoading(true)
            // }
            try {
                if (localStorage.getItem('access_token')) {
                    await UserHistory.lastMovie(location.pathname.split('/')[2] || data._id)
                    // console.log( data._id);
                    // console.log(location.pathname.split('/')[2]);


                    const response = await UserHistory.getLoveMovie()
                    if (response.length === 0) {
                        setIsTrue(false)
                        setIsLoading(true)
                    } else {
                        const check = response.findIndex((item) => item._id.toString() === location.pathname.split('/')[2])

                        if (check === -1) {
                            setIsTrue(false)
                            setIsLoading(true)
                        } else {
                            setIsTrue(true)
                            setIsLoading(true)
                        }
                    }


                } else {
                    alert("Please Login !")
                }

                if (location) {
                    const reponse = await UserController.getMovieId(location.pathname.split('/')[2] || data._id)
                    if (reponse === undefined) {
                        window.location.href = '/home'
                    }

                    setDataMovie(reponse.data)
                    setIsValid(true)
                }
            } catch (error) {
                console.log(error);

            }



        }
        fetchData()
    }, [location])

    const handleClickLove = () => {

    }
    const handleAddLove = async () => {
        if (localStorage.getItem('access_token')) {
            const reponse = await UserHistory.loveMovie('like', location.pathname.split('/')[2] || data._id)
            showSuccessToast(reponse.data.message)
            setIsTrue(isValid)
        } else {
            alert("Please Login !")
        }
        // setIsTrue(!isValid)
    };

    const handleRemoveLove = async () => {
        if (localStorage.getItem('access_token')) {
            const reponse = await UserHistory.loveMovie('unlike', location.pathname.split('/')[2] || data._id)
            showSuccessToast(reponse.data.message)
            setIsTrue(!isValid)
        } else {
            alert("Please Login !")
        }


    };
    if (!isLoading) {
        return <p>Loading ...</p>
    }


    return (

        <div></div>
        // <div className='w-full bg-black'>Hello </div>
        // <div>

        //     <div className='relative w-full h-[500px] '>
        //         {/* Banner (Ảnh nền) */}


        //         {showBanner && (

        //             <div

        //                 style={{
        //                     position: 'absolute',
        //                     top: '0',
        //                     left: '0',
        //                     // width: '100%',
        //                     // height: '100%',
        //                     backgroundImage: `url(${dataMovie.poster})`, // URL banner
        //                     backgroundSize: 'cover',
        //                     backgroundPosition: 'center',

        //                     display: 'flex',
        //                     alignItems: 'center',
        //                     justifyContent: 'center',
        //                     color: 'white',
        //                     fontSize: '36px',
        //                     fontWeight: 'bold',
        //                     textShadow: '2px 2px 4px rgba(0, 0, 0, 0.7)', // Tạo bóng cho chữ
        //                 }}
        //             >

        //                 {/* <h2>Video Trailer</h2> */}
        //                 <button
        //                     className='z-20'
        //                     onClick={handlePlayButtonClick}
        //                     style={{
        //                         marginTop: '20px',
        //                         padding: '10px 20px',
        //                         fontSize: '18px',
        //                         cursor: 'pointer',
        //                         backgroundColor: 'red',
        //                         color: 'white',
        //                         border: 'none',
        //                         borderRadius: '5px',
        //                     }}
        //                 >
        //                     {isPlaying ? 'Pause Trailer' : 'Play Trailer'}
        //                 </button>

        //             </div>

        //         )}

        //         <div className=' absolute top-10 left-5 items-center w-full z-50   '>
        //             <div className="backdrop-blur-sm  w-fit rounded-sm flex justify-center items-center p-2 ">
        //                 <Link to="/history" >
        //                     <box-icon name='chevron-left' size={"40px"} color={'red'}> </box-icon>
        //                 </Link>

        //             </div>

        //             {/* <h1 className='text-center font-logo backdrop-blur-sm text-black w-fit translate-x-[] rounded-sm  p-2'>Movie Details</h1> */}
        //         </div>
        //         <video

        //             className='object-cover w-[500px] h-full z-20 '
        //             ref={videoRef}

        //             onClick={handleVideoClick}
        //             style={{ zIndex: 0 }} // Đảm bảo video nằm dưới banner khi không phát
        //         >
        //             <source src="https://res.cloudinary.com/dlpxfxpdn/video/upload/v1732811181/idydihhtp0yoebaaohna.mp4" type="video/mp4" />
        //             Your browser does not support the video tag.
        //         </video>
        //         {/* <div className="absolute h-full w-full inset-0  bg-gradient-to-t  from-[#192026]  to-transparent opacity-65 "></div>
        //         <div className="absolute bottom-0 h-full text-sm  text-white  shadow-md w-[75%]   ">
        //             <div className="absolute -bottom-10 left-10 w-[586px] h-[161px] flex flex-col gap-5">
        //                 <h1 className='font-w900 text-4xl'>{dataMovie.title}</h1>
        //                 <div className='flex justify-between px-2'>
        //                     <div>
        //                     <p className='text-xl'>Rating : {dataMovie.imdb ? dataMovie.imdb.rating :''}/10</p>
        //                     <p className='text-xs'> Votes: {dataMovie.imdb ? dataMovie.imdb.votes : ''}</p>
        //                     </div>
        //                     <p className='text-xl'>Price : $6.68</p>
        //                 </div>

        //             </div>
        //         </div> */}
        //     </div>

        //     {/* <div>
        //         <div className="relative ">
              
        //         </div>

        //     </div>
        //     <div>hello</div> */}




        // </div>
    );
}
export default MovieDetails;