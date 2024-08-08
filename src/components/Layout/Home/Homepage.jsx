import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input";
import { Link, useLocation, } from "react-router-dom";
// import LatestMovie from "../Product/cardLmovie";
import { fetchMovies } from "../Product/GetApi/GetApi"
import { useEffect, useState } from "react";
import MovieDe from "../Product/nextPage/MovieDetails";
import Nav from "../Nav";


const HomePage = () => {
    // const location = useLocation();
    // const d = location;
    // console.log(d);
    const location = useLocation();
    const datas = location.state?.data;
    console.log(datas);
    
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




    return (
        <div className="">
            <div className="iphone-12-pro-max:flex flex flex-col h-[200vh] iphone-12:w-[390px] font-movie  mt-10 relative ">
                {/* banner */}
                <div className="px-5">
                <div className="flex justify-between ">
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

                </div>
                
                <div>
                    <div className="flex justify-between mt-10 px-5 ">
                        <h2>Latest Movie</h2>
                        <Link to="/lmovie" >See all </Link>

                    </div>

                </div>

                <div className="iphone-12-pro-max:flex flex flex-col iphone-12:w-[390px] font-movie pl-5 ">
                    <MovieDe data={data}></MovieDe>
                </div>
                <div className="flex justify-between mt-10 px-5">
                    <h2>Favourite Movie</h2>
                    <Link to="/love" >See all </Link>
                </div>

                <div className="iphone-12-pro-max:flex flex flex-col  iphone-12:w-[390px] font-movie  pl-5 ">
                    <MovieDe data={data}></MovieDe>
                </div>
             

            </div>
            <div className="fixed bottom-0 left-0 w-full ">
                <Nav data="home"></Nav>

            </div>

        </div>


    );
}

export default HomePage;