import { TypingEffectSeller, TypingSearchEffect } from "@/lib/animationText";
import { showErrorToast } from "@/lib/toastUtils";
import { useEffect, useState } from "react";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";

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
            <div className="bg-white w-[100px] sm:w-[200px]  h-[100vw] fixed">
                <nav className="flex flex-col gap-5 p-2 text-sm" >
                    <Link
                        onClick={() => { if (!role || role === null) showErrorToast("Please login is required") }}
                        className="text-black hover:text-gray-500 text-xs sm:text-[15px]"
                        to={role === 'seller' ? 'ticket' : '#'}>Create Ticket Booking </Link>
                    <Link
                        onClick={() => { if (!role || role === null) showErrorToast("Please login is required") }}
                        className="text-black hover:text-gray-500"
                        to={role === 'seller' ? 'qrcode' : '#'}>Check Ticket User </Link>
                    <Link className="text-black hover:text-gray-500 text-xs sm:text-[15px]" to={'setting'}>Settings</Link>
                    <Link className="text-black hover:text-gray-500 text-xs sm:text-[15px]" to={'total'}>Total Revenue</Link>
                    <Link className="text-black hover:text-gray-500 text-xs sm:text-[15px]" to={'create'}>Create Ticket</Link>
                    <Link className="text-black hover:text-gray-500 text-xs sm:text-[15px]" to={'getId'}>Get Id Movie</Link>
                </nav>

            </div>

            <div className="pl-[250px] bg-slate-200 ">
                <Outlet />
            </div>
        </div>
    );
}

export default HomeManager