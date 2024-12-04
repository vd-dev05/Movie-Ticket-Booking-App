import { useEffect, useState } from "react";
import { dataMovie, Movie, truncateText } from "../../../hooks/GetApi/GetApi";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useThemeClasses } from "../../../context/Theme/themeStyles";
const Cancelled = (props) => {
    const [data, setMovieData] = useState(props.data || [])
    const { btnSubmit, buttonClasses } = useThemeClasses()
    useEffect(() => {
        // (async () => {
        //     try {
        //         const data = await dataMovie('users/dataTicket/book');
        //         const dataTic = data.filter((item => item.paid == false))

        //         setMovieData(dataTic)

        //     } catch (err) {
        //         console.error(err);

        //     } finally {

        //     }
        // }
        // )()
    }, []);


    return (
        <div className="translate-y-7  font-movie min-h-screen  drop-shadow-lg ">
            {data.length === 0 &&
                <div className={`flex-shrink-0 w- pr-2 mt-10 flex    rounded-3xl p-5 ${buttonClasses}`}>
                    <div className="animate-pulse flex space-x-4">
                        <div className="rounded-xl bg-slate-700 h-[100px] w-[100px]"></div>
                        <div className="flex-1 space-y-6 py-1">
                            {/* <div className="h-2 bg-slate-700 rounded w-[200px]"></div> */}
                            <div className="space-y-10">
                                No Data Ticket . Please Book Ticket Movie
                            </div>
                        </div>
                    </div>
                </div>
            }
            {data.map((itenm) => (
                <div className={` mt-5 flex flex-col rounded-lg  ${buttonClasses}  `} key={itenm._id} >
                    <div className=" flex justify-between p-2 ">
                        <div className="flex ">
                            <img src={itenm.movieId.poster}  loading="lazy" alt={itenm.movieId.poster} className="w-[120px] h-[100px] rounded-lg object-cover outline-none " />
                            <div>
                                <div className="pl-5 flex flex-col h-full justify-around">
                                    <h2 className="font-movie font-bold">{itenm.movieId.title ? truncateText(itenm.movieId.title, 15) : ''}</h2>
                                    <p className="text-gray-400 text-[11px]  text-nowrap">
                                        {itenm.movieId.tomatoes && itenm.movieId.tomatoes.production ? itenm.movieId.tomatoes.production : 'Production not found'}
                                    </p>
                                    <p className="text-[11px] ">Language: {itenm.movieId.languages  ? (itenm.movieId.languages).join(' ,') : ''}</p>
                                </div>
                            </div>
                        </div>

                        <div className="bg-[#f5f3f3] h-8 w-14 flex justify-center items-center mt-12 rounded-md">
                            <Link className="text-black">
                                <Button

                                > Paid</Button>
                            </Link>

                        </div>
                    </div>
                    <div className="p-2 flex gap-2">
                        <Link className=" border-1 w-full text-inherit">
                            <Button
                                className="border-gray-300  w-full"
                            >View Details</Button>
                        </Link>



                    </div>


                </div>
            ))}
        </div>
    );
}

export default Cancelled;