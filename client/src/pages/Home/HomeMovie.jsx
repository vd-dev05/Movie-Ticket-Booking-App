import React, { useEffect, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel } from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { TypingEffect } from "@/lib/animationText";
import { Link } from "react-router-dom";
import { useTheme } from "@/context/Theme";
import { useThemeClasses } from "@/context/Theme/themeStyles";
import { useUser } from "@/context/User";
import UserHistory from "@/services/users/history";
import MovieTop from "./MovieTop";
import LoveMovie from "./loveMovie";
import Nav from "@/layout/Nav/index";

const HomeMovie = () => {
    const [nameUser, setNameUser] = useState('');
    const [check, setCheck] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [dataLove, setDataLove] = useState([]);
    const [dataHistory, setDataHistory] = useState([]);

    const themeCtx = useTheme();
    const { inputClasses, themeBackGround } = useThemeClasses();
    const { dataUser } = useUser();
    const accountInfo = JSON.parse(localStorage.getItem("account-info"));
    const { name } = accountInfo || {};

    // Handle theme selection
    const onSelectTheme = (event) => {
        themeCtx.setTheme(event.target.value);
    };

    const handleThemeToggle = () => {
        setCheck(!check);
    };

    // Fetch user data on mount
 

    useEffect(() => {
        const fetchData = async () => {
            try {
                const responseHistory = await UserHistory.getLastMovie();  
                const responseLove = await UserHistory.getLoveMovie();
                setDataLove(responseLove.data);
                setDataHistory(responseHistory.data.history);

                setIsLoading(false); 
            } catch (error) {
                console.error("Error fetching user data:", error);
                setIsLoading(false);
            } finally {
                setIsLoading(true)
            }
        };
        fetchData();
    }, []);
    useEffect(() => {
        if (dataHistory.length && dataLove.length) {
            setIsLoading(false); 
        }
    }, [dataLove, dataHistory]);
    if (isLoading) {
        return (
                <div className="text-center">
                    <p>Loading your favorite movies...</p>
                </div>
        );
    }

    return (
        <div className={`iphone-12-pro-max:flex flex flex-col font-movie pt-10 relative opacity-95 ${themeBackGround}`}>
            <div className="px-5">
                {/* Welcome User Section */}
                <div className="flex justify-between">
                    <div>
                        <div className="h-5">{TypingEffect(name || 'User')}</div>
                        <p>Book your favourite movie</p>
                    </div>
                    <div>
                        <Avatar>
                            <AvatarImage src={"https://github.com/shadcn.png"} />
                            <AvatarFallback>Avatar</AvatarFallback>
                        </Avatar>
                    </div>
                </div>

                {/* Search and Theme Toggle */}
                <div className="flex mt-5">
                    <div className="relative w-full">
                        <Input className={`px-10 py-5 focus:border-white`} placeholder="Search" />
                        <div className="absolute top-2 left-3">
                            <box-icon name="search"></box-icon>
                        </div>
                    </div>

                    <div className="relative">
                        <div onClick={handleThemeToggle} className="w-[40px] cursor-pointer">
                            <img src="/assets/icons/filter.png" alt="Filter" />
                        </div>

                        <DropdownMenu open={check} onOpenChange={setCheck}>
                            <DropdownMenuContent className={`absolute top-44 ${themeBackGround}`}>
                                <DropdownMenuLabel>Theme</DropdownMenuLabel>
                                <DropdownMenuItem onClick={() => onSelectTheme({ target: { value: "dark" } })}>Dark</DropdownMenuItem>
                                <DropdownMenuItem onClick={() => onSelectTheme({ target: { value: "light" } })}>Light</DropdownMenuItem>
                                <DropdownMenuItem onClick={() => onSelectTheme({ target: { value: "travel" } })}>Universe</DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                </div>

                {/* Category Section */}
                <div className="flex justify-between mt-10">
                    <h2 className="font-bold text-[15px]">Category</h2>
                    <Link to="/all" className="text-chairMovie-chairSelected">See all</Link>
                </div>

                <div className="flex justify-between mt-5">
                    {["Romance", "Comedy", "Horror", "Drama"].map((category, index) => (
                        <div key={index} className="cursor-pointer">
                            <Link to={`/geners/${category.toLowerCase()}`}>
                                <div className={`flex items-center justify-center rounded-2xl ${inputClasses} h-16 w-16`}>
                                    <div className="text-3xl">{category === "Romance" ? "🥰" : category === "Comedy" ? "😀" : category === "Horror" ? "😨" : "😆"}</div>
                                </div>
                            </Link>
                            <p className="text-center mt-2">{category}</p>
                        </div>
                    ))}
                </div>

                {/* Movie Top and Latest Movies */}
                <div className="pb-5">
                    <MovieTop />
                </div>

                <div className="flex justify-between mt-10 px-5 text-2xl">
                    <h2 className="font-bold">Latest Movies</h2>
                    <Link to="/lmovie"  state={{ data: dataHistory }}  className="text-chairMovie-chairSelected text-2xl">See all</Link>
                </div>
                <div className="mt-5 ">
                    {dataHistory.length ? <LoveMovie data={dataHistory}  page={2} sizew={400} sizeh={460} space = {190} isize={350} texts={40}/> : 'Not found'}
                </div>

                {/* Love Movies Section */}
                <div className="flex justify-between mt-10 px-5">
                    <h2 className="font-bold text-2xl">Favurite Movie</h2>
                    <Link to="/lmovie" state={{ data: dataLove }} className="text-chairMovie-chairSelected text-2xl">See all</Link>
                </div>
                <div className="mt-5 mb-24">
                    {dataLove.length ? <LoveMovie data={dataLove} sizew={250} sizeh={360} space = {100} isize={250}  page={3}  texts={20}/> : "Not found"}
                </div>
            </div>

            {/* Bottom Navigation */}
            <div className="fixed bottom-0 left-0 w-full z-50">
                <Nav data="home" />
            </div>
        </div>
    );
};

export default HomeMovie;
