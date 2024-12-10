import { Link, useNavigate } from "react-router-dom";
import React, { useEffect, useMemo, useState } from 'react';
import { MdChair } from "react-icons/md";
import { Button } from "@/components/ui/button";
import { useLocation } from 'react-router-dom';
import { useThemeClasses } from "@/context/Theme/themeStyles";
import { useTheme } from "@/context/Theme/index";
// import { useItem } from "../../../../hooks/GetApi/ItemContext";
import { io } from "socket.io-client";
import * as dateFns from 'date-fns'
import { format, startOfDay, startOfWeek, endOfDay, startOfMonth, lastDayOfMonth, eachDayOfInterval, lastDayOfWeek, eachMinuteOfInterval, setMinutes } from 'date-fns';

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { showErrorToast, showInfoToast, showSuccessToast } from "@/lib/toastUtils";
import { useUser } from "@/context/User";
import { generateSeats } from "@/lib/createSeats";
import SeatList from "./seatsList";
import queryString from "query-string";
import { decodeString, encodeString } from "@/lib/encode";


const Select = () => {
    const nav = useNavigate()
    const { dataUser, setDataUser } = useUser()
    // const { item } = useItem()
    // console.log(dataUser);
    const [total, setTotal] = useState(0);
    const [totalPrice, setTotalPrice] = useState(0)
    const [TotalTicket, setTotalTicket] = useState([])

    const location = useLocation()
    const paredUrl = queryString.parseUrl(location.pathname)
    const splitLocation = location.pathname.split('/booking')[0]
    // const obj = queryString.parseUrl(location.search)
    // console.log(obj.query);
    const decodeQuery = decodeString(location.search.split('?').join(''),import.meta.env.VITE_SECRET_KEY)
    const parsed = queryString.parseUrl(decodeQuery)
    const decodeComponent = decodeURIComponent(parsed.url)
    

    const dataBook = location.state || {}
    // console.log(dataBook);

    const [data, setData] = useState([])
    const theme = useTheme()
    // const { item, setItem } = useItem()

    // const socket = io('http://192.168.1.224:3002')

    const [isLoading , setIsLoading] = useState(false)
    const { backGround, textClasses, themeUniver, DatePickerButton, buttonCLick } = useThemeClasses()
    const { color } = useTheme()

    const handleSeatsUpdate = (updatedSeats) => {
        // console.log(updatedSeats);

        // const selectedSeats =  updatedSeats.filter(seat => seat.selected == true);
        if (updatedSeats) {
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
       
        }
     
        

    };
    const TotalPrice = useMemo(() => {
        return data.reduce((total, seat) => seat.selected ? total + seat.price : total, 0);
    }, [data]);

    const Ticket = useMemo(() => {
        const t = data.filter((item) => item.selected == true).map(item => item.id)

        return t
    }, [data])
 

    const [currDay, setCurrDay] = useState(new Date())
    const [day, setDay] = useState([])
    const [hours, setHours] = useState([])
    const [dataTicket, setDataTicket] = useState({
        dataD: null,
        dataH: null
    })
 
    // const handlePay = async () => {
    
    // };
    const handleConfirm = () => {
        if (Ticket.length == 0 && TotalPrice == 0) {
            showErrorToast("Please select a seat")
        } else {
            const StringEncode = decodeComponent + `&seats=${Ticket}&totalprice=${TotalPrice}&isactive=false`
            const queryEncode = encodeString(encodeURIComponent(StringEncode), import.meta.env.VITE_SECRET_KEY)
            nav(`pay?${queryEncode}`)
            
        }

    }
    
    useEffect(() => {
        setTimeout(() => {
            setIsLoading(true)
        }, 2000);
    }, [])

    if (!isLoading) {
        return (
            <span className="">Loading...</span>
        )
    }

  
   
    // console.log(queryEncode);
    
    
    return (

        <div className={` font-movie ${themeUniver}  min-h-screen `}>
            {/* <button onClick={Click}>test</button> */}

            <div className="px-5">
                <div className="translate-y-9">
                    <Link to={`${splitLocation}`}>
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
                <h2 className="text-center font-bold ">Order food </h2>
                <div className="flex px-5">
                    <img src="https://down-bs-vn.img.susercontent.com/vn-11134513-7r98o-lsv9ka6918785b@resize_ss640x400!@crop_wfull_h50_cT"  className="h-[100px]" alt="" />
                        <h2>Coming soom ...</h2>
                </div>
             
                <div className="flex justify-between mt-5 px-5  ">
                    <div className="p-3 ">
                        <p>Total Price :<span className="font-bold " > {TotalPrice ? (`${Number(TotalPrice).toLocaleString()} USD `) : ''}</span></p>


                        <p className="truncate w-[300px]">Seat :<span className="font-bold " > {Ticket ? (Ticket).join(',') : ''}</span></p>

                    </div>

                    <div className={buttonCLick}
                    // onClick={handlePay}
                    >
                        {/* <Button
                            onClick={handleConfirm}
                            className=" h-16  text-xl w-[200px]"
                        >Confirm Seat</Button> */}
                        {/* <Link
                            // to={`${location.pathname}/pay?seats=${Ticket}&totalprice=${TotalPrice}&price=${price}&isactive=false`}
                            onClick={handleConfirm}  
                            className="text-white hover:text-white" 
                            // TotalPrice={TotalPrice} Ticket={Ticket} dataTicket={dataTicket} dataBook={dataBook}
                              >
                         
                        </Link> */}
                           <Button
                                  onClick={handleConfirm}  
                                //   className="text-white hover:text-white" 
                                className=" h-16  text-xl w-[200px] text-white hover:text-white"
                            >Confirm Seat</Button>

                    </div>
                </div>

            </div>
        </div>

    );
}

export default Select;