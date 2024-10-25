import { useEffect, useState } from "react";
import { dataMovie, Movie, truncateText } from "../../../../hooks/GetApi/GetApi";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useThemeClasses } from "../../../../context/Theme/themeStyles";
const Cancelled = () => {
    const [data, setMovieData] = useState([])
    const {btnSubmit,buttonClasses} = useThemeClasses()
    useEffect(() => {
        (async () => {
            try {
                const data = await dataMovie('users/dataTicket/book');
                const dataTic = data.filter((item => item.paid == false))

                setMovieData(dataTic)

            } catch (err) {
                console.error(err);

            } finally {

            }
        }
        )()
    }, []);
   

    return (
        <div className="translate-y-7drop-shadow-2xl  font-movie h-screen  drop-shadow-lg">
                {data.length === 0 &&
                <div class={`flex-shrink-0 w- pr-2 mt-10 flex    rounded-3xl p-5 ${buttonClasses}`}>
                    <div class="animate-pulse flex space-x-4">
                        <div class="rounded-xl bg-slate-700 h-[100px] w-[100px]"></div>
                        <div class="flex-1 space-y-6 py-1">
                            {/* <div class="h-2 bg-slate-700 rounded w-[200px]"></div> */}
                            <div class="space-y-10">
                                No Data Ticket . Please Book Ticket Movie
                            </div>
                        </div>
                    </div>
                </div>
            }
            { data.map((itenm) => (
                <div className={` mt-5 flex flex-col rounded-lg  ${buttonClasses}  `} key={itenm.id} >
                    <div className=" flex justify-between p-2 ">
                        <div className="flex ">
                            <img src={itenm.poster} alt="" className="w-[120px] h-[100px] rounded-lg object-cover " />
                            <div>
                                <div className="pl-5 flex flex-col h-full justify-around">
                                    <h2 className="font-movie font-bold">{truncateText(itenm.title, 15)}</h2>
                                    <p className="text-gray-400 text-[11px]  text-nowrap">{itenm.theFirm}</p>
                                    <p className="text-[11px] ">Language: {itenm.language}</p>
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