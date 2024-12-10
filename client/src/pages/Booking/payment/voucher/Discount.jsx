import { useThemeClasses } from "@/context/Theme/themeStyles";
import UserServices from "@/services/users/User.controller";
import queryString from "query-string";
import { useEffect, useState } from "react";
import { IoMdArrowRoundBack } from "react-icons/io";
import { Link, useLocation, useNavigate } from "react-router-dom";
import React from 'react';
import { Checkbox } from 'antd';
import {decodeString, encodeString } from "@/lib/encode";

const PayMentVoucher = () => {
    const location = useLocation()
    const paserd = queryString.parse(location.search)
    const decodeQuery = decodeURIComponent( decodeString(paserd.string, import.meta.env.VITE_SECRET_KEY))
    // console.log( decodeQuery);
    
    // console.log(paserd);
 
    const {isactive,price,string,totalprice,seats} = paserd
    const nav = useNavigate()
    
// isactive
// : 
// "false"
// price
// : 
// "6.99"
// string
// : 
// "/details/674df4e3c840a9f0be67e8f7/seller/67500791ef36715c0f45b819/CGV Vincom Bắc Từ Liêm/08:00-09:00/6.99/2024-12-02/booking/pay?seats=A5,A4,A6"
// totalprice
// : 
// "20.97"
    


    const { buttonClasses, backGround, textClasses, inputClasses, themeUniver, btnSubmit, buttonCLick } = useThemeClasses();
    const [vouchers, setVouchers] = useState([])
    const [voucherApplied, setVoucherApplied] = useState(null);
    const [value, setValue] = useState()
    const [isChecked, setIsChecked] = useState(null);
    const [paredId, setParedId] = useState(null);
    const [queryVoucher , setqueryVoucher] = useState(null)
    const [encodeUrl , setEncodeUrl] = useState()
    useEffect(() => {
        const fetchData = async () => {

            try {
                // setIsLoading(false)
                const response = await UserServices.getvoucherUser()
                if (response.status === 200) {
                    setVouchers(response.data.data)
                }

            } catch (error) {
                console.log(error);

            }
        }
        fetchData()
    }, [value])
    const handleCheck = async (  ) => {
        console.log(vouchers);
        
        if (value) {
            const response = vouchers.filter(voucher => voucher.code === value)
            console.log(response);
            
            if (response) {
                setVouchers(response)
            }
        }
        // try {
        //     const response = vouchers.filter(voucher => voucher.code === value)
        //     // console.log(response);
        //     if (response.status === 200) {
        //         // console.log(response.data);
        //         setVouchers(response)
        //     }
        // } catch (error) {
        //     console.log(error);
        // }
    }
    
    useEffect(() => {
        const filter = vouchers.filter(voucher => voucher._id === paredId)
        if (filter && filter.length > 0) {
            const query = queryString.stringify(filter[0])
            if (query) {
                setqueryVoucher(query)
            }
            // console.log(string);
            
            // const gopquery = `${string}&voucher=${query}`
            // // console.log(gopquery);
            // const test = queryString.parse(gopquery)
            // console.log(string);
            
   
            // console.log(test);
            
            
            // console.log(query);
            // const pared = queryString.parse(query)

            // console.log(pared);
            

            
        }
        
        // if ()
        
    }, [paredId])
    
    const handleChange = (e) => {
        setValue(e.target.value)
    }
   
    
    const handleOnChange = (e) => {

        setParedId(e.target.value)
        
        setIsChecked(e.target.checked ? e.target.value : null);
    }
    const handleApply = () => {
        nav(`${paserd.page}?${encodeUrl}`)
    }
    useEffect(() => {
        if (queryVoucher) {
            const voucherString =encodeURIComponent( decodeQuery + '&' + decodeURIComponent(queryVoucher) )
            setEncodeUrl(encodeString(voucherString, import.meta.env.VITE_SECRET_KEY))
        }
    }, [queryVoucher])
    
   
    return (
        <div>
            <div className={` flex flex-col  mb-5 ${themeUniver} px-5 min-h-screen`}>
                <div className="w-full flex items-center gap-5">
                    <Link
                     to={ paserd.string && queryVoucher ?   `${paserd.page}?${encodeUrl}` : `${paserd.page}?${paserd.string}` }
                      >
                        <IoMdArrowRoundBack />
                    </Link>
                    <h1 className={`text-2xl font-semibold `}>Discount</h1>

                </div>
                <div>
                    <div
                        className={`flex items-center gap-5 justify-center  rounded-lg py-5 px-2 drop-shadow-2xl ${buttonClasses}`}
                    >
                        <div className={`flex flex-col w-full border-[1px] border-primary-textMovie  ${inputClasses}  p-2 relative rounded-lg`}>
                            <label htmlFor="code" className={`absolute top-[-10px] left-2 text-xs  ${inputClasses} px-2`}>Mã khuyến mại</label>
                            <input
                                type="text"
                                name="code"
                                id="code"
                                value={value}
                                placeholder="Nhập mã khuyến mại"
                                onChange={handleChange}
                                className={`outline-none ${inputClasses} text-xs  `}

                            />
                        </div>

                        <div>
                            <button
                                onClick={handleCheck}
                                className={` text-nowrap ${value ? 'text-white  bg-primary-textMovie' : 'cursor-not-allowed bg-gray-50 text-gray-300'}    `}
                                disabled={value ? false : true}
                            >Kiểm tra</button>
                        </div>

                    </div>
                    <div className="py-5">
                        {vouchers.map((voucher) => (
                            <div key={voucher._id}
                                className={`flex justify-between items-center p-4  my-5 rounded-lg drop-shadow-xl  ${inputClasses}`}>
                                <div>
                                    <h3 className="font-semibold">{voucher.name}</h3>
                                    <p>{voucher.des}</p>
                                    <span className="text-sm text-gray-500">Discount: ${voucher.discountAmount}</span>
                                </div>
                                <div>
                                    <Checkbox

                                        checked={isChecked === voucher._id}
                                        value={voucher._id}
                                        onChange={handleOnChange}
                                        className="cursor-pointer"
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <button 
            onClick={handleApply}
            className={`fixed bottom-10 w-[80%] left-[50%] translate-x-[-50%] ${isChecked ? 'bg-primary-textMovie text-white ' : 'bg-gray-50 text-gray-300' } text-nowrap rounded-lg drop-shadow-2xl`}>
                
                Apply
            </button>
        </div>


    );
}

export default PayMentVoucher;

