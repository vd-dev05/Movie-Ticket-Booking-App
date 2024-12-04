import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { format, startOfMonth, endOfMonth, startOfDay, endOfDay, eachMinuteOfInterval, eachDayOfInterval } from "date-fns";
import { useThemeClasses } from "@/context/Theme/themeStyles";
import axios from "axios";
import BookingController from "@/services/users/booking";
import { useDispatch, useSelector } from "react-redux";
import { SellerBooking } from "@/features/movie/movieThunks";
import { selectMessageSeller, selectSuccessfullSeller, selectSellers, selectIsLoadingSeller } from "@/features/movie/movieSelectors";
import { showErrorToast } from "@/lib/toastUtils";
import queryString from "query-string";


const SelectSeller = () => {
    const { themeUniver, textClasses, buttonClasses } = useThemeClasses();
    const [day, setDay] = useState([]);
    const [hours, setHours] = useState([]);
    const [currDay, setCurrDay] = useState(new Date()); // Assuming currDay is the current date initially
    const [selectedDate, setSelectedDate] = useState(null); // Track selected date
    const [selectedTimeSlot, setSelectedTimeSlot] = useState(null); // Track selected time slot
    const [seller, setSeller] = useState({ label: "CGV" });
    const [DataSeller, setDataSeller] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectSeller, setSelectSeller] = useState(false)

    // redux 
    const message = useSelector(selectMessageSeller)
    const success = useSelector(selectSuccessfullSeller)
    const SellerData = useSelector(selectSellers)
    const isLoadingSellers = useSelector(selectIsLoadingSeller)
    const dispatch = useDispatch()
    
    // Define time slots
    const timeSlots = [
        { label: "9:00 - 12:00", start: "09:00", end: "12:00" },
        { label: "12:00 - 15:00", start: "12:00", end: "15:00" },
        { label: "15:00 - 18:00", start: "15:00", end: "18:00" },
        { label: "18:00 - 21:00", start: "18:00", end: "21:00" },
        { label: "21:00 - 24:00", start: "21:00", end: "24:00" },

    ];
    const dataSeller = [
        { label: "CGV", poster: "https://seeklogo.com/images/C/cj-cgv-logo-D89F116F7C-seeklogo.com.png" },
        { label: "LOTTE", poster: 'https://seeklogo.com/images/L/lotte-chemical-logo-EB0E1C9CE0-seeklogo.com.png' },
        { label: "BETA", poster: 'https://www.betacinemas.vn/Assets/Common/logo/logo.png' },
        { label: "BHD", poster: "	https://bhdstar.vn/wp-content/uploads/2024/09/logo2024.png" },
        { label: "GALAXY", poster: "https://www.galaxycine.vn/_next/static/media/galaxy-logo-mobile.074abeac.png" }
    ]

    const nav = useNavigate()
    const  location = useLocation()
    const querystring = queryString.parseUrl( location.pathname)
    const movieId = querystring.url.split('/')[2]
   
    
    // Handler for date selection
    const handleClickDate = (id) => {
        const updatedDays = day.map(d => {
            if (d.id === id ) {
                return { ...d, clickD: true  }; // Toggle selected state
            }
            return {...d, clickD: false};
            // d.id === id 
            // ? { ...d, clickD: true}
            // : {...d, clickD: false}
        });
   
        
        setDay(updatedDays);
        setSelectedDate(updatedDays.find(d => d.id === id)); // Set the selected date
        console.log(day);
        console.log(selectedDate);
        
        
    };

    // Handler for time slot selection
    const handleClickTimeSlot = (slot) => {
        setSelectedTimeSlot(slot); // Set the selected time slot
    };
    const handleClickSeller = async (slot) => {
        try {

            if (slot.label) {
                setSeller(slot)
                const response = await BookingController.getBookingSeller(slot.label)
                setDataSeller(response)
                setLoading(false)
                // console.log(response);

                // console.log(DataSeller);
            }

        } catch (error) {
            console.log(error);

        }

    }
    const fetchData = async () => {
        try {
            const response = await BookingController.getBookingSeller(seller.label)


            if (response.status === 200) {
                setDataSeller(response)
                setLoading(false)
                console.log(DataSeller);

            }

        } catch (error) {
            console.log(error);

        }
    }
    // Effect to fetch and update days and times
    useEffect(() => {
        const formatW = "EEE";
        const formatD = "dd";
        const F = startOfMonth(currDay);
        const L = endOfMonth(currDay);

        // Generate day slots for the selected month
        const daysInRange = eachDayOfInterval({
            start: F,
            end: L
        }).map((day, idx) => ({
            date: format(day, "yyyy-MM-dd"),
            dayOfWeek: format(day, formatW),
            dayOfMonth: format(day, formatD),
            id: idx + 1,
            clickD: false
        }));
        setDay(daysInRange);

    }, [currDay]);
    useEffect(() => {
        if (DataSeller.length < 0) {
            fetchData()


        }
    }, [DataSeller])
    // console.log(DataSeller);
    // console.log(selectedDate);
    return (
        <div className={`iphone-12-pro-max:flex w-full flex-col min-h-screen ${themeUniver} ${textClasses}`}>
            <div className="pt-10 px-5">
                <div className="flex justify-between items-center">
                    <Link to={`/home`}>
                        <box-icon name="chevron-left" size={"40px"} color={"red"} />
                    </Link>
                    <h1 className="font-logo -translate-x-5">Select Seller</h1>
                    <div></div>
                </div>
            </div>

            <div>
                <img
                    className="rounded-lg w-full h-40"
                    src="https://img.freepik.com/premium-vector/black-friday-sale-voucher-layout-design-advertising-poster-voucher-ticket-vector-illustration_436759-291.jpg?w=996"
                    alt="Voucher"
                />
                <hr className="my-2" />
                <div>
                    <h2 className="text-center">Select Date :  {selectedDate && (
                        selectedDate.dayOfMonth
                    )}</h2>

                    {/* Day picker */}
                    <ul className="p-4 w-full flex">
                        <Swiper spaceBetween={20} slidesPerView={5}>
                            {day.length > 0 ? (
                                day.map((item) => (
                                    <SwiperSlide key={item.id}>
                                        <div
                                            onClick={() => handleClickDate(item.id)}
                                            className={`${item.clickD === true  ? "bg-chairMovie-chairSelected text-white" : "bg-[#eeeeee] text-black"
                                                } cursor-pointer rounded-lg font-bold text-center p-3`}
                                        >
                                            <p>{item.dayOfWeek}</p>
                                            <span className="font-bold">{item.dayOfMonth}</span>
                                        </div>
                                    </SwiperSlide>
                                ))
                            ) : (
                                <div className="p-3 bg-[#eeeeee] rounded-lg mx-2 text-black">
                                    <p>No available dates</p>
                                </div>
                            )}
                        </Swiper>
                    </ul>
                </div>
                {/* hour picker */}
                <div className="" >
                    <ul className="flex w-full ">
                        <Swiper spaceBetween={20} slidesPerView={4}>
                            {timeSlots.map((slot, idx) => (
                                <SwiperSlide key={idx} >
                                    <div

                                        onClick={() => handleClickTimeSlot(slot)}
                                        className={`${selectedTimeSlot?.label === slot.label
                                            ? "bg-chairMovie-chairSelected text-white"
                                            : "bg-[#eeeeee] text-black"
                                            } cursor-pointer rounded-lg p-4 w-fit text-nowrap  font-semibold`}
                                    >
                                        {slot.label}
                                    </div>
                                </SwiperSlide>

                            ))}
                        </Swiper>
                    </ul>
                </div>
                <div >
                    <ul className={`flex w-full ${buttonClasses} `}>
                        <Swiper spaceBetween={20} slidesPerView={3}>
                            {dataSeller.map((slot, idx) => (
                                <SwiperSlide key={idx} >
                                    <div
                                        onClick={() => handleClickSeller(slot)}
                                        className="flex flex-col items-center p-5 drop-shadow-2xl"
                                    >
                                        <div


                                            className={`${seller?.label === slot.label
                                                ? "border-chairMovie-chairSelected border-[3px] bg-white text-white"
                                                : "bg-white text-black"
                                                } cursor-pointer rounded-lg p-2 w-[100px] flex justify-center items-center h-[100px] text-nowrap  font-semibold`}
                                        >
                                            <img src={slot.poster} className="object-cover" alt="" />
                                        </div>
                                        <p className={`${seller?.label === slot.label

                                            ? "text-primary-textMovie"
                                            : { textClasses }
                                            } font-semibold mt-2`}>

                                            {slot.label}</p>

                                    </div>

                                </SwiperSlide>

                            ))}
                        </Swiper>
                    </ul>
                </div>
                {/* Seller data  */}
                {DataSeller && seller && !loading ? (
                    <div>
                        <h2 className=" px-5 my-10">{seller.label} ({DataSeller.filter((item) => item.type === seller.label  && item.movieId ===  movieId ).length})</h2>
                        <div className="px-5">
                            <div>
                                {DataSeller.filter((item) => item.type === seller.label && item.movieId ===  movieId ).map((item) => (

                                    <div key={item._id} className="flex flex-col gap-2 w-full">
                                        <div className="flex justify-between">
                                            <div className="flex items-start justify-start gap-2 ">
                                                <div className="bg-white p2 w-[50px] h-[60px]">
                                                    <img src={item.sellerLogo} alt="logoSeller" className="rounded-lg object-cover " />
                                                </div>
                                                <div>
                                                    <h3 className="font-semibold">{item.sellerNameSeller}</h3>
                                                    <p className="text-slate-500">Quận {item?.sellerAddressManager.split(', ')[4]}</p>
                                                </div>
                                            </div>
                                            <button onClick={() => setSelectSeller(!selectSeller)}>^</button>

                                        </div>
                                        {selectSeller ? (
                                            <div >
                                                <p className="font-mono">4k video</p>
                                                <div className=" grid grid-cols-3  gap-2">
                                                    {item.events.filter((item) => item.startTime ).map((event, idx) => (
                                                        <button

                                                            key={idx}
                                                            onClick={() => {
                                                                const a = (day.filter((item) => item.clickD === true))
                                                                if (a.length === 0) {
                                                                    showErrorToast("Please select")

                                                                } else {
                                                                    nav(`${item.sellerId}/${item.sellerNameSeller}/${event.startTime}-${event.endTime}/${item.price}/${a[0].date}/booking`)
                                                                }
                                                            }}
                                                            className="p-2 w-[150px] bg-white drop-shadow-md rounded-lg text-center text-black">
                                                            <span className="font-semibold">{event.startTime} - {event.endTime}</span>
                                                        </button>
                                                    ))}

                                                </div>


                                            </div>
                                        ) : null}
                                        <hr className="p-10" />
                                    </div>
                                ))}
                            </div>
                     
                        </div>

                    </div>
                ) : null}


            </div>
        </div>
    );
};

export default SelectSeller;
