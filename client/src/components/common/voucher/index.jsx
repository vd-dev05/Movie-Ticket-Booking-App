import { showErrorToast } from "@/lib/toastUtils";
import UserServices from "@/services/users/User.controller";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Voucher = ({isVisible, setIsVisible}) => {
 
  const nav = useNavigate()
  const handleClose = () => {
    setIsVisible(false);
    localStorage.setItem('isVoucher', true)
  };
  const [ roler, setRoler ] = useState()
  const handleCreateVouchers = async () => {

    if (roler === 'user') {
      localStorage.setItem('isVoucher', true)
      await  UserServices.createVoucherNewUser()
      nav('/profile/voucher')
    } else if (roler === 'guest') {
      nav('/login')
    }
    
  }
  useEffect(() => {
    const rolers = localStorage.getItem('access_token')
    if (rolers && rolers !== null) {
      setRoler("user")
    } else {
      setRoler("guest")
      // nav('/login')
      // console.log("hjello");
      
    }
    console.log(roler);
    
  }, [])
  
  useEffect(() => {
    const timeout = setTimeout(() => {
      document.querySelector('.voucher').classList.add('opacity-100');
    }, 100);
    return () => clearTimeout(timeout);
  }, []);

  if (!isVisible) return null;

  return (
    <div
      className="voucher fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-gradient-to-r from-purple-600 via-pink-600 to-red-600 text-white p-8 rounded-xl z-50 shadow-xl flex flex-col items-center opacity-0 transition-opacity duration-500"
    >
  
      <h2 className="text-xl font-semibold mb-4 text-nowrap">Voucher bạn mới tặng bạn!</h2>
      <p className="text-center mb-4">
        Chúc mừng! Bạn vừa nhận được một voucher giảm 50%
      </p>
      <button
      onClick={handleCreateVouchers}
      className="bg-primary-textMovie">Nhấn vào đây để nhận </button>
      
      <button
        onClick={handleClose}
        className="absolute top-2 right-2 text-white bg-transparent border-2 border-white rounded-full w-8 h-8 flex items-center justify-center hover:bg-white hover:text-black transition"
      >
        <span className="text-xl">&times;</span>
      </button>
        <p
        onClick={() => {
            handleClose()
            localStorage.setItem('isVoucher', false)
        }}
        className="text-[9px]  bg-gradient-to-r to-red-600p-8 rounded-xl absolute bottom-0 right-1 py-2" >không hiển thị thông báo những lần sau</p>
    </div>
  );
};

export default Voucher;

