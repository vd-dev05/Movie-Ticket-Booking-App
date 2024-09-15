// import { Iron } from "@mui/icons-material";
import { Movie, truncateText,convertMinutesToHhMm, dataMovie } from "../GetApi/GetApi";
import { useEffect, useState } from "react";
import { Link  } from "react-router-dom";
import Nav from "../../Nav";
import { useTheme } from "../../Theme";
import { useThemeClasses } from "../../Theme/themeStyles";
const LoveMovie = () => {
    const themeCtx = useTheme()
    const {textClasses,themeUniver} = useThemeClasses()
    const [data, setData] = useState([])
    const [isLoading,setisLoading] = useState(false)
    useEffect(() => {
        // const fetchMovies = async () => {
        //     try {
        //         const data = await dataMovie('data/movies'); 
        //         if (data) {
        //         //    console.log(data);
        //         setData(data);
        //         setisLoading(true)
        //         }
        //     } catch (err) {
        //         console.error(err);
        //     } finally {
        //         setisLoading(false);
        //     }
        // };

        // fetchMovies();
        (async () => {
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
            } }
        )()
    }, [])
    if (isLoading) {
        return <div>Loading...</div>
    }
    // console.log(data);


    // const test = data.Search
    // console.log(test);
    return (
        <div >
            <div className={`iphone-12-pro-max:flex flex flex-col min-h-screen font-movie px-5 pt-10 pb-20 ${themeUniver} `}>
             
                <h1 className="text-center font-logo">Favourite Movies</h1>
                <div className="grid grid-cols-2 gap-10 mt-10    ">

                    {data.map((item) => (

                        <div key={item.id} >
                            <Link to="/itemlove"  state={{ data: item }} className={`${textClasses} hover:${textClasses}`}>
                                <div className=" saturate-100" >
                                    <img src={item.poster} alt={item.title} loading="lazy" className="rounded-2xl  h-[210px] w-full  bg-cover  object-cover"></img>
                                </div>
                                <div className="mt-2">
                                    <h2 className="font-[700] ">{truncateText(item.title, 15)}</h2>
                                    {/* {truncateText(item.author, 39)} */}
                                    <p className="text-gray-400 text-xs">{(item.type).join(",")}</p>
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