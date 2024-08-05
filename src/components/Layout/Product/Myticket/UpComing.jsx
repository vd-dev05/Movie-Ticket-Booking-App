import { useEffect, useState } from "react";
import { Movie, truncateText } from "../GetApi/GetApi";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import CancelTicket from "./accept/Bookingnot"
const Upcoming = () => {
    const [data, setMovieData] = useState([])

    useEffect(() => {
        const getMovies = async () => {
            try {
                const data = await Movie();
                setMovieData(data);
                // console.log(data);
            } catch {
                console.log("error");
            }
        };

        getMovies();
    }, []);

    const [data1, setMovieData1] = useState([])
   
    const clickme = (id) => {
        setMovieData1(id)
    }
    return (
        <div className="translate-y-7drop-shadow-2xl  font-movie  drop-shadow-lg">
            {data.map((itenm) => (
                <div className="mt-5 flex flex-col rounded-lg bg-gray-50 " key={itenm.id}>
                    <div className=" flex justify-between p-2 ">
                        <div className="flex ">
                            <img src={itenm.poster} alt="" className="w-[120px] h-[100px] rounded-lg object-cover " />
                            <div>
                                <div className="pl-5 flex flex-col h-full justify-around">
                                    <h2 className="font-movie font-bold text-sm">{truncateText(itenm.title, 15)}</h2>
                                    <p className="text-gray-500 text-[11px]  text-nowrap">{itenm.theFirm}</p>
                                    <p className="text-[11px] ">Language: {itenm.language}</p>
                                </div>
                            </div>
                        </div>

                        <div className="bg-[#fff0ef] h-8 w-14 flex justify-center items-center mt-12 rounded-md">
                            <Link className="text-chairMovie-chairSelected">
                                <Button

                                > Paid</Button>
                            </Link>

                        </div>
                    </div>
                    <div className="p-2 flex gap-2">

                    <div
                                key={itenm.id}
                                onClick={() => clickme(itenm)
                                
                                }
                                    className="  text-black border-[1px] border-gray-500 flex justify-center items-center w-full h-10 text-nowrap rounded-lg "
                                ><CancelTicket data={data1} text="Cancell Booking"  key={itenm.id} ></CancelTicket></div>

                   
                            <Button
                                className=" bg-chairMovie-chairSelected text-white w-full group-hover:opacity-1 "
                            >View Ticket</Button>
               


                    </div>


                </div>
            ))}
        </div>
    );
}

export default Upcoming;