import { Link } from "react-router-dom";
import React, { useState } from 'react';
import { MdChair } from "react-icons/md";
import { Button } from "@/components/ui/button";
import { useLocation } from 'react-router-dom';

const generateSeats = (count) =>
    Array.from({ length: count }, (_, i) => ({
        id: `s${i + 1}`,
        booked: Math.random() < 0.5,
        selected: false,
        total: 0,
    }));

// Component SeatList
const SeatList = ({ count, onSeatsUpdate }) => {
    const [seats, setSeats] = useState(generateSeats(count));
    const price = 77675;

    const colors = {
        chairSelected: '#ff515a',
        chairAvailable: '#eeeced',
        chairBooked: 'hsl(12, 3%, 72%)',
    };

    // Hàm xử lý sự kiện khi nhấp vào ghế
    const handleSeatClick = (id) => {
        const updatedSeats = seats.map((seat) =>
            seat.id === id
                ? { ...seat, selected: !seat.selected, total: seat.selected ? 0 : price }
                : { ...seat, selected: false }
        );
        setSeats(updatedSeats);
        onSeatsUpdate(updatedSeats);
    };

    return (
        <div className="flex flex-col">
            {seats.map((seat) => (
                <MdChair
                    key={seat.id}
                    id={seat.id}
                    size={37}
                    className={`cursor-pointer ${seat.selected ? 'text-chairSelected' : seat.booked ? 'text-chairBooked' : 'text-chairAvailable'}`}
                    onClick={() => handleSeatClick(seat.id)}
                    style={{ color: seat.selected ? colors.chairSelected : seat.booked ? colors.chairBooked : colors.chairAvailable }}
                />
            ))}
        </div>
    );
};

const Select = () => {
    const [seatss, setSeatss] = useState([]);

    // Hàm xử lý cập nhật dữ liệu ghế từ SeatList
    const handleSeatsUpdate = (updatedSeats) => {
        setSeatss(updatedSeats);
    };
    const location = useLocation();
    const { item } = location.state || {};

    return (

        <div className="iphone-12-pro-max:flex flex flex-col h-[100vh] iphone-12:w-[390px] font-movie  ">

            <div className="px-5">
                <div className="translate-y-9">
                    <Link to="/lmovie">
                        <box-icon name='chevron-left' size={"40px"}> </box-icon>
                    </Link>

                </div>
                <h1 className='text-center font-logo'>Select Seats</h1>
                <div className="mt-20">
                    <div className='mt-10 p-2'>
                        <div className="flex">
                            <div className='flex mr-5'>
                                <div className='p-2 mt-5'>
                                    <SeatList count={5} onSeatsUpdate={handleSeatsUpdate} />
                                </div>

                                <div className='flex'>
                                    <SeatList count={7} onSeatsUpdate={handleSeatsUpdate} />
                                    <SeatList count={7} onSeatsUpdate={handleSeatsUpdate} />
                                    <SeatList count={7} onSeatsUpdate={handleSeatsUpdate} />
                                </div>
                            </div>

                            <div className='flex'>
                                <div className='flex'>
                                    <SeatList count={7} />
                                    <SeatList count={7} />
                                    <SeatList count={7} />
                                </div>
                                <div className='p-2 mt-5'>
                                    <SeatList count={5} />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='flex  justify-around'>
                        <div className='flex p-2' >
                            <div className='pr-2'>
                                <MdChair
                                    className='text-primary-textMovie'
                                ></MdChair>
                            </div>
                            <p>Selected</p>
                        </div>
                        <div className='flex p-2' >
                            <div className='pr-2'>
                                <MdChair
                                    className='text-chairMovie-chairBooked'
                                ></MdChair>
                            </div>
                            <p>Booked</p>
                        </div>
                        <div className='flex p-2' >
                            <div className='pr-2'>
                                <MdChair
                                    className='text-chairMovie-chairAvailable'
                                ></MdChair>
                            </div>
                            <p>Available</p>
                        </div>
                    </div>

                </div>

            </div>
            <div className='bg-[#f6f6f6] h-[100vh] mt-10 rounded-t-[50px] py-10'>
                <h2 className="text-center font-bold ">Select date and time</h2>
                <ul className='flex p-4 w-full' >
                    <li className='flex flex-col'>
                        <div className='bg-primary-textMovie p-3 rounded-lg mx-2 text-white'>
                            <p>Mon</p>
                            <span className="font-bold">23</span>
                        </div>
                    </li>
                    <li className='flex flex-col'>
                        <div className=' p-3 bg-[#eeeeee]  rounded-lg mx-2 text-black'>
                            <p>Mon</p>
                            <span className="font-bold">23</span>
                        </div>
                    </li>

                </ul>
                <ul className='flex p-4 w-full' >
                    <li className='flex flex-rows'>
                        <div className='bg-primary-textMovie p-3 rounded-lg mx-2 w-20 flex justify-center text-white'>
                            <span>8:30</span>
                        </div>
                        <div className=' p-3 bg-[#eeeeee] rounded-lg mx-2 w-20 flex justify-center text-black'>
                            <span>8:30</span>
                        </div>
                        <div className='p-3 bg-[#eeeeee]  rounded-lg mx-2 w-20 flex justify-center text-black'>
                            <span>8:30</span>
                        </div>
                    </li>


                </ul>
                <div className="flex justify-between mt-5 px-5 ">
                    <div className="p-3">
                        <p>Total Price </p>
                        {seatss.filter(seat => seat.selected).map(seat => (
                            <div className="font-bold" >$ {seat.total}</div>
                        ))}
                    </div>
                    <div >
                        <Link to="/pay" className="text-white" state={item} >
                            <Button
                                className="bg-chairMovie-chairSelected h-16  text-xl w-[200px]"
                            >Confirm Seat</Button>
                        </Link>

                    </div>
                </div>

            </div>

        </div>
    );
}

export default Select;