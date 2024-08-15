import { Input } from "@/components/ui/input";
import { Movie, truncateText } from "../GetApi/GetApi"
import { useState, useEffect } from "react";
import { CiSearch } from "react-icons/ci";
import Nav from "../../Nav";
import { useTheme } from "../../Theme";
import { getDatabase, ref, child, get } from "firebase/database";
// import axios from "axios";


const Search = () => {
    const dbRef = ref(getDatabase());
    get(child(dbRef, `data/movies`)).then((snapshot) => {
      if (snapshot.exists()) {
        // console.log(snapshot);
        // setMovieData(snapshot.val());
        console.log(snapshot);
      } else {
        console.log("No data available");
      }
    }).catch((error) => {
      console.error(error);
    });



    const themeCtx = useTheme()
    const [data, setMovieData] = useState([])
    const [search, setSearch] = useState("")

    useEffect(() => {
        const getMovies = async () => {
            // try {
            //     const data = await axios.get("https://movie-ticket-25-659ce-default-rtdb.asia-southeast1.firebasedatabase.app/") ;
            //     console.log(data);
                

            // } catch {
            //     console.log("error");
            // }
            // try {
            //     const data = await Movie();
            //     setMovieData(data);
            //     setMovieSearch(data)

            // } catch {
            //     console.log("error");
            // }
        };


        getMovies();
    }, []);

    const [movieSearch, setMovieSearch] = useState([])
    // console.log(movieSearch);
    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            // console.log(search);
            // const test = data.filter.map((item) => item.toLowerCase().includes(search.toLowerCase()))
            // const numbers = []
            // JSON.parse(numbers.push(data.map((item) => item.title )))
            // console.log(numbers);
            const item = data.map((item) => item.title).filter((el) => el.toLowerCase().includes(search.toLowerCase()))
            // console.log(movieSearch);

            setMovieSearch(prevData => ({
                ...prevData,
                title: item
            }))

        }

    }

    // console.log(movieSearch);
    return (
        <div>
            <div className={`iphone-12-pro-max:flex flex flex-col h-full iphone-12:w-[390px] font-movie  pt-10 px-5 ${themeCtx.theme == 'dark' ? 'bg-dark-bg' : 'bg-[#f5f5f5]'}`}>
                <div className="relative">

                    <Input

                        type="search"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        onKeyDown={handleKeyDown}
                        placeholder="Search"
                        className={`w-full pl-10  border-hidden py-7 ${themeCtx.theme == 'dark' ? "bg-[#1a1414] text-white " : 'bg-[#fafafa]'}`}
                    />
                    <CiSearch
                        size={30}
                        className={`absolute top-3 left-2 ${themeCtx.theme == 'dark' ? "text-white" : 'text-black'}`}
                    />
                    {movieSearch == null ? ("error") : movieSearch.map((item) => (<p>{item.title}</p>))}
                </div>
                <div className=" ">
                    {data.map((item) => (
                        <div key={item.id} className={`flex-shrink-0 w-[calc(100% / 3)] pr-2 mt-10 flex  rounded-3xl p-5 ${themeCtx.theme == 'dark' ? 'bg-btn-dark text-light-bg' : 'bg-white'}`}>
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