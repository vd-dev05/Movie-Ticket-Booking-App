import { Link, useNavigate } from "react-router-dom";
import React, { useEffect, useMemo, useState } from 'react';
import { MdChair } from "react-icons/md";
import { Button } from "@/components/ui/button";
import { useLocation } from 'react-router-dom';
import { useThemeClasses } from "../../Theme/themeStyles";
import { useTheme } from "../../Theme";
import { useItem } from "../GetApi/ItemContext";
import { io } from "socket.io-client";
import * as dateFns from 'date-fns'
import { format, startOfDay, startOfWeek, endOfDay, startOfMonth, lastDayOfMonth, eachDayOfInterval, lastDayOfWeek, eachMinuteOfInterval, setMinutes } from 'date-fns';

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { useUser } from "@/components/Layout/Product/GetApi/GetContext";
import { database } from "@/components/firebase/firebase";
import { get, ref, update } from "firebase/database";
import generateRandomString from "@/lib/randomCodeMovie"
import { toast, ToastContainer } from "react-toastify";
import  updateBookingStatus from '@/components/Layout/Product/GetApi/GetRemoveData'

// import { useItem } from "../GetApi/ItemContext";
// const boooking = 5
// const getSizeClass = () => {
//     if (window.innerWidth < 320) return '10';
//     if (window.innerWidth < 640) return '60';
//     if (window.innerWidth < 768) return '70';
//     if (window.innerWidth < 1024) return '100';
//     return '90';
// };

// const sizeClass = getSizeClass();



const obValues = ['A', 'B', 'C', 'D', 'E', 'F', 'G'];
const generateSeats = (count, startIndex) =>

    // console.log(count);

    Array.from({ length: count }, (_, i) => ({
        id: `${obValues[i]}${startIndex}`,
        booked: Math.random() < 0.5,
        selected: false,
        // ob:obValues[i],
        // price: 99
    }));

// Component SeatList
const SeatList = ({ count, onSeatsUpdate, startIndex, setTotalTicket }) => {
    const theme = useTheme()

    const [seats, setSeats] = useState(generateSeats(count, startIndex));
    // console.log(seats);



    // Hàm xử lý sự kiện khi nhấp vào ghế
    const handleSeatClick = (id) => {
        // console.log(id);
        setTotalTicket(id)

        // const t =  seats.filter(seat => seat.id == id)
        // console.log(seats.filter(seat => seat.id == id.id ?  ));


        const updatedSeats = seats.map((seat) =>

            seat.id === id && !seat.booked
                ? ({ ...seat, selected: !seat.selected, price: !seat.selected ? 99 : 0 })
                : seat
        );

        // console.log(updatedSeats);

        setSeats(updatedSeats);
        //    

    };

    useEffect(() => {
        onSeatsUpdate(seats);
        // console.log(TotalTicket);
    }, [seats]);

    return (
        <div className="flex flex-col">
            {seats.map((seat) => (
                <div key={seat.id}>
                    {/* {seat.id} */}
                    <MdChair
                        key={seat.id}
                        id={seat.id}
                        size={'100%'}
                        // size={sizeClass}
                        className={`cursor-pointer ${seat.booked
                            ? theme.theme == 'travel' ? ' text-[#b8116a]' : 'text-chairMovie-chairBooked' : seat.selected
                                ? theme.theme == 'travel' ? ' text-[#08fbd2]' : 'text-primary-textMovie'
                                : theme.theme == 'travel' ? ' text-[#c4c4c2]' : 'text-chairMovie-chairAvailable'}    `}
                        onClick={() => handleSeatClick(seat.id)}
                    />

                </div>
            ))}
        </div>
    );
};

// console.log(si);

