import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input";
import { Link, } from "react-router-dom";
// import LatestMovie from "../Product/cardLmovie";
import { fetchMovies } from "../Product/homelmovie"
import { useEffect, useState } from "react";
import MovieDe from "../Product/movieDetails";
import { FaHome, FaSearch, FaHeart, FaTicketAlt } from 'react-icons/fa';
import { TbUserSquareRounded } from "react-icons/tb";
const HomePage = () => {
    const [data, setMovieData] = useState([])

    useEffect(() => {
        const getMovies = async () => {
            try {
                const data = await fetchMovies();
                setMovieData(data);
            } catch {
                console.log("error");
            }
        };

        getMovies();
    }, []);

    const NavButton = ({ label, icon, isActive, onClick }) => (
        <button
            className={`flex  items-center text-sm ${isActive ? 'bg-chairMovie-chairSelected text-white' : 'text-gray-400'} p-2 rounded-lg transition-colors duration-300 ease-in-out`}
            onClick={onClick}
        >
            <div className="text-xl">{icon}</div>
            {isActive && <span className="pl-2">{label}</span>}
        </button>
    );

    const [activeTab, setActiveTab] = useState('home');

    const handleClick = (tab) => {
        setActiveTab(tab);
    };
    return (
        <div className="">
            <div className="iphone-12-pro-max:flex flex flex-col h-[200vh] iphone-12:w-[390px] font-movie px-5 mt-10 ">
                 {/* banner */}
                <div className="flex justify-between"> 
                    <div className="">
                        <h1 className="font-logo">Welcome name 👋</h1>
                        <p>Book your favourite movie</p>
                    </div>
                    <div>
                        <Avatar>
                            <AvatarImage src="https://github.com/shadcn.png" />
                            <AvatarFallback>CN</AvatarFallback>
                        </Avatar>
                    </div>
                </div>

                <div className="flex mt-5">
                    <div className="relative">
                        <Input
                            className="bg-gray-50 px-10 py-5 w-[300px] "
                            placeholder="Search"
                        ></Input>
                        <div className="absolute top-2 left-3">
                            <box-icon name='search' ></box-icon>
                        </div>
                    </div>
                    <div className="pl-2">
                        <img src="/src/assets/icons/filter.png" width={"40px"} alt="" />
                    </div>

                </div>
                <div>
                    <div className="flex justify-between mt-10">
                        <h2>Category</h2>
                        <Link to="/all" >See all </Link>
                    </div>
                </div>
                <div className="flex justify-between mt-5">
                    <div>
                        <button
                            className="bg-gray-50 h-16 w-16 rounded-lg flex justify-center items-center"
                        >🥰</button>
                        <p className="text-center mt-2">Romance</p>
                    </div>
                    <div>
                        <button
                            className="bg-gray-50 h-16 w-16 rounded-lg flex justify-center items-center"
                        >😀</button>
                        <p className="text-center mt-2">Comedy</p>
                    </div>
                    <div>
                        <button
                            className="bg-gray-50 h-16 w-16 rounded-lg flex justify-center items-center"
                        >😨</button>
                        <p className="text-center mt-2">Horror</p>
                    </div>
                    <div>
                        <button
                            className="bg-gray-50 h-16 w-16 rounded-lg flex justify-center items-center"
                        >😆</button>
                        <p className="text-center mt-2">Drama</p>
                    </div>

                </div>
                <div>
                    <div className="flex justify-between mt-10 ">
                        <h2>Latest Movie</h2>
                        <Link to="/lmovie" >See all </Link>

                    </div>

                </div>

                <div className="iphone-12-pro-max:flex flex flex-col iphone-12:w-[390px] font-movie ">
                    <MovieDe data={data}></MovieDe>
                </div>
                <div  className="flex justify-between mt-10 ">
                    <h2>Favourite Movie</h2>
                    <Link to="/alllove" >See all </Link>
                </div>

                <div className="iphone-12-pro-max:flex flex flex-col  iphone-12:w-[390px] font-movie ">
                    <MovieDe data={data}></MovieDe>
                </div>
                <div className="fixed -bottom-4 left-0 w-full h-20 bg-white shadow-lg flex justify-between p-5 mr-5">
                    <NavButton
                        label="Home"
                        icon={<FaHome />}
                        isActive={activeTab === 'home'}
                        onClick={() => handleClick('home')}
                    />
                    <NavButton
                        label="Tìm kiếm"
                        icon={<FaSearch />}
                        isActive={activeTab === 'search'}
                        onClick={() => handleClick('search')}
                    />
                    <NavButton
                        label="Love Movie"
                        icon={<FaHeart />}
                        isActive={activeTab === 'love'}
                        onClick={() => handleClick('love')}
                    />
                    <NavButton
                        label="My Tickets"
                        icon={<FaTicketAlt />}
                        isActive={activeTab === 'tickets'}
                        onClick={() => handleClick('tickets')}
                    />
                    <NavButton
                        label="Profile"
                        icon={<TbUserSquareRounded />}
                        isActive={activeTab === 'user'}
                        onClick={() => handleClick('user')}
                    />
                </div>
            </div>


        </div>


    );
}

export default HomePage;