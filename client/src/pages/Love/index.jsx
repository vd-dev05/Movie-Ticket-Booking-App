// import { Iron } from "@mui/icons-material";
import { Movie, truncateText, convertMinutesToHhMm, dataMovie } from "@/hooks/GetApi/GetApi";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Nav from "@/layout/Nav/index";
import { useTheme } from "@/context/Theme/index";
import { useThemeClasses } from "@/context/Theme/themeStyles";
import {v4} from 'uuid'
import UserHistory from "@/services/users/history";
const LoveMovie = () => {
    const themeCtx = useTheme()
    const { textClasses, themeUniver, buttonClasses } = useThemeClasses()
    const [data, setData] = useState([])
    const [isLoading ,setLoading] = useState(false)
   
    useEffect(() => {
        (async () => {
            setLoading(false)
            try {
                const response = await UserHistory.getLoveMovie()
                if (response) {
                    setData(response.data)
                    setLoading(true)
                }

            } catch (err) {
               setLoading(false)
               if (localStorage.setItem('access_token')) {
                 alert('Bạn chưa đăng nhập')
                 localStorage.removeItem('access_token')
                 localStorage.removeItem('account-info')
                 window.location.href = '/login'
  
               }
            } finally {
              setLoading(false)
            }
        }
        )()
    }, [])

    if (isLoading) {
        return (
                <div className="text-center">
                    <p>Loading your favorite movies...</p>
                </div>
        );
    }

 
    return (
        <div >
            <div className={`iphone-12-pro-max:flex flex flex-col min-h-screen font-movie px-5 pt-10 pb-20 ${themeUniver} `}>

                <h1 className="text-center font-logo">Favourite Movies</h1>
                <div className="grid grid-cols-2 gap-10 mt-10    ">

                    {data.length > 0 ? data.map((item) => (

                        <div key={item.id} >
                            <Link to={`/details/${item._id}`} state={{ data: item }} className={``}>
                                <div className=" saturate-100" >
                                    <img src={item.poster} alt={item.title} className="rounded-2xl  h-[350px] w-full  bg-cover  object-cover"></img>
                                </div>
                                <div className="mt-2">
                                    <h2 className={`font-[700] ${textClasses} hover:${textClasses} `}>{truncateText(item.title, 20)}</h2>
                                    {/* {truncateText(item.author, 39)} */}
                                    <p className="text-gray-400 text-xs">{item.tomatoes && item.tomatoes.production ? item.tomatoes.production : 'hang phim ko ton tai' }</p>
                                </div>
                            </Link>

                        </div>

                    )) : <div className={`flex-shrink-0 w- pr-2 mt-10 flex  rounded-3xl p-5 ${buttonClasses}`}>
                        <div className="animate-pulse flex space-x-4">
                            <div class="rounded-xl bg-slate-700 h-[100px] w-[100px]"></div>
                            <div class="flex-1 space-y-6 py-1"> 
                            No favorites here.
                                {/* <div class="h-2 bg-slate-700 rounded w-[200px]"></div> */}
                                <div class="space-y-10">
                                Please add your favorite movies
                                    <div class="grid grid-cols-3 gap-4">
                                        
                                        {/* <div class="h-2 bg-slate-700 rounded col-span-2"></div>
                                        <div class="h-2 bg-slate-700 rounded col-span-1"></div> */}
                                    </div>
                                    {/* <div class="h-2 bg-slate-700 rounded"></div> */}
                                </div>
                            </div>
                        </div>
                    </div>}



                </div>

            </div>

            <div>
                <Nav data={"love"}></Nav>
            </div>
        </div>
    );
}

export default LoveMovie;