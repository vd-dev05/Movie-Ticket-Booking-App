// import { Iron } from "@mui/icons-material";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { dataMovie, Movie,truncateText } from "../GetApi/GetApi";
import { useTheme } from "../../Theme";
import { useItem } from "../GetApi/ItemContext";
const LatestMovie = () => {
    const themeCtx = useTheme()
    const { item,setItem } = useItem();
    const [data, setData] = useState([])
    const [isLoading,setisLoading] = useState(true)
    useEffect(() => {
        const fetchMovies = async () => {
            try {
                const data = await dataMovie('data/movies'); 
                if (data) {

                setData(data)
                setisLoading(true)
                }
            } catch (err) {
                console.error(err);
            } finally {
                setisLoading(false);
            }
        };

        fetchMovies();
    }, [])

    const test = data.map((item) => item.id)
    const handleClick = (item) => {
        setItem(item)
    }
    if (isLoading) {
        return <>
            <div>
                Loading...
            </div>
        </>
    }
    // console.log(item);
    
    return (
        <div>
            <div className={`iphone-12-pro-max:flex flex flex-col h-full min-w-max font-movie px-5 ${themeCtx.theme == 'dark' ? 'bg-dark-bg  ': null} `}>
                <div className="translate-y-9">
                    <Link to="/home">
                        <box-icon name='chevron-left' size={"40px"}  color={themeCtx.theme == 'dark' ? 'white' : 'black'}> </box-icon>
                    </Link>

                </div>
                <h1 className={` text-center font-logo ${themeCtx.theme == 'dark' ? 'text-light-bg ': 'text-black'}`}>Latest Movies</h1>
                <div className="grid grid-cols-2 gap-5 mt-10 ">

                    {data.map((item) => (
                        <div key={item.id} >
                            <Link  to={'/item'}  state={{ item ,test}} className={`${themeCtx.theme == 'dark' ? 'text-light-bg ': 'text-black'}`} >
                                <div className=" saturate-100  " onClick={() =>handleClick(item)}>
                                    <img src={item.poster} alt={item.title} loading="lazy" className="rounded-2xl  h-[210px] w-full object-cover"></img>
                                </div>
                                <div className="mt-2">
                                    <h2 className="font-[700]">{truncateText(item.title, 15)}</h2>
                                    {/* {truncateText(item.author, 39)} */}
                                    <p className="text-gray-400 text-xs">{item.type}</p>
                                </div>
                            </Link>



                        </div>
                    ))}



                </div>

            </div>

        </div>
    );
}

export default LatestMovie;