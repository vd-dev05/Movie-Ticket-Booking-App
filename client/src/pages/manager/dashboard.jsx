import { TypingEffectSeller, TypingSearchEffect } from "@/lib/animationText";
import { showErrorToast } from "@/lib/toastUtils";
import { useEffect, useState } from "react";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { IoIosCreate , IoIosSearch ,IoIosQrScanner,IoIosSettings ,IoIosAdd } from "react-icons/io";
const HomeManager = () => {
    const [role, setRole] = useState("")
    const location = useLocation()
    const nav = useNavigate()
    const checkTicket = location.pathname === '/manager/ticket'
    const ocr = location.pathname === '/manager/qrcode'
    const dasboard = location.pathname === '/manager'
    const [name, setName] = useState()
    const [logo, setLogo] = useState()
    const [isLoading, setIsLoading] = useState(false)
    // console.log(check);

    useEffect(() => {
        const seller = localStorage.getItem("seller")

        if (seller) {
            setRole("seller")
            const { name, logo } = JSON.parse(seller)
            setName(name)
            setLogo(logo)
            setIsLoading(true)

        }
        if ((checkTicket || ocr === true) && !seller) {
            nav('/auth/signin/manager')
        }
        if (role === null) {
            showErrorToast("Bạn phải đăng nhập để truy cập trang này!")
            setIsLoading(true)
        }
    }, [])
    if (!isLoading) {
        return (
            <div>Loading....</div>
        )
    }
    return (
        <div >
            <div className="h-10 bg-gradient-custom flex justify-between items-center px-5">
                <div className="flex items-center gap-2">
                    <img src={logo} className="w-10 drop-shadow-2xl " alt="" />
                    <TypingEffectSeller nameUser={name} />
                </div>

                <h1 className=" text-[#0B3051] text-end font-bold p-2">Trang quản lí rạp phim</h1>
            </div>
            <div className="bg-white w-[100px] min-h-screen sm:w-[200px]  sm:h-[100vw]  fixed">
                <nav className="flex flex-col gap-5 p-2 text-sm items-center" >
                    <Link
                        onClick={() => { if (!role || role === null) showErrorToast("Please login is required") }}
                        className="text-black hover:text-gray-500 text-xs sm:text-[15px]"
                        to={role === 'seller' ? 'ticket' : '#'}><IoIosAdd  size={30} className="sm:hidden " /><span className="hidden sm:block">Create Ticket Booking </span>  </Link>
                    <Link
                        onClick={() => { if (!role || role === null) showErrorToast("Please login is required") }}
                        className="text-black hover:text-gray-500"
                        to={role === 'seller' ? 'qrcode ' : '#'}> <IoIosQrScanner className="block sm:hidden " /> <span className="hidden sm:block"> Scan Ticket </span></Link>
                    <Link className="text-black hover:text-gray-500 text-xs sm:text-[15px]" to={'setting'}><IoIosSettings className="sm:hidden" size={25} /> <span className="hidden sm:block" >Settings</span> </Link>
                    <Link className="text-black hover:text-gray-500 text-xs sm:text-[15px]" to={'total'}><span className="sm:block hidden">Total Revenue</span> </Link>
                    <Link className="text-black hover:text-gray-500 text-xs sm:text-[15px]" to={'create'}> <IoIosCreate className="sm:hidden block" size={25} /> <span className="sm:block hidden">Create Ticket</span></Link>
                    <Link className="text-black hover:text-gray-500 text-xs sm:text-[15px]" to={'getId'} > <IoIosSearch  className="sm:hidden block" size={25}/> <span className="sm:block hidden">Get Id Movie</span></Link>
                </nav>

            </div>

            <div className="pl-[100px] sm:pl-[250px] bg-slate-200 min-h-screen sm:h-full ">
                <Outlet />
            </div>
        </div>
    );
}

export default HomeManager