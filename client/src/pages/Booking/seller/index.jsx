import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { format, startOfMonth, endOfMonth, startOfDay, endOfDay, eachMinuteOfInterval, eachDayOfInterval } from "date-fns";
import { useThemeClasses } from "@/context/Theme/themeStyles";

const SelectSeller = () => {
    const { themeUniver, textClasses } = useThemeClasses();
    const [day, setDay] = useState([]);
    const [hours, setHours] = useState([]);
    const [currDay, setCurrDay] = useState(new Date()); // Assuming currDay is the current date initially
    const [selectedDate, setSelectedDate] = useState(null); // Track selected date
    const [selectedTimeSlot, setSelectedTimeSlot] = useState(null); // Track selected time slot

    // Define time slots
    const timeSlots = [
        { label: "9:00 - 12:00", start: "09:00", end: "12:00" },
        { label: "12:00 - 15:00", start: "12:00", end: "15:00" },
        { label: "15:00 - 18:00", start: "15:00", end: "18:00" },
        { label: "18:00 - 21:00", start: "18:00", end: "21:00" },
    ];

    // Handler for date selection
    const handleClickDate = (id) => {
        const updatedDays = day.map(d => {
            if (d.id === id) {
                return { ...d, clickD: !d.clickD }; // Toggle selected state
            }
            return d;
        });
        setDay(updatedDays);
        setSelectedDate(updatedDays.find(d => d.id === id)); // Set the selected date
    };

    // Handler for time slot selection
    const handleClickTimeSlot = (slot) => {
        setSelectedTimeSlot(slot); // Set the selected time slot
    };

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
                    className="rounded-lg w-full"
                    src="https://img.freepik.com/premium-vector/black-friday-sale-voucher-layout-design-advertising-poster-voucher-ticket-vector-illustration_436759-291.jpg?w=996"
                    alt="Voucher"
                />
                <hr className="my-2" />
                <div>
                    <h2 className="text-center">Select Date</h2>

                    {/* Day picker */}
                    <ul className="p-4 w-full flex">
                        <Swiper spaceBetween={20} slidesPerView={5}>
                            {day.length > 0 ? (
                                day.map((item) => (
                                    <SwiperSlide key={item.id}>
                                        <div
                                            onClick={() => handleClickDate(item.id)}
                                            className={`${
                                                item.clickD ? "bg-blue-500 text-white" : "bg-[#eeeeee] text-black"
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

                {selectedDate && (
                    <div className="mt-5">
                        <h2 className="text-center">Select Time Slot for {selectedDate.dayOfMonth}</h2>
                        <div className="grid grid-cols-2 gap-4 mt-4">
                            {timeSlots.map((slot, idx) => (
                                <div
                                    key={idx}
                                    onClick={() => handleClickTimeSlot(slot)}
                                    className={`${
                                        selectedTimeSlot?.label === slot.label
                                            ? "bg-green-500 text-white"
                                            : "bg-[#eeeeee] text-black"
                                    } cursor-pointer rounded-lg p-4 text-center font-semibold`}
                                >
                                    {slot.label}
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default SelectSeller;
