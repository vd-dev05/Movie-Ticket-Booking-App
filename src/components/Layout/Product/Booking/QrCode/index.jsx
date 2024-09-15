import { useTheme } from "@/components/Layout/Theme";
import { useThemeClasses } from "@/components/Layout/Theme/themeStyles";
import React, { memo, useState } from "react";
// import ReactDOM from "react-dom";
import QRCode from "react-qr-code";
import { Link } from "react-router-dom";
import { useUser } from "../../GetApi/GetContext";


const QrCode = () => {
   
    // const randomId = `Mov ${generateRandomString(12)}`;
    // console.log(randomId);
    

    const { textClasses, backGroundTow, backGround, inputClasses } = useThemeClasses()
    const { color } = useTheme()
    const themeCtx = useTheme()
    // const [value] = useState(`Mov ${generateRandomString(12)}`)
    const { dataUser } = useUser()



    console.log(dataUser);



    return (
        <div >
            <div className={`${backGroundTow} ${textClasses}iphone-12-pro-max:flex flex flex-col min-h-screen min-w-full  font-movie px-5 `}>
                <div>
                    <div className="translate-y-9">
                        <Link to={'/ticket'}>
                            <box-icon name='chevron-left' size={"40px"} color={color} > </box-icon>
                        </Link>
                    </div>
                    <div>
                        <h1 className='text-center font-logo'>View Ticket</h1>
                    </div>
                </div>
                <div className={`${themeCtx.theme == 'dark' ? 'bg-[#242024]' : 'bg-[#f0f0f0]'} w-full  h-full flex flex-col items-center z-0 justify-center mt-10 pt-10 rounded-lg gap-y-10  `}>

                    <div className="drop-shadow-2xl w-full text-center">
                        <h2 className="text-center font-bold">Scan This Qr</h2>
                        <p>ponint this qr the scan place</p>
                    </div>

                    <div className={` ${themeCtx.theme == 'dark' ? 'bg-[#242024]' : 'bg-light-bg'} p-10 rounded-3xl drop-shadow-2xl `}>
                        <QRCode value={value} size={250} />
                    </div>
                    <div className="flex w-full justify-between z-100">
                        <div className={`rounded-r-3xl w-[60px] h-[50px] ${backGroundTow} drop-shadow-none   `}></div>
                        <div className="  border-b-[9px]  border-dashed border-gray-400 w-full -translate-y-5"></div>
                        <div className={` rounded-l-3xl w-[60px] h-[50px] ${backGroundTow} drop-shadow-none `}></div>
                    </div>
                    <div className="w-full p-10">
                        <h2 className="text-center font-bold text-2xl ">{value}</h2>
                        <div className="my-10 flex gap-10 flex-col">
                            <div className="flex justify-between  ">
                                <div>
                                    <p>Full name</p>
                                    <span className="font-bold">name naalasfsafk</span>
                                </div>
                                <div className="text-right">
                                    <p>Time</p>
                                    <span className="font-bold">{dataUser.dataTimeBook ? dataUser.dataTimeBook[0].keyHours : null}</span>
                                </div>
                            </div>
                            <div className="flex justify-between  ">
                                <div>
                                    <p>Date</p>
                                    <span className="font-bold">
                                    { dataUser.dataDayBook  ? (dataUser.dataDayBook[0].dayOfWeek + " " + dataUser.dataDayBook[0].dayOfMonth + " " + dataUser.dataDayBook[0].date) : null} 
                                    </span>
                                </div>
                                <div className="text-right">
                                    <p>Seat</p>
                                    <span className="font-bold">{ dataUser.dataTicket ? (dataUser.dataTicket).join(','): null}</span>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>

            </div>

        </div>
    );
}

export default memo(QrCode);