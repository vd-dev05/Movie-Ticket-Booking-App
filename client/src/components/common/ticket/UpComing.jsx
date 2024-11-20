import { useEffect, useState, useMemo } from "react";
import { dataMovie } from "../../../hooks/GetApi/GetApi";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import CancelTicket from "../../Layout/Product/Myticket/accept/Bookingnot";
import { useThemeClasses } from "../../../context/Theme/themeStyles";
import { useTheme } from "../../../context/Theme";
import { truncateText } from "../../../hooks/GetApi/GetApi";
import { toast } from "react-toastify";

const Upcoming = () => {
    const [data, setMovieData] = useState([]);
    const [data1, setMovieData1] = useState([]);
    const [isOpen,setIsOpen] = useState(false)
    const [dataLoad,setDataLoad] = useState(false)
    const { inputClasses, backGround, textClasses, themePaid, buttonClasses, btnSubmit } = useThemeClasses();
    const themeCtx = useTheme();
    useEffect(() => {
        (async () => {
            try {
                const data = await dataMovie('users/dataTicket/book');
                const dataTic = data.filter((item => item.paid == true))

                setMovieData(dataTic)

            } catch (err) {
                console.error(err);

            } finally {

            }
        }
        )()
    }, [dataLoad]);

    const processedData = useMemo(() => {
        return data.map(item => ({
            ...item,
            truncatedTitle: truncateText(item.title, 15)
        }));
    }, [data]);

    const clickme = (id) => {
        setIsOpen(!isOpen)
        setMovieData1(id.id);
       
        toast.success('Cancel SuccessFull !')
        console.log(dataLoad);
        
    };
    // if (data.length === 0) {
    //     return <div> <div class={`flex-shrink-0 w- pr-2 mt-10 flex    rounded-3xl p-5 ${buttonClasses}`}>
    //     <div class="animate-pulse flex space-x-4">
    //         <div class="rounded-xl bg-slate-700 h-[100px] w-[100px]"></div>
    //         <div class="flex-1 space-y-6 py-1">
    //             <div class="h-2 bg-slate-700 rounded w-[200px]"></div>
    //             <div class="space-y-10">
    //                 <div class="grid grid-cols-3 gap-4">
    //                     <div class="h-2 bg-slate-700 rounded col-span-2"></div>
    //                     <div class="h-2 bg-slate-700 rounded col-span-1"></div>
    //                 </div>
    //                 <div class="h-2 bg-slate-700 rounded"></div>
    //             </div>
    //         </div>
    //     </div>
    // </div></div>
    // }
    return (
        <div className="translate-y-7 font-movie drop-shadow-lg h-screen pb-[50px]">
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
            {processedData.map((item) => (
                <div
                    className={`mt-5 flex flex-col rounded-lg ${buttonClasses}`}
                    key={item.id}
                >
                    <div className="flex justify-between p-2">
                        <div className="flex">
                            <img
                                src={item.poster}
                                alt=""
                                loading="lazy"
                                className="w-[120px] h-[100px] rounded-lg object-cover"
                            />
                            <div>
                                <div className="pl-5 flex flex-col h-full justify-around">
                                    <h2 className="font-movie font-bold text-sm">
                                        {item.truncatedTitle}
                                    </h2>
                                    <p className="text-gray-400  text-[11px] text-nowrap">
                                        {item.theFirm}
                                    </p>
                                    <p className="text-[11px]">
                                        Language: {item.language}
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div
                            className={`h-8 w-14 flex justify-center items-center mt-12 rounded-md ${themePaid}`}
                        >
                            <Link className={`text-chairMovie-chairSelected hover:text-primary-textMovie `}>
                                <Button>Paid</Button>
                            </Link>
                        </div>
                    </div>
                    <div className="p-2 flex gap-2">
                        <div
                            key={item.id}
                            onClick={() => clickme(item)}
                            className={`border-gray-500 ${textClasses} border-[1px] flex justify-center items-center w-full h-10 text-nowrap rounded-lg`}
                        >
                           Cancel Booking
                        </div>
                        <div className={`${btnSubmit}  rounded-lg drop-shadow-xl  w-full group-hover:opacity-1 flex justify-center items-center`}>
                            <Link
                                className={` text-white hover:text-white  `}
                                to={'/qrcode'}
                                onClick={() => localStorage.setItem('pay', item.id)}
                            >
                                View Ticket
                            </Link>
                        </div>
                    </div>
                    <CancelTicket data={data1}  isOpen={isOpen} setIsOpen={setIsOpen} setDataLoad={setDataLoad} dataLoad={dataLoad}/>
                </div>
                
            ))
            }

        </div>
    );
}

export default Upcoming;
