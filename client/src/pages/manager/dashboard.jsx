import { Link, Outlet } from "react-router-dom";

const HomeManager = () => {
    // useEffect(() => {
      
    // }, [])
    
    return (
        <div>
            <div className="h-10 bg-gradient-custom">
                <h1 className=" text-[#0B3051] text-end font-bold p-2">Trang quản lí rạp phim</h1>
            </div>
            <div className="bg-white w-[200px] h-[100vw] fixed">
                <nav className="flex flex-col gap-5 p-2 text-sm" >
                    <Link className="text-black hover:text-gray-500" to={'ticket'}>Create Ticket Booking </Link>
                    <Link className="text-black hover:text-gray-500" to={'qrcode'}>Check Ticket User </Link>
                    <Link className="text-black hover:text-gray-500" to={'setting'}>Settings</Link>
                    <Link className="text-black hover:text-gray-500" to={'total'}>Total Revenue</Link>
                    <Link className="text-black hover:text-gray-500" to={'create'}>Create Ticket</Link>
                    <Link className="text-black hover:text-gray-500" to={'getId'}>Get Id Movie</Link>
                </nav>

            </div>

            <div className="pl-[250px] bg-slate-200 ">
                <Outlet />
            </div>
        </div>
    );
}

export default HomeManager