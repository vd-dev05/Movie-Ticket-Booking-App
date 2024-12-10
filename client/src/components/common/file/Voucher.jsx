import { useThemeClasses } from "@/context/Theme/themeStyles";
import UserServices from "@/services/users/User.controller";
import { format } from "date-fns";
import { useEffect, useState } from "react";
import { IoMdArrowRoundBack } from "react-icons/io";
import { Link } from "react-router-dom";


// const vouchers = [
//     { id: 1, title: 'Voucher 1', description: 'Get 20% off your next purchase', expiry: '2024-12-31' },
//     { id: 2, title: 'Voucher 2', description: 'Free shipping on orders over $50', expiry: '2024-12-15' },
//     { id: 3, title: 'Voucher 3', description: 'Buy 1 Get 1 Free', expiry: '2024-12-10' },
// ];
const TicketVoucher = () => {
    const {themeUniver , buttonClasses , textClasses} = useThemeClasses()
    const [isLoading , setIsLoading] = useState(false)
    const [vouchers , setVouchers] = useState([])
    useEffect(() => {
     const fetchData = async () => {
    
        try {
            setIsLoading(true)
            const response  = await UserServices.getvoucherUser()
            // console.log(response);
            if (response.status === 200) {
                // console.log(response.data);
                
                setVouchers(response.data.data)
                setIsLoading(false)
            }
            
        } catch (error) {
            console.log(error);
            
        }
     }
     fetchData()
    }, [])
    if (isLoading) {
        return <div>Loading...</div>;
    }
    return (
        <div className={`min-h-screen p-5 ${themeUniver}`}>
            {/* Header with Back Button */}
            <div className={` ${textClasses} flex justify-between items-center mb-5`}>
                <Link to={`/profile`} className={textClasses}>
                    <IoMdArrowRoundBack className="text-xl " />
                </Link>
                <h1 className={`text-2xl font-semibold `}>Your Vouchers</h1>
                <div></div> {/* Placeholder for right-side space */}
            </div>

            {/* Voucher List */}
            <div className="space-y-4">
                {vouchers.map((voucher) => (
                    <div
                        key={voucher._id}
                        className={` ${buttonClasses} drop-shadow-lg p-5 rounded-lg shadow-md flex flex-col sm:flex-row justify-between items-center`}
                    >
                        <div className="flex flex-col sm:flex-row  sm:items-center space-y-3 sm:space-y-0 sm:space-x-4 text-left">
                            <h2 className="text-xl font-bold text-gray-800">{voucher.title}</h2>
                            <p className="text-gray-600 ">{voucher.des}</p>
                        </div>
                        <div className="flex flex-col sm:flex-row items-center space-y-3 sm:space-y-0 sm:space-x-4">
                            <span className="text-sm text-primary-textMovie">Expires: {voucher.expiryDate ? format(new Date(voucher.expiryDate), 'yyyy-MM-dd'):''}</span>
                        
                        </div>
                    </div>
                    
                ))}
            </div>
        </div>
    );
};

export default TicketVoucher;
