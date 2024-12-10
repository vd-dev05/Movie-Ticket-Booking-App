import React, { useState, useRef, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useThemeClasses } from '@/context/Theme/themeStyles';
import UserHistory from '@/services/users/history';
import { Button } from '@/components/ui/button';
import { useTheme } from '@/context/Theme';
import { convertMinutesToHhMm } from '@/hooks/GetApi/GetApi';
import UserController from '@/services/users/User.controller';
import { FaHeart, FaRegHeart } from 'react-icons/fa6';
import { showInfoToast, showSuccessToast } from '@/lib/toastUtils';
import { FaPlay } from "react-icons/fa";
import { truncateText } from '@/hooks/GetApi/GetApi';

const MovieDetails = () => {
    const { textClasses, backGround, themeBackGround, themeUniver, btnSubmit, buttonCLick } = useThemeClasses();
    const { color } = useTheme();
    const location = useLocation();

    const { data } = location.state || {};

    const [dataMovie, setDataMovie] = useState(data);
    const [isValid, setIsValid] = useState(false);
    const [IsTrue, setIsTrue] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [user, setUser] = useState('guest');
    const videoRef = useRef(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [showBanner, setShowBanner] = useState(true);

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
        if (videoRef.current.paused) {
            videoRef.current.play();
            setIsPlaying(true);
        } else {
            videoRef.current.pause();
            setIsPlaying(false);
        }
    };

    useEffect(() => {
        const access_token = localStorage.getItem('access_token');

        const fetchData = async () => {
            try {
                if (access_token) {
                    setUser('user');
                    await UserHistory.lastMovie(location.pathname.split('/')[2] || data._id);

                    const response = await UserHistory.getLoveMovie();
                    if (response.length === 0) {
                        setIsTrue(false);
                        setIsLoading(true);
                    } else if (response.length > 0) {
                        const check = response.findIndex((item) => item._id.toString() === location.pathname.split('/')[2]);

                        if (check === -1) {
                            setIsTrue(false);
                            setIsLoading(true);
                        } else {
                            setIsTrue(true);
                            setIsLoading(true);
                        }
                    }
                } else {
                    setUser('guest');
                }

                if (location) {
                    const reponse = await UserController.getMovieId(location.pathname.split('/')[2] || data._id);
                    if (reponse === undefined) {
                        window.location.href = '/home';
                    }
                    if (reponse && reponse.data.trailer) {
                        const splitText = reponse.data.trailer.split('/upload');
                        const trailer = reponse.data.trailer.includes('/upload')
                            ? splitText[0] + '/upload/q_auto:low,h_900,w_1600/c_limit,e_blur:100/' + splitText[1]
                            : reponse.data.trailer;
                        setDataMovie({
                            ...reponse.data,
                            trailer: trailer
                        });
                    } else {
                        setDataMovie(reponse.data);
                    }

                    setIsValid(true);
                    setIsLoading(true);
                }
            } catch (error) {
                console.log(error);
            }
        };
        fetchData();
    }, [location]);

    const handleAddLove = async () => {
        if (localStorage.getItem('access_token')) {
            const reponse = await UserHistory.loveMovie('like', location.pathname.split('/')[2] || data._id);
            showSuccessToast(reponse.data.message);
            setIsTrue(isValid);
        } else {
            showInfoToast('Please Login');
        }
    };

    const handleRemoveLove = async () => {
        if (localStorage.getItem('access_token')) {
            const reponse = await UserHistory.loveMovie('unlike', location.pathname.split('/')[2] || data._id);
            showSuccessToast(reponse.data.message);
            setIsTrue(!isValid);
        } else {
            showInfoToast('Please Login');
        }
    };

    if (!isLoading) {
        return <p>Loading ...</p>;
    }

    return (
        <div className='font-movie min-w-[100vw]'>
            {dataMovie && isValid ? (
                <div>
                    <div className='relative w-full h-[500px]'>
                        <div
                            className={`w-full h-full  ${isPlaying ? '-z-10 blur-sm drop-shadow-xl ' : ''} `}
                            style={{
                                position: 'absolute',
                                top: '0',
                                left: '0',
                                backgroundImage: `url(${dataMovie.poster})`,
                                backgroundSize: 'cover',
                                backgroundPosition: 'center',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                color: 'white',
                                fontSize: '36px',
                                fontWeight: 'bold',
                                textShadow: '2px 2px 4px rgba(0, 0, 0, 0.7)',
                            }}
                        >
                            <button
                                className='z-20 backdrop-blur-sm bg-primary-textMovie w-[100px] h-[100px] rounded-full  flex justify-center items-center p-2'
                                onClick={handlePlayButtonClick}
                            >
                                {isPlaying ? 'Pause Trailer' : <FaPlay />}
                            </button>
                        </div>
                        <video
                            className='object-center h-full z-20'
                            ref={videoRef}
                            onClick={handleVideoClick}
                        >
                            <source src={`${dataMovie.trailer ? dataMovie.trailer : "https://res.cloudinary.com/dlpxfxpdn/video/upload/q_auto:low/v1732811181/idydihhtp0yoebaaohna.mp4"}`} type="video/mp4" />
                            Your browser does not support the video tag.
                        </video>
                        <div className='absolute top-10 left-5 items-center z-50'>
                            <div className="backdrop-blur-sm w-fit rounded-sm flex justify-center items-center p-2">
                                <Link to={`${user === 'user' ? '/history' : '/home'}`} >
                                    <box-icon name='chevron-left' size={"40px"} color={'red'}> </box-icon>
                                </Link>
                            </div>
                        </div>
                        <div className='absolute top-0 inset-0 opacity-90 w-full from-[#192026] to-transparent h-full bg-gradient-to-t'></div>
                        <div className='absolute bottom-0 w-full text-sm p-5'>
                            <h1 className='font-w900 text-4xl text-white'>{dataMovie.title}</h1>
                            <div className='flex justify-between px-2 text-[#f9b24f] items-center'>
                                <div className=''>
                                    <p className='text-xl'>Rating : {dataMovie.imdb ? dataMovie.imdb.rating : ''}/10</p>
                                    <p className='text-xs'>Votes: {dataMovie.imdb ? dataMovie.imdb.votes : ''}</p>
                                </div>
                                <p className='text-xl'>Price : $6.68 - $10</p>
                            </div>
                        </div>
                    </div>
                    <div className={`iphone-12-pro-max:flex w-full flex flex-col min-h-screen pt-10 px-5 ${themeUniver} ${textClasses}`}>
                        <div>
                            <h2 className='font-w900 text-2xl'>Descriptions</h2>
                            <p>{dataMovie.fullplot}</p>
                        </div>
                        <hr className='my-10' />
                        <div>
                            <h2 className='font-w900 text-2xl'>Details</h2>
                            <div className='flex flex-row md:flex-row py-5'>
                                <img
                                    src={dataMovie.poster}
                                    alt="helo"
                                    className='rounded-2xl w-[250px] h-[300px] sm:h-[400px] md:h-[600px] object-cover'
                                />
                                <div className='flex flex-col justify-between px-5 sm:px-10 text-center md:text-center'>
                                    <div className='flex gap-5 items-center'>
                                        <span className='text-gray-400'>Title</span>
                                        <p className='font-logo text-nowrap'>{dataMovie ? (truncateText(dataMovie.title, 25)) : ''}</p>
                                    </div>
                                    <div className='flex gap-5 items-center'>
                                        <span className='text-gray-400'>Type</span>
                                        <p className='font-logo'>{dataMovie.genres ? dataMovie.genres.join(',') : ''}</p>
                                    </div>
                                    <div className='flex gap-5 items-center'>
                                        <span className='text-gray-400'>Duration</span>
                                        <p className='font-logo text-sm'>{convertMinutesToHhMm(dataMovie.runtime)}</p>
                                    </div>
                                    <div className='flex gap-5 items-center'>
                                        <span className='text-gray-400'>Rating</span>
                                        <p className='font-logo'>{dataMovie.imdb ? Number(dataMovie.imdb.rating).toFixed(1) : ''}/10</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <hr className='my-10' />
                    </div>
                </div>
            ) : null}

            <div className='fixed bottom-5 min-w-full flex p-10 gap-5'>
                <div>
                    {IsTrue
                        ? <div
                            onClick={handleRemoveLove}
                            className={`flex p-4 items-center gap-2 ${buttonCLick} cursor-pointer`}>
                            <span><FaHeart size={30} /></span>
                        </div>
                        : <div
                            onClick={handleAddLove}
                            className={`flex p-4 items-center gap-5 ${buttonCLick} cursor-pointer`}>
                            <span><FaRegHeart size={30} /></span>
                        </div>
                    }
                </div>
                <div className='w-full'>
                    <Link className='text-white hover:text-white' to={`seller`} state={dataMovie} onClick={() => handleClick(data)}>
                        <Button className={`${btnSubmit} hover:bg-chairMovie-chairSelected w-full h-16 text-xl`}>Select Seat</Button>
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default MovieDetails;