const Select = () => {
    const nav = useNavigate()
    const { dataUser, setDataUser } = useUser()
    const { item } = useItem()
    // console.log(dataUser);

    const [total, setTotal] = useState(0);
    const [totalPrice, setTotalPrice] = useState(0)
    const [TotalTicket, setTotalTicket] = useState([])

    const location = useLocation()
    const dataBook = location.state || {}
    // console.log(dataBook);

    const [data, setData] = useState([])
    const theme = useTheme()
    // const { item, setItem } = useItem()

    // const socket = io('http://192.168.1.224:3002')


    const { backGround, textClasses, themeUniver, DatePickerButton, buttonCLick } = useThemeClasses()
    const { color } = useTheme()

    useEffect(() => {
        setDataUser(pre => ({ ...pre, dataIdBook: dataBook }))
    }, [setDataUser])

    const handleSeatsUpdate = (updatedSeats) => {
        // console.log(updatedSeats);

        // const selectedSeats =  updatedSeats.filter(seat => seat.selected == true);
        setData((prevSeats) => {
            const mergedSeats = [...prevSeats];
            updatedSeats.forEach((seat) => {
                const index = mergedSeats.findIndex((s) => s.id === seat.id);


                if (index >= 0) {
                    mergedSeats[index] = seat;


                } else {
                    mergedSeats.push(seat);
                }
            });
            return mergedSeats;
        });

    };
    const TotalPrice = useMemo(() => {
        return data.reduce((total, seat) => seat.selected ? total + seat.price : total, 0);
    }, [data]);

    const Ticket = useMemo(() => {
        const t = data.filter((item) => item.selected == true).map(item => item.id)

        return t
    }, [data])
    // const TotalBookTicket = useMemo(() => {
    //     return data.reduce((total, seat) =>  {seat.id ? [...total,seat.id] },0);
    // }, [data]);
    const Click = () => {
        // console.log( TotalPrice);
        // console.log(Ticket);
        // console.log(day);
        // console.log(hours);
        // console.log(book);
        console.log(dataTicket);

        // console.log(TotalBookTicket);

    }

    const [currDay, setCurrDay] = useState(new Date())
    const [day, setDay] = useState([])
    const [hours, setHours] = useState([])
    const [dataTicket, setDataTicket] = useState({
        dataD: null,
        dataH: null
    })
    // const [book, setBook] = useState({
    //     date: false,
    //     hours: false
    // })

    useEffect(() => {
        const formatW = "EEE"
        const formatD = "dd"
        const timeFormat = "HH:mm"


        const F = dateFns.startOfMonth(currDay)
        const L = dateFns.lastDayOfMonth(currDay)
        const FH = startOfDay(currDay);
        const LH = endOfDay(currDay);
        const MiniTime = eachMinuteOfInterval({
            start: FH,
            end: LH
        }, { step: 15 }).map((time, idx) => ({ keyHours: format(time, timeFormat), id: idx += 1, clickH: false }))

        setHours(MiniTime)

        const daysInRange = eachDayOfInterval({
            start: F,
            end: L
        }).map((day, idx) => ({
            date: format(day, 'yyyy'),
            dayOfWeek: format(day, formatW),
            dayOfMonth: format(day, formatD),
            id: idx += 1,
            clickD: false
        }));
        setDay(daysInRange)

        // setDataUser(pre => ({...pre,
        //     dataTimeBook:dataTicket,
        //     total: TotalPrice,
        //     dataTicket:Ticket
        // }))

    }, [currDay])
    const handleCLickDate = (id) => {
        const updatedHours = day.map(hour =>
            hour.id === id
                ? { ...hour, clickD: true }
                : { ...hour, clickD: false }
        )
        setDay(updatedHours)




    }
    const handleClickHours = (i) => {
        const updatedHours = hours.map(hour =>
            hour.id === i
                ? { ...hour, clickH: true }
                : { ...hour, clickH: false }
        );
        setHours(updatedHours)

        const dH = hours.filter((item) => item.clickH == true)
        setDataTicket(pre => ({ ...pre, dataH: dH }))
    }


    useEffect(() => {
        const dD = day.filter((item) => item.clickD == true)
        const dH = hours.filter((item) => item.clickH == true).map(hour => ({ keyHours: hour.keyHours, id: hour.id }))

        //  setDataUser(pre => ({...pre,dataTicket:dD}))

        setDataUser(pre => ({
            ...pre,
            dataTicket: {
                dataMovieBook: Ticket,
                dataTimeBook: dH,
                dataDayBook: dD,
                total: TotalPrice,
            },

            // total: TotalPrice,
            // dataTicket:Ticket,
            // dataDayBook:dD,
            // dataTimeBook:dH,
        }))
        if (!dD && !dH && !Ticket && !TotalPrice) {
            setDataUser(pre => ({ ...pre, select: true }))
        }
    }, [TotalPrice, Ticket, day, hours])

    const handlePay = async () => {
        const updateData = {
            codeQr:`Mov ${generateRandomString(12)}`,
            dateBook: dataUser.dataTicket.dataDayBook,
            total: dataUser.dataTicket.total,
            seatBook: dataUser.dataTicket.dataMovieBook,
            timeBook: dataUser.dataTicket.dataTimeBook,
        }
        await updateBookingStatus(localStorage.getItem('pay'), updateData)
        // try {
        //     const PayRef = ref(database, 'users/dataTicket/book');
        //     const snapshot = await get(PayRef);

        //     if (snapshot.exists()) {
        //         const data = snapshot.val();
        //         for (const key in data) {
        //             // console.log(key);
        //             // console.log(data[key].id );
        //             // console.log(localStorage.getItem('pay'));
                    
        //             if (data[key].id == localStorage.getItem('pay')) {
        //                 // console.log(dataUser.dataTimeBook);

        //                 await update(ref(database, `users/dataTicket/book/${key}`), {
        //                     // timeBook: dataUser,
        //                     codeQr:`Mov ${generateRandomString(12)}`,
        //                     dateBook:dataUser.dataTicket.dataDayBook,
        //                     total:dataUser.dataTicket.total,
        //                     seatBook:dataUser.dataTicket.dataMovieBook,
        //                     timeBook:dataUser.dataTicket.dataTimeBook,
        //                 });

        //                 return;
        //             }
        //         }
        //         console.log("No matching booking found.");
        //     } else {
        //         console.log("No data found in 'book' path.");
        //     }
        // } catch (error) {
        //     console.error("Error updating data:", error);
        // }
    };
    const handleConfirm = () => {
        // console.log(dataUser);
        // console.log(dataUser.dataTicket);

        if (dataUser.dataTicket === null || dataUser.dataTicket === undefined) {
            // console.log('true');
            toast.warning('Please book your tickets')
        }
        toast.success('Book SuccessFull', {
            autoClose:2500
        }

        )
        setTimeout(() => {
            nav('/pay')
        }, 2400);

    }
    return (

        <div className={` font-movie ${themeUniver}   `}>
            {/* <button onClick={Click}>test</button> */}

            <div className="px-5">
                <div className="translate-y-9">
                    <Link to="/itemlove">
                        <box-icon name='chevron-left' size={"40px"} color={color}>  </box-icon>
                    </Link>

                </div>
                <h1 className='text-center font-logo'>Select Seats</h1>
                {/* <div className="w-[100%] bg-white h-[100px]  my-[15px] mx-0 px-[2px] cursor-w-resize"></div> */}
                <div className="mt-20">
                    <div className='mt-10 p-2 '>
                        <div className="flex">
                            <div className='flex mr-5'>
                                <div className='p-2 mt-5 '>
                                    <SeatList count={5} onSeatsUpdate={handleSeatsUpdate} startIndex={1} setTotalTicket={setTotalTicket} />
                                </div>

                                <div className='flex'>
                                    <SeatList count={7} onSeatsUpdate={handleSeatsUpdate} startIndex={2} setTotalTicket={setTotalTicket} />
                                    <SeatList count={7} onSeatsUpdate={handleSeatsUpdate} startIndex={3} setTotalTicket={setTotalTicket} />
                                    <SeatList count={7} onSeatsUpdate={handleSeatsUpdate} startIndex={4} setTotalTicket={setTotalTicket} />
                                </div>
                            </div>

                            <div className='flex'>
                                <div className='flex'>
                                    <SeatList count={7} onSeatsUpdate={handleSeatsUpdate} startIndex={5} setTotalTicket={setTotalTicket} />
                                    <SeatList count={7} onSeatsUpdate={handleSeatsUpdate} startIndex={6} setTotalTicket={setTotalTicket} />
                                    <SeatList count={7} onSeatsUpdate={handleSeatsUpdate} startIndex={7} setTotalTicket={setTotalTicket} />
                                </div>
                                <div className='p-2 mt-5'>
                                    <SeatList count={5} onSeatsUpdate={handleSeatsUpdate} startIndex={8} setTotalTicket={setTotalTicket} />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='flex  justify-around'>
                        <div className='flex p-2' >
                            <div className='pr-2'>
                                <MdChair
                                    className={`${theme.theme == 'travel' ? ' text-[#08fbd2]' : 'text-primary-textMovie'}`}
                                ></MdChair>
                            </div>
                            <p>Selected</p>
                        </div>
                        <div className='flex p-2' >
                            <div className='pr-2'>
                                <MdChair
                                    className={`${theme.theme == 'travel' ? ' text-[#b8116a]' : 'text-chairMovie-chairBooked'}`}
                                // className='text-chairMovie-chairBooked'
                                ></MdChair>
                            </div>
                            <p>Booked</p>
                        </div>
                        <div className='flex p-2' >
                            <div className='pr-2'>
                                <MdChair
                                    className={`${theme.theme == 'travel' ? ' text-[#c4c4c2]' : 'text-chairMovie-chairAvailable'}`}
                                // className='text-chairMovie-chairAvailable'
                                ></MdChair>
                            </div>
                            <p>Available</p>
                        </div>
                    </div>

                </div>

            </div>

            <div className={` ${DatePickerButton}   mt-10 rounded-t-[50px]  py-10  min-h-full `}>
                <h2 className="text-center font-bold ">Select date and time</h2>
                <ul className=' p-4 w-full flex  '  >
                    <Swiper
                        spaceBetween={20}
                        slidesPerView={5}

                    >

                        {day.length > 0 ? day.map((item) =>
                            <li >
                                <SwiperSlide
                                    key={item.id}
                                    onClick={() => handleCLickDate(item.id)}
                                    style={{ width: '20px', padding: '13px' }}
                                    className={`${!!item.clickD ? buttonCLick : "bg-[#eeeeee] text-black"} cursor-pointer rounded-lg font-bold text-center`}
                                >
                                    <p>{item.dayOfWeek}</p>
                                    <span className="font-bold">{item.dayOfMonth}</span>
                                </SwiperSlide>
                            </li>
                        ) : (<div className=' p-3 bg-[#eeeeee]  rounded-lg mx-2 text-black'>
                            <p></p>
                            <span className="font-bold"></span>
                        </div>)
                        }
                    </Swiper>
                </ul>

                <ul className='flex p-4 w-full ' >
                    <Swiper
                        spaceBetween={20}
                        slidesPerView={4}
                    >
                        {hours.length > 0 ? hours.map((item) => (
                            <li key={item.id}>
                                {/* <span>{item.keyHours}</span> */}
                                <SwiperSlide
                                    key={item.id}
                                    onClick={() => handleClickHours(item.id)}
                                    style={{ width: '20px', padding: '13px' }}
                                    className={`${!!item.clickH ? buttonCLick : "bg-[#eeeeee] text-black"}  cursor-pointer rounded-lg font-bold text-center`}
                                >
                                    <span>{item.keyHours}</span>
                                </SwiperSlide>
                            </li>


                        ))
                            : (
                                <div className='bg-primary-textMovie p-3 rounded-lg mx-2 w-20 flex justify-center text-white'>
                                    <span>error</span>
                                </div>
                            )
                        }
                    </Swiper>

                </ul>
                <div className="flex justify-between mt-5 px-5  ">
                    <div className="p-3 ">
                        <p>Total Price :<span className="font-bold " > {TotalPrice ? (`${Number(TotalPrice).toLocaleString()} USD `) : ''}</span></p>


                        <p className="truncate w-[300px]">Seat :<span className="font-bold " > {Ticket ? (Ticket).join(',') : ''}</span></p>

                    </div>

                    <div className={buttonCLick}
                        onClick={handlePay}
                    >
                        <Link
                           
                            onClick={handleConfirm}
                            className="text-white hover:text-white" TotalPrice={TotalPrice} Ticket={Ticket} dataTicket={dataTicket} dataBook={dataBook}  >
                            <Button
                                className=" h-16  text-xl w-[200px]"
                            >Confirm Seat</Button>
                        </Link>

                    </div>
                </div>

            </div>
            <ToastContainer></ToastContainer>
        </div>

    );
}

export default Select;