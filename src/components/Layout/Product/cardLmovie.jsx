// import { Iron } from "@mui/icons-material";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
const LatestMovie = () => {
    const [data, setData] = useState([])
    useEffect(() => {
        const fetchData = async () => {
            const r = await axios.get('api/searchMovie.json')
            setData(r.data)
        }

        fetchData()
    }, [])

    // console.log(data);

    const truncateText = (text, length) => {
        if (text.length > length) {
            return text.substring(0, length) + '...';
        }
        return text;
    };
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
                <h1 className="text-center font-logo">Latest Movies</h1>
                <div className="grid grid-cols-2 gap-5 mt-10 ">

                    {data.map((item) => (
                        <div key={item.id} >
                            <Link to="/item"  state={{ item }} className="text-black">
                                <div className=" saturate-200   ">
                                    <img src={item.poster} alt={item.Title} loading="lazy" className="rounded-2xl  h-[210px] w-[200px]  bg-cover "></img>
                                </div>
                                <div className="mt-2">
                                    <h2 className="font-[700]">{truncateText(item.Title, 15)}</h2>
                                    {/* {truncateText(item.author, 39)} */}
                                    <p className="text-gray-400 text-xs">{item.Type}</p>
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