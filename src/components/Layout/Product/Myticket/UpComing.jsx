import { useEffect, useState, useMemo } from "react";
import { dataMovie } from "../GetApi/GetApi";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import CancelTicket from "./accept/Bookingnot";
import { useThemeClasses } from "../../Theme/themeStyles";
import { useTheme } from "../../Theme";
import { truncateText } from "../GetApi/GetApi";

const Upcoming = () => {
    const [data, setMovieData] = useState([]);
    const [data1, setMovieData1] = useState([]);

    const { inputClasses, backGround, textClasses,themePaid,buttonClasses,btnSubmit } = useThemeClasses();
    const themeCtx = useTheme();
    useEffect(() => {
        (async () => {
            try {
                const data = await dataMovie('data/movies'); 
                if (data) {

                setMovieData(data)
                }
            } catch (err) {
                console.error(err);
            } finally {
            } }
        )()
    }, []);

   
    const processedData = useMemo(() => {
        return data.map(item => ({
            ...item,
            truncatedTitle: truncateText(item.title, 15)
        }));
    }, [data]);

    const clickme = (id) => {
        setMovieData1(id);
    };

    return (
        <div className="translate-y-7 font-movie drop-shadow-lg pb-[50px]">
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
                                loading="lazy" // Lazy loading for images
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
                            <CancelTicket data={data1} text="Cancel Booking" />
                        </div>
                        <div className={`${btnSubmit}  rounded-lg drop-shadow-xl  w-full group-hover:opacity-1 flex justify-center items-center`}>
                        <Link  
                            className={` text-white hover:text-white  `} 
                            to={'/qrcode'}
                        >
                            View Ticket
                        </Link>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default Upcoming;
