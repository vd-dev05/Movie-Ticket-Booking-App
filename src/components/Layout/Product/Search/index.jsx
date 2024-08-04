import { Input } from "@/components/ui/input";
import { Movie ,truncateText  } from "../GetApi/GetApi"
import { useState, useEffect } from "react";
import { CiSearch } from "react-icons/ci";
import Nav from "../../Nav";
const Search = () => {
    const [data, setMovieData] = useState([])

    useEffect(() => {
        const getMovies = async () => {
            try {
                const data = await Movie();
                setMovieData(data);


            } catch {
                console.log("error");
            }
        };

        getMovies();
    }, []);
 

    return (
        <div>
             <div className="iphone-12-pro-max:flex flex flex-col h-full iphone-12:w-[390px] font-movie  pt-10 bg-[#f5f5f5] px-5">
            <div className="relative">

                <Input
                    type="search"
                    placeholder="Search" 
                    className="w-full pl-7 bg-[#fafafa]"
                />
                <CiSearch
                    className="absolute top-3 left-2"
                />
            </div>
            <div className=" ">
                {data.map((item) => (
                    <div key={item.id} className="flex-shrink-0 w-[calc(100% / 3)] pr-2 mt-10 flex bg-white rounded-lg py-2 pl-2">
                        <div className="">
                            <img
                                src={item.poster}
                                alt={item.Title}
                                loading="lazy"
                                className="rounded-xl h-[100px] w-[100px] bg-contain object-cover "
                            />
                        </div>
                        <div className="flex flex-col justify-around pl-6">
                            <h2 className="font-[700] text-xl">{truncateText(item.title, 18)}</h2>
                                <p className="text-gray-400 text-xs">{item.theFirm}</p>
                                <p className="text-xs">Language:{item.language}</p>
                        </div>
                    </div>
                ))}

            </div>
           
        </div>
        <div className="fixed bottom-0 w-full">
                <Nav data={"search"}></Nav>
            </div>
        </div>
       
    );
}

export default Search;