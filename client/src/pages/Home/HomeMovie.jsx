import Nav from "@/components/common/Nav";
import { getUser } from "@/models/getUser";
import React, { useEffect, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
// import Typed from 'react-typed';
// import { TypeAnimation } from 'react-type-animation';
import TypingEffect from "@/models/aminationHome";
import { LoadingApp } from "@/components/common/loading";
import { Link } from "react-router-dom";
import { useTheme } from "@/context/Theme";
import { useThemeClasses } from "@/context/Theme/themeStyles";
import { showErrorToast, showInfoToast } from "@/lib/toastUtils";
import MovieTop from "./MovieTop";
// import UserIndexDb from "@/hooks/indexDb/user";
const HomeMovie = () => {

    const [nameUser, setNameUser] = useState()
    const [check, setCheck] = useState(false)
    const [isLoading, setisLoading] = useState(true)
    const themeCtx = useTheme()
    const { name } = JSON.parse(localStorage.getItem("account-info"))

    // console.log(username);
    const { inputClasses, themeBackGround } = useThemeClasses()
    if (!localStorage.getItem("account-info")) {
        name = '';
        const timeoutId = setTimeout(() => {
            if (!name && !id) {
                toast.info('Please enter login name ')
            }
        }, 1000);
        return () => clearTimeout(timeoutId);
    } 
    useEffect(() => {
        // (
        //     async () => {
        //      const data =    await UserIndexDb.getUser()
        //      console.log(data);

        //     }
        // )()

        // (async () => {
        //     const r = await getUser()
        //     setisLoading(false)
        //     // console.log(r.data.name);
        // })()
        setisLoading(false)


    }, [localStorage.getItem('account-info')]);
    // const text = `Welcome ${name ? name : 'user'} 👋`;
    const onSelectTheme = (event) => {
        themeCtx.setTheme(event.target.value);
        setColor(event.target.color)
    };
    const handleThemeToggle = () => {

        setCheck(!check);
        // console.log(user);

    };
    // LoadingApp(isLoading)

    return (

        <div className={`iphone-12-pro-max:flex flex flex-col font-movie pt-10 relative    opacity-95 ${themeBackGround}`}>
            <LoadingApp isLoading={isLoading}></LoadingApp>
            <div className="px-5">
                {/* user wellcome */}
                <div className="flex justify-between">
                    <div>
                        <div className="h-5">{TypingEffect(name)}</div>

                        <p>Book your favourite movie</p>
                    </div>
                    <div>
                        <Avatar>
                            <AvatarImage src={"https://github.com/shadcn.png"} />
                            <AvatarFallback>Avatar</AvatarFallback>
                        </Avatar>
                    </div>
                </div>
                {/* input , click theme  */}
                <div className="flex mt-5">
                    <div className="relative  w-full">
                        <Input
                            className={`px-10 py-5  focus:border-white `}
                            placeholder="Search"
                        />
                        <div className="absolute top-2 left-3">
                            <box-icon name='search'> </box-icon>
                        </div>
                    </div>
                    <div className="relative ">
                        <div
                            onClick={handleThemeToggle}
                            className="w-[40px] relative"
                        //  onClick={() => console.log("hello")
                        //  }
                        >
                            <img src="/assets/icons/filter.png" className="cursor-pointer " alt="Filter" />


                        </div>
                        <div>

                            <DropdownMenu open={check} onOpenChange={setCheck} >
                                {/* < DropdownMenuTrigger className="-translate-y-3 -z-20 bg-none"></DropdownMenuTrigger> */}
                                <DropdownMenuContent className={` absolute top-44 ${themeBackGround}  `}>
                                    <DropdownMenuLabel>Theme </DropdownMenuLabel>
                                    <DropdownMenuItem onClick={() => onSelectTheme({ target: { value: "dark", color: "white" } })}>Dark</DropdownMenuItem>
                                    <DropdownMenuItem onClick={() => onSelectTheme({ target: { value: "light", color: "black" } })}>Light</DropdownMenuItem>
                                    <DropdownMenuItem onClick={() => onSelectTheme({ target: { value: "travel", color: "white" } })}>Universe</DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </div>

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
                <div>
                    <MovieTop></MovieTop>
                </div>

            </div>



            {/* <ToastContainer></ToastContainer> */}
            <div className="fixed bottom-0 left-0 w-full">
                <Nav data="home" />
            </div>
        </div>
    );
}

export default HomeMovie;