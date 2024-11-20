import { useTheme } from "@/context/Theme";
import { useThemeClasses } from "@/context/Theme/themeStyles";
import React, { memo, useEffect, useState } from "react";
// import ReactDOM from "react-dom";
import QRCode from "react-qr-code";
import { json, Link, useLocation } from "react-router-dom";
import { useUser } from "../../../../../hooks/GetApi/GetContext";
import { ref } from "firebase/database";
import { dataMovie } from "../../../../../hooks/GetApi/GetApi";
import { User } from "lucide-react";


const QrCode = () => {
    const location = useLocation()
    const { data } = location.state || {}
    console.log(data);


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
    useEffect(() => {
        (async () => {
            try {
                const data = await dataMovie('users/dataTicket/book')
                // console.log(data);
                const User = await dataMovie('users/auth/name')
                // console.log(User);
                
                setUser(User)
                const dataTic = data.filter((item => item.id == localStorage.getItem('pay')))
              

                setDataMap(dataTic)
                console.log(dataMap);
                
                // setpayBookData(dataTic)
                // console.log(payBookData);

            } catch (error) {
                console.log(error);

            }


        }
        )()
    }, []);
    const test =  () => {
        // console.log(dataMap[0].dateBook[0].date);
        
    }


    return (
        <div>
            {/* <div onClick={test}>CLick</div> */}
            {
            dataMap.length > 0 ? dataMap.map((item => (
                
                <div >
                    <div className={`${themeUniver} iphone-12-pro-max:flex flex flex-col min-h-screen min-w-full  font-movie px-5 `}>
                        <div>
                            <div className="translate-y-9">
                                <Link 
                                to={'/ticket'}
                                onClick={() => localStorage.removeItem('pay')}
                                >
                                    <box-icon name='chevron-left' size={"40px"} color={color} > </box-icon>
                                </Link>
                            </div>
                            <div>
                                <h1 className='text-center font-logo'>View Ticket</h1>
                            </div>
                        </div>
                        <div className={`${themeCtx.theme == 'dark' || 'travel' ? 'bg-[#242024]' : 'bg-[#f0f0f0]'} w-full  h-full flex flex-col items-center z-0 justify-center mt-10 pt-10 rounded-lg gap-y-10  `}>
    
                            <div className="drop-shadow-2xl w-full text-center">
                                <h2 className="text-center font-bold">Scan This Qr</h2>
                                <p>ponint this qr the scan place</p>
                            </div>
    
                            <div className={` ${themeCtx.theme == 'dark'  ? 'bg-[#242024]' : 'bg-light-bg'} p-10 rounded-3xl drop-shadow-2xl `}>
                                <QRCode value={item.codeQr} size={250} />
                            </div>
                            <div className="flex w-full justify-between z-100">
                                <div className={`rounded-r-3xl w-[60px] h-[50px] ${themeUniver} drop-shadow-none   `}></div>
                                <div className="  border-b-[9px]  border-dashed border-gray-400 w-full -translate-y-5"></div>
                                <div className={` rounded-l-3xl w-[60px] h-[50px] ${themeUniver} drop-shadow-none `}></div>
                            </div>
                            <div className="w-full p-10">
                                <h2 className="text-center font-bold text-2xl ">{item.codeQr}</h2>
                                <div className="my-10 flex gap-10 flex-col">
                                    <div className="flex justify-between  ">
                                        <div>
                                            <p>Full name</p>
                                            <span className="font-bold">{ user ? user : 'Nguyen Van A'}</span>
                                        </div>
                                        <div className="text-right">
                                            <p>Time</p>
                                            <span className="font-bold">{item ? item.timeBook[0].keyHours : null}</span>
                                        </div>
                                    </div>
                                    <div className="flex justify-between  ">
                                        <div>
                                            <p>Date</p>
                                            <span className="font-bold">
                                                {item ? item.dateBook[0].dayOfWeek + ' ' + item.dateBook[0].dayOfMonth + ', ' + item.dateBook[0].date  : ''}
                                            </span>
                                        </div>
                                        <div className="text-right">
                                            <p>Seat</p>
                                            <span className="font-bold">{item ? (item.seatBook).join(',') : null}</span>
                                        </div>
                                    </div>
    
                                </div>
                            </div>
                        </div>
    
                    </div>
    
                </div>
            ))) : <p>not Data</p>
        }
        </div>

    );
}

export default memo(QrCode);