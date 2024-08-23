// import { Iron } from "@mui/icons-material";
import { Movie, truncateText,convertMinutesToHhMm, dataMovie } from "../GetApi/GetApi";
import { useEffect, useState } from "react";
import { Link  } from "react-router-dom";
import Nav from "../../Nav";
import { useTheme } from "../../Theme";
const LoveMovie = () => {
    const themeCtx = useTheme()
    const [data, setData] = useState([])
    const [isLoading,setisLoading] = useState(false)
    useEffect(() => {
        const fetchMovies = async () => {
            try {
                const data = await dataMovie('data/movies'); 
                if (data) {
                //    console.log(data);
                setData(data);
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
    if (isLoading) {
        return <div>Loading...</div>
    }
    // console.log(data);


    // const test = data.Search
    // console.log(test);
    return (
        <div >
            <div className={`iphone-12-pro-max:flex flex flex-col min-h-screen font-movie px-5 ${themeCtx.theme == 'dark' ? 'bg-dark-bg text-dark-text': null} `}>
                <div className="translate-y-9">
                    <Link to="/home">
                        <box-icon name='chevron-left' size={"40px"} color={` ${themeCtx.theme == 'dark' ? 'white':'black'}`}> </box-icon>
                    </Link>

                </div>
                <h1 className="text-center font-logo">Favourite Movies</h1>
                <div className="grid grid-cols-2 gap-10 mt-10    ">

                    {data.map((item) => (

                        <div key={item.id} >
                            <Link to="/itemlove"  state={{ data: item }} className={`text-black  ${themeCtx.theme == 'dark' ? 'text-dark-text':'text-btn-dark'}`}>
                                <div className=" saturate-100" >
                                    <img src={item.poster} alt={item.title} loading="lazy" className="rounded-2xl  h-[210px] w-full  bg-cover  object-cover"></img>
                                </div>
                                <div className="mt-2">
                                    <h2 className="font-[700] ">{truncateText(item.title, 15)}</h2>
                                    {/* {truncateText(item.author, 39)} */}
                                    <p className="text-gray-400 text-xs">{item.type}</p>
                                </div>
                            </Link>

                        </div>

                    ))}



                </div>

            </div>
     
            <div>
                <Nav data={"love"}></Nav>
            </div>
        </div>
    );
}

export default LoveMovie;