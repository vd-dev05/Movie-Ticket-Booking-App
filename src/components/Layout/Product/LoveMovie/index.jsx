// import { Iron } from "@mui/icons-material";
import { Movie, truncateText,convertMinutesToHhMm } from "../GetApi/GetApi";
import { useEffect, useState } from "react";
import { Link  } from "react-router-dom";
import Nav from "../../Nav";
const LoveMovie = () => {
    const [data, setData] = useState([])
    useEffect(() => {
        const fetchData = async () => {
            const r = await Movie()
            setData(r)
        }

        fetchData()
    }, [])

    // console.log(data);


    // const test = data.Search
    // console.log(test);
    return (
        <div>
            <div className="iphone-12-pro-max:flex flex flex-col h-[100vh] iphone-12:w-[390px] font-movie px-5  ">
                <div className="translate-y-9">
                    <Link to="/home">
                        <box-icon name='chevron-left' size={"40px"}> </box-icon>
                    </Link>

                </div>
                <h1 className="text-center font-logo">Favourite Movies</h1>
                <div className="grid grid-cols-2 gap-5 mt-10 ">

                    {data.map((item) => (

                        <div key={item.id} >
                            <Link to="/itemlove"  state={{ data: item }} className="text-black ">
                                <div className=" saturate-100" >
                                    <img src={item.poster} alt={item.title} loading="lazy" className="rounded-2xl  h-[210px] w-[200px]  bg-cover  object-cover"></img>
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
     
            <div>
                <Nav data={"love"}></Nav>
            </div>
        </div>
    );
}

export default LoveMovie;