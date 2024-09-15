import React, { useCallback, useContext, useEffect, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { fetchMovies, dataMovie } from "../Product/GetApi/GetApi";
import MovieDe from "../Product/nextPage/MovieDetails";
import Nav from "../Nav";
import { useTheme } from "../Theme";
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
import { db, database, app } from "@/components/firebase/firebase";
import { getDatabase, ref, onValue, get, set, child, push, update } from 'firebase/database';
import { useThemeClasses } from "../Theme/themeStyles";
import MovieTop from "./MovieTop";
import { Alert, Flex, Spin } from 'antd';


const HomePage = () => {
    const contentStyle = {
        padding: 50,
        background: 'rgba(0, 0, 0, 0.05)',
        // background:"black",
        borderRadius: 4,
        height: '100vh',
    };
    const content = <div style={contentStyle} />;

    const themeCtx = useTheme()
    // console.log(themeCtx.theme);
    const location = useLocation();
    const state = location.state || {}; 
    // console.log(state );

    
    const { color, setColor, } = useTheme();
    const { inputClasses, buttonClasses, themeUniver } = useThemeClasses()

    const provider = new GoogleAuthProvider();
    const nav = useNavigate()

    const [isLoading, setisLoading] = useState(true)
    // console.log(state);
    
    const [check, setCheck] = useState(false)
    const [data, setMovieData] = useState({
        dataMovie: [],
        dataUser: null,
    });

    const [isAuthChecked, setIsAuthChecked] = useState(false);
    const [checkLogin, setChecLogin] = useState(false)
    const [user,setUser] = useState()
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
                // setChecLogin(true)
                localStorage.setItem('user', JSON.stringify(currentUser));

                setUser(currentUser.displayName)
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
        (
            async () => {
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
            }
        )();
        (async () => {
            try {
                // Read name firbase
                const starCountRef = ref(database, 'users/' + 'auth');
                onValue(starCountRef, (snapshot) => {
                    const data = snapshot.val();
                    // console.log(data);
                    
                    setUser(data.name)
                });

                //  create acc profile data
                const userRefData = ref(database, 'users/');
                await update(userRefData, {
                    total: "",
                    loveMovie: Array(''),
                    dataComent: Array(''),
                    card: {
                        name: "",
                        numberCard: "",
                        date: "",
                        cvv: ""
                    },
                    dataTicket: Array(''),
                    dataLastMovie:Array(''),
                    dataTimeBook: "",
                    dataDayBook: "",
                })

            } catch (error) {
                console.error("Error initializing user data:", error);
            }
        })();
        return () => unsubscribe();
    }, [auth]);

    if (isLoading) {
        return <>
            <div className="h-[100vw]">
                <Flex gap="middle" vertical className='flex mt-44'>
                    <Spin tip="Loading" size="large"  >
                        {content}
                    </Spin>

                </Flex>
            </div>
        </>
    }
    const onSelectTheme = (event) => {
        themeCtx.setTheme(event.target.value);
        setColor(event.target.color)



    };
    // console.log(check);
    const handleThemeToggle = () => {
        setCheck(!check);
        console.log(user);
        
    };

    return (
        <div>

            <div className={`iphone-12-pro-max:flex flex flex-col font-movie pt-10 relative   ${themeUniver}  opacity-95 `}>
                <div className=" absolute top-[30%] w-full  h-0  z-0">
                    {themeCtx.theme == 'travel' ? (<div className=" relative ">
                        <div className=" absolute  left-0 bg-[#09FBD3] -translate-x-[50%]  blur-3xl opacity-25  drop-shadow-2xl  rounded-full w-[300px] h-[300px] z-0"></div>
                        <div className="absolute  right-0  translate-y-[100%]  bg-[#FE53BB] blur-3xl opacity-20    drop-shadow-2xl  rounded-full w-[300px] h-[300px] z-0">   </div>
                    </div>) : ''}


                </div>
                <div className="px-5">
                    <div className="flex justify-between">
                        <div>
                            <h1 className="font-logo">Welcome {user ? user : 'user  '} 👋</h1>
                            <p>Book your favourite movie</p>
                        </div>
                        <div>
                            <Avatar>
                                <AvatarImage src={data.dataUser?.photoURL || "https://github.com/shadcn.png"} />
                                <AvatarFallback>Avatar</AvatarFallback>
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
                        <div className="">
                            <div
                                onClick={handleThemeToggle}
                                className="w-[40px] "
                            //  onClick={() => console.log("hello")
                            //  }
                            >
                                <img src="/assets/icons/filter.png" className="cursor-pointer" alt="Filter" />
                            </div>
                            <DropdownMenu open={check} onOpenChange={setCheck}>
                                < DropdownMenuTrigger></DropdownMenuTrigger>
                                <DropdownMenuContent className={`-translate-y-8 mx-5 ${themeCtx.theme === 'dark' ? 'bg-gray-50' : 'bg-white'}`}>
                                    <DropdownMenuLabel>Theme </DropdownMenuLabel>
                                    <DropdownMenuItem onClick={() => onSelectTheme({ target: { value: "dark", color: "white" } })}>Dark</DropdownMenuItem>
                                    <DropdownMenuItem onClick={() => onSelectTheme({ target: { value: "light", color: "black" } })}>Light</DropdownMenuItem>
                                    <DropdownMenuItem onClick={() => onSelectTheme({ target: { value: "travel", color: "white" } })}>Universe</DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </div>
                    </div>
                    <div className="flex justify-between mt-10 ">
                        <h2 className="font-bold">Category</h2>
                        <Link to="/all" className="text-chairMovie-chairSelected">See all</Link>
                    </div>
                    <div className="flex justify-between mt-5 ">
                        <div className={`cursor-pointer`}>
                            <div className={` ${themeCtx.theme == 'travel' ? 'card-wrapper' : 'flex items-center justify-center rounded-2xl'} ${inputClasses}   h-16 w-16 `}>
                                <div className={` ${themeCtx.theme == 'travel' ? 'card-content' : ''} flex items-center justify-center text-xs`}>
                                    🥰
                                </div>
                            </div>
                            <p className="text-center mt-2">Romance</p>
                        </div>
                        <div className="cursor-pointer" >
                            <div className={` ${themeCtx.theme == 'travel' ? 'card-wrapper' : 'flex items-center justify-center rounded-2xl'} ${inputClasses}   h-16 w-16 `}>
                                <div className={` ${themeCtx.theme == 'travel' ? 'card-content' : ''} flex items-center justify-center text-xs`}>
                                    😀
                                </div>
                            </div>

                            <p className="text-center mt-2">Comedy</p>
                        </div>
                        <div className="cursor-pointer">
                            <div className={` ${themeCtx.theme == 'travel' ? 'card-wrapper' : 'flex items-center justify-center rounded-2xl'} ${inputClasses}   h-16 w-16 `}>
                                <div className={` ${themeCtx.theme == 'travel' ? 'card-content' : ''} flex items-center justify-center text-xs`}>
                                    😨
                                </div>
                            </div>
                            <p className="text-center mt-2">Horror</p>
                        </div>
                        <div className="cursor-pointer">
                            <div className={` ${themeCtx.theme == 'travel' ? 'card-wrapper' : 'flex items-center justify-center rounded-2xl'} ${inputClasses}   h-16 w-16 `}>
                                <div className={` ${themeCtx.theme == 'travel' ? 'card-content' : ''} flex items-center justify-center text-xs`}>
                                    😆
                                </div>
                            </div>
                            <p className="text-center mt-2">Drama</p>
                        </div>
                    </div>
                </div>
                <div>
                    <MovieTop></MovieTop>
                </div>
                <div className="z-10">
                    <div className="flex justify-between mt-10 px-5">
                        <h2 className="font-bold">Latest Movie</h2>
                        <Link to="/lmovie" className="text-chairMovie-chairSelected">See all</Link>
                    </div>

                    <div className="iphone-12-pro-max:flex flex flex-col     font-movie pl-5">
                        <MovieDe data={data.dataMovie} />
                    </div>
                    <div className="flex justify-between mt-10 px-5">
                        <h2 className="font-bold">Favourite Movie</h2>
                        <Link to="/love" className="text-chairMovie-chairSelected">See all</Link>
                    </div>

                    <div className="iphone-12-pro-max:flex flex flex-col iphone-12:w-[100vw ] font-movie pl-5 mb-20">
                        <MovieDe data={data.dataMovie} />
                    </div>
                </div>
            </div>
            <div className="fixed bottom-0 left-0 w-full">
                <Nav data="home" />
            </div>
        </div>
    );
};

export default HomePage;
