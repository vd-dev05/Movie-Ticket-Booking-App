import React, { useCallback, useContext, useEffect, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Link, useNavigate } from "react-router-dom";
import { fetchMovies,dataMovie } from "../Product/GetApi/GetApi";
import MovieDe from "../Product/nextPage/MovieDetails";
import Nav from "../Nav";
import {useTheme} from "../Theme";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { auth } from '@/components/firebase/firebase';
import { GoogleAuthProvider, signInWithPopup, onAuthStateChanged } from "firebase/auth";
import { collection, getDocs, addDoc } from 'firebase/firestore'
import { db ,database ,app } from "@/components/firebase/firebase";
import { getDatabase, ref, onValue, get } from 'firebase/database';
import { useThemeClasses } from "../Theme/themeStyles";
const HomePage = () => {
    const themeCtx = useTheme()
    const { color, setColor, } = useTheme();
    const {inputClasses,buttonClasses} =useThemeClasses()

    const provider = new GoogleAuthProvider();
    const nav = useNavigate()
    const [isLoading,setisLoading] = useState(true)
    const [data, setMovieData] = useState({
        dataMovie: [],
        dataUser: null,
    });

    const [isAuthChecked, setIsAuthChecked] = useState(false); 

    const authenticateUser = useCallback(async () => {
        try {
            await signInWithPopup(auth, provider);
        } catch (error) {
            nav("/l")
        }
    }, [auth, nav]);

    useEffect(() => {
        // const getMovies = async () => {
        //     try {
        //         const movies = await fetchMovies() ;
        //         // console.log(movies);
               
        

        //     } catch (error) {
        //         console.log("Error fetching movies:", error);
        //     }
        // };
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                const currentUser = {
                    uid: user.uid,
                    email: user.email,
                    displayName: user.displayName,
                    photoURL: user.photoURL,
                };

                localStorage.setItem('user', JSON.stringify(currentUser));

                setMovieData(prevState => ({
                    ...prevState,
                    dataUser: currentUser,
                }));
            } else {
                localStorage.removeItem('user');
                setMovieData(prevState => ({
                    ...prevState,
                    dataUser: null,
                }));
            }

            setIsAuthChecked(false);
        });

        const fetchMovies = async () => {
            try {
                const data = await dataMovie('data/movies'); 
                if (data) {
                //    console.log(data);
                setMovieData(prevState => ({
                    ...prevState,
                    dataMovie: data,
                }));
                setisLoading(true)
                }
            } catch (err) {
                console.error(err);
            } finally {
                setisLoading(false);
            }
        };

        fetchMovies();
       
  
        return () => unsubscribe();
    }, [auth]);

    
    // useEffect(() => {
    //     // Check if user needs to be authenticated and if auth status is confirmed
    //     if (isAuthChecked) {
    //         const localUser = JSON.parse(localStorage.getItem('user'));
    //         if (!localUser && !data.dataUser) {
    //             authenticateUser();
    //         }
    //     }
    // }, [data.dataUser, isAuthChecked, authenticateUser]);
    if (isLoading) {
        return <>
            <div>
                Loading...
            </div>
        </>
    }
    const onSelectTheme = (event) => {
        themeCtx.setTheme(event.target.value);
        setColor(event.target.color)
    };

    
    return (
        <div>
            <div className={`iphone-12-pro-max:flex flex flex-col     font-movie pt-10 relative ${themeCtx.theme === 'dark' ? 'bg-[#130d0d] text-white' : 'bg-white'}`}>
                <div className="px-5">
                    <div className="flex justify-between">
                        <div>
                            <h1 className="font-logo">Welcome {data.dataUser ? data.dataUser.displayName : 'User'} 👋</h1>
                            <p>Book your favourite movie</p>
                        </div>
                        <div>
                            <Avatar>
                                <AvatarImage src={data.dataUser?.photoURL || "https://github.com/shadcn.png"} />
                                <AvatarFallback>CN</AvatarFallback>
                            </Avatar>
                        </div>
                    </div>

                    <div className="flex mt-5">
                        <div className="relative  w-full">
                            <Input
                                className={`px-10 py-5  focus:border-white ${inputClasses} `}
                                placeholder="Search"
                            />
                            <div className="absolute top-2 left-3">
                                <box-icon name='search' color={` ${color}`}></box-icon>
                            </div>
                        </div>
                        <div className="pl-2">
                            <DropdownMenu>
                                <DropdownMenuTrigger className="w-0 h-0">
                                    <div className="w-[40px] -translate-y-4 -translate-x-4">
                                        <img src="/src/assets/icons/filter.png" className="cursor-pointer" alt="Filter" />
                                    </div>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent className={`mt-5 ${themeCtx.theme === 'dark' ? 'bg-gray-50' : 'bg-white'}`}>
                                    <DropdownMenuLabel>Theme </DropdownMenuLabel>
                                    <DropdownMenuItem onClick={() => onSelectTheme({ target: { value: "dark",color:"white" } })}>Dark</DropdownMenuItem>
                                    <DropdownMenuItem onClick={() => onSelectTheme({ target: { value: "light",color:"black"} })}>Light</DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </div>
                    </div>
                    <div className="flex justify-between mt-10">
                        <h2>Category</h2>
                        <Link to="/all" className="text-chairMovie-chairSelected">See all</Link>
                    </div>
                    <div className="flex justify-between mt-5 ">
                    <div>
                        <button
                            className={`${inputClasses}  h-16 w-16 rounded-lg flex justify-center items-center`}
                        >🥰</button>
                        <p className="text-center mt-2">Romance</p>
                    </div>
                    <div>
                        <button
                            className={`${inputClasses} h-16 w-16 rounded-lg flex justify-center items-center`}
                        >😀</button>
                        <p className="text-center mt-2">Comedy</p>
                    </div>
                    <div>
                        <button
                            className={`${inputClasses} h-16 w-16 rounded-lg flex justify-center items-center`}
                        >😨</button>
                        <p className="text-center mt-2">Horror</p>
                    </div>
                    <div>
                        <button
                            className={`${inputClasses} h-16 w-16 rounded-lg flex justify-center items-center`}
                        >😆</button>
                        <p className="text-center mt-2">Drama</p>
                    </div>
                    </div>
                </div>

                <div className="flex justify-between mt-10 px-5">
                    <h2 >Latest Movie</h2>
                    <Link to="/lmovie" className="text-chairMovie-chairSelected">See all</Link>
                </div>

                <div className="iphone-12-pro-max:flex flex flex-col     font-movie pl-5">
                    <MovieDe data={data.dataMovie} />
                </div>
                <div className="flex justify-between mt-10 px-5">
                    <h2>Favourite Movie</h2>
                    <Link to="/love" className="text-chairMovie-chairSelected">See all</Link>
                </div>

                <div className="iphone-12-pro-max:flex flex flex-col iphone-12:w-[100vw ] font-movie pl-5">
                    <MovieDe data={data.dataMovie} />
                </div>
            </div>
            <div className="fixed bottom-0 left-0 w-full">
                <Nav data="home" />
            </div>
        </div>
    );
};

export default HomePage;
