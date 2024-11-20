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
const MovieDetails = () => {
    const { textClasses, backGround, themeBackGround, btnSubmit,buttonCLick } = useThemeClasses()
    const { color } = useTheme()
    const location = useLocation()
    // console.log(textClasses);
    const { data } = location.state || {};
    const [dataMovie, setDataMovie] = useState(data)
    const [isValid, setIsValid] = useState(false)
    const [IsTrue, setIsTrue] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    // console.log(location);
    useEffect(() => {
        const fetchData = async () => {
            // const reponse = await UserHistory.lastMovie(data._id)
            // if (reponse) {
            //     setIsLoading(true)
            // }
             if (localStorage.getItem('access_token')) {
               await UserHistory.lastMovie(location.pathname.split('/')[2] || data._id)               
               const response = await UserHistory.getLoveMovie(location.pathname.split('/')[2] || data._id)
               const arr = response.data.map((data) =>  data._id )
             
               
                // console.log(arr.indexOf(location.pathname.split('/')[2] ) );
                
                if (arr.indexOf(location.pathname.split('/')[2]) === -1) { 
                    setIsTrue(false)
                    setIsLoading(true)
                } else {
                    setIsTrue(true)
                    setIsLoading(true)
                }
               
            } else {
                alert("Please Login !")
            }

            if (location) {
                const reponse = await UserController.getMovieId(location.pathname.split('/')[2] || data._id)
                setDataMovie(reponse.data)
                setIsValid(true)
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
            const reponse = await UserHistory.loveMovie('unlike',location.pathname.split('/')[2] || data._id)
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
        <div>
            {dataMovie && isValid  ? <div className={` iphone-12-pro-max:flex flex flex-col min-h-screen  font-movie px-5 ${themeBackGround} ${textClasses} `}>
                <div>
                    <div className="translate-y-9">
                        <Link to="/lmovie">
                            <box-icon name='chevron-left' size={"40px"} color={color} > </box-icon>
                        </Link>

                    </div>
                    <h1 className='text-center font-logo'>Movie Details</h1>
                </div>

                <div className='flex mt-10 '>
                    <div className=' w-full' >
                        <img src={dataMovie.poster} alt="helo" className='rounded-2xl m-h-[400px] object-cover' />
                    </div>

                    <div className='flex flex-col justify-between px-10 text-center '>

                        <div className='flex flex-col items-center'>
                            <AiOutlineVideoCamera className='text-primary-textMovie' size={35} />
                            <span className='text-gray-400'>Type</span>
                            <p className='font-logo'>{dataMovie.genres[0]}</p>
                        </div>

                        <div className='flex flex-col items-center'>
                            <div><IoMdTime className='text-primary-textMovie' size={35} /></div>
                            <span className='text-gray-400'>Duration</span>
                            <p className='font-logo text-sm'>{convertMinutesToHhMm(dataMovie.runtime)}</p>
                        </div>

                        <div className='flex flex-col items-center'>
                            <div><CiStar className='text-primary-textMovie' size={35} /></div>
                            <span className='text-gray-400'>Rating</span>
                            <p className='font-logo'>{Number(dataMovie.imdb.rating).toFixed(1)}/10</p>
                        </div>
                    </div>

                </div>
                <div className='my-5 flex justify-between items-center'>
                    <div>
                        <h2 className='font-w900'>{dataMovie.title}</h2>
                        <p className='text-gray-400 mt-2'>{dataMovie.theFirm}</p>
                    </div>
                    <div>
                    {IsTrue
                            ? <div
                                onClick={handleRemoveLove}
                                className={`flex w-[200px] p-4 items-center gap-2 ${buttonCLick} cursor-pointer`} >
                                <span><FaHeart size={30} /></span>
                                <p>Remove List</p>
                            </div>
                            : <div
                                onClick={handleAddLove}
                                className={`flex w-[200px] p-4 items-center gap-5 ${buttonCLick} cursor-pointer`}>
                                <span><FaRegHeart size={30} /></span>
                                <p>Add List</p>
                            </div>
                        }
                    </div>
                </div>
                <div>
                    <h2 className='font-w900'>Descriptions</h2>
                    <p>{dataMovie.fullplot}</p>
                    {/* <p>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloribus dolorum eos error consectetur repellendus! Aspernatur numquam non reiciendis sit nesciunt consequatur, perferendis a ratione dolor, earum quia nobis aliquid. Blanditiis.</p> */}
                </div>
                <div className=''>
                    <Link className='text-white hover:text-white' to={`${location}/booking`} state={dataMovie} onClick={() => handleClick(data)}>
                        <Button className={`${btnSubmit} hover:bg-chairMovie-chairSelected  h-16 mt-10 text-xl w-full `}>Select Seat</Button>
                    </Link>

                </div>

            </div> : ''}



        </div>
    );
}
export default MovieDetails;