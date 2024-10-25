import Nav from "@/components/common/Nav";
import { getUser } from "@/models/getUser";
import React,{ useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
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
const HomeMovie = () => {
  
    const [nameUser, setNameUser] = useState()
    const [check, setCheck] = useState(false)
    const [isLoading, setisLoading] = useState(true)
    const {username , id} = JSON.parse(localStorage.getItem("account-basic-info"))
    // console.log(username);
    
    useEffect(() => {
     
        (async () => {
            const r = await getUser()
            setisLoading(false)
            setNameUser(r.data.name )        
          
            // console.log(r.data.name);
        })()


        const timeoutId = setTimeout(() => {
            if (!username && !id ) {
                toast.info('Please enter login name ')
            }
        }, 1000);
        return () => clearTimeout(timeoutId);
    }, [localStorage.getItem('id')]);
    // const text = `Welcome ${nameUser ? nameUser : 'user'} 👋`;
    const handleThemeToggle = () => {
     
        setCheck(!check);
        console.log(user);
        
    };
    // LoadingApp(isLoading)

    return (
        
        <div className={`iphone-12-pro-max:flex flex flex-col font-movie pt-10 relative    opacity-95 `}>
            <LoadingApp isLoading={isLoading}></LoadingApp>
            <div className="px-5">
                {/* user wellcome */}
                <div className="flex justify-between">
                    <div>
                        <div className="h-5">{TypingEffect(username)}</div>
                       
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

                        <DropdownMenu open={check} onOpenChange={setCheck} >
                            {/* < DropdownMenuTrigger className="-translate-y-3 -z-20 bg-none"></DropdownMenuTrigger> */}
                            <DropdownMenuContent className={` absolute top-44  `}>
                                <DropdownMenuLabel>Theme </DropdownMenuLabel>
                                <DropdownMenuItem onClick={() => onSelectTheme({ target: { value: "dark", color: "white" } })}>Dark</DropdownMenuItem>
                                <DropdownMenuItem onClick={() => onSelectTheme({ target: { value: "light", color: "black" } })}>Light</DropdownMenuItem>
                                <DropdownMenuItem onClick={() => onSelectTheme({ target: { value: "travel", color: "white" } })}>Universe</DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>

                    </div>
                </div>
            </div>



            <ToastContainer></ToastContainer>
            <div className="fixed bottom-0 left-0 w-full">
                <Nav data="home" />
            </div>
        </div>
    );
}

export default HomeMovie;