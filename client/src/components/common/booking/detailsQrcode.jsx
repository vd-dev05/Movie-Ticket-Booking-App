import { useTheme } from "@/context/Theme";
import { useThemeClasses } from "@/context/Theme/themeStyles";
import React, { memo, useEffect, useState } from "react";
// import ReactDOM from "react-dom";
import QRCode from "react-qr-code";
import { json, Link, useLocation } from "react-router-dom";
import { useUser } from "@/context/User"; 
import { dataMovie } from "@/hooks/GetApi/GetApi";
import { User } from "lucide-react";
import TicketController from "@/services/users/ticket";
import queryString from "query-string";
import { format } from "date-fns";

const QrCode = () => {
    const localtion = useLocation()
    const { data } = location.state || {}
    const parsedId = queryString.parseUrl(localtion.pathname, { parseFragmentIdentifier: true });
    const  splitId = parsedId.url.split('/')[2]
   
    
    

    // const randomId = `Mov ${generateRandomString(12)}`;
    // console.log(randomId);


    const { textClasses, backGroundTow, backGround, inputClasses,themeUniver } = useThemeClasses()
    const { color } = useTheme()
    const themeCtx = useTheme()
    // // const [value] = useState(`Mov ${generateRandomString(12)}`)
    // const { dataUser } = useUser()
    // console.log(dataUser);   
    const [dataMap, setDataMap] = useState([])
    const [user,setUser] = useState([])
    const [isLoading , setIsLoading] = useState(false)
    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(false)
            try {
                if (localStorage.getItem('account-info')) {
                    const {name }= JSON.parse(localStorage.getItem('account-info'))   
                    setUser(name)
                  
                } else {
                   alert('Please select an account ')
                }
                // console.log(splitId);
                
                const response = await TicketController.getTicket(splitId)
                if (response) {
                    const ticket = response.data.ticket
                    
                    
                    const data =  ticket.filter(ticket => ticket._id === splitId);
                    // console.log(data);
                    
                    if (data.length > 0) {
                     setDataMap(data[0] )   
                     setIsLoading(true)
                
                     
                    }}
              
                 
            } catch (error) {
                console.log(error);
            }
        }
        fetchData();
    }, []);
    // console.log(dataMap);
    
    if (!isLoading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <div className="bg-black" role="status">
                    <span className="text-white">Loading...</span>
                </div>
            </div>
        )
    }


    return (
    <div>
            {  dataMap  ? (
                
                <div >
                    <div className={`${themeUniver} iphone-12-pro-max:flex flex flex-col h-full min-w-full  font-movie px-5 `}>
                        <div>
                            <div className="translate-y-9">
                                <Link 
                                to={'/ticket'}
                                >
                                    <box-icon name='chevron-left' size={"40px"} color={color} > </box-icon>
                                </Link>
                            </div>
                            <div>
                                <h1 className='text-center font-logo'>View Ticket</h1>
                            </div>
                        </div>
                        <div className={`${themeCtx.theme == 'dark' || 'travel' ? 'bg-[#242024]' : 'bg-[#f0f0f0]'} w-full h-full   flex flex-col items-center z-0 justify-center mt-10 pt-10 rounded-lg gap-y-10  `}>
    
                            <div className="drop-shadow-2xl w-full text-center">
                                <h2 className="text-center font-bold">Scan This Qr</h2>
                                <p>ponint this qr the scan place</p>
                            </div>
    
                            <div className={` ${themeCtx.theme == 'dark'  ? 'bg-[#242024]' : 'bg-light-bg'} p-10 rounded-3xl drop-shadow-2xl  `}>
                            <QRCode value={dataMap.book?.movieQr} size={250} />
                            </div>
                            <div className="flex w-full justify-between z-100">
                                <div className={`rounded-r-3xl w-[60px] h-[50px] ${themeUniver} drop-shadow-none   `}></div>
                                <div className="  border-b-[9px]  border-dashed border-gray-400 w-full -translate-y-5"></div>
                                <div className={` rounded-l-3xl w-[60px] h-[50px] ${themeUniver} drop-shadow-none `}></div>
                            </div>
                            <div className="w-full p-10">
                                <h2 className="text-center font-bold text-2xl ">{`Mov-${splitId}`}</h2>
                                <div className="my-10 flex gap-10 flex-col">
                                    <div className="flex justify-between  ">
                                        <div>
                                            <p>Full name</p>
                                            <span className="font-bold">{ user ? user : 'Nguyen Van A'}</span>
                                        </div>
                                        <div className="text-right">
                                            <p>Time</p>
                                            <span className="font-bold">
                                                {dataMap.book.date ? format(dataMap.book.date, 'hh:mm a') : ''}
                                            </span>
                                        </div>
                                    </div>
                                    <div className="flex justify-between  ">
                                        <div>
                                            <p>Date</p>
                                            <span className="font-bold">
                                                {dataMap.book.date ? format(dataMap.book.date, 'EEE dd, yyyy') : ''}
                                            </span>
                                        </div>
                                        <div className="text-right">
                                            <p>Seat</p>
                                            <span className="font-bold">{dataMap.book.seat}</span>
                                        </div>
                                    </div>
    
                                </div>
                            </div>
                        </div>
    
                    </div>
    
                </div>
            ) : <p>NO Data</p>
        }
        
    </div> 

    );
}

export default memo(QrCode);