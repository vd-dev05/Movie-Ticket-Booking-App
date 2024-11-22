import { Link, useLocation } from 'react-router-dom';
import { useItem } from '@/hooks/GetApi/ItemContext';
import { useThemeClasses } from '@/context/Theme/themeStyles';
import { truncateText } from '@/hooks/GetApi/GetApi';
import { useTheme } from '@/context/Theme';
import { FaStar } from 'react-icons/fa6';
import { useEffect, useState } from 'react';
import AddCard from '@/components/common/booking/card';
import DoneBooking from '@/components/common/booking/bill';
import { formatCardNumber } from '@/lib/fomatCard';
import BookingController from '@/services/users/booking';
import queryString from 'query-string';
import { FaQrcode } from "react-icons/fa6";
import { showErrorToast, showLoadingToast, showSuccessToast } from '@/lib/toastUtils';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import { toast } from 'react-toastify';
const Pay = () => {
    const localtion = useLocation()
    const parsed = queryString.parse(location.search);
    const parsedId = queryString.parseUrl(localtion.pathname, { parseFragmentIdentifier: true });

    const splitId = parsedId.url.split('/')[2]
    const splitBooking = parsedId.url.split('/pay')[0]




    const { buttonClasses, backGround, textClasses, inputClasses, themeUniver, btnSubmit, buttonCLick } = useThemeClasses();
    const { color } = useTheme();


    const [selectedValue, setSelectedValue] = useState(null);
    const [isOpen, setIsOpen] = useState(false);
    const [isOpenPay, setIsOpenPay] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [isValid, setIsValid] = useState(true);
    // const [numberCard, setNumberCard] = useState({
    //     master: '',
    //     payPal: ''
    // });


    // const queryParams = new URLSearchParams(localtion.pathname);
    // console.log(queryParams.get('seats'));


    useEffect(() => {
        const fetchData = async () => {
            // setIsLoading(true);
            try {

                // Simulate a loading delay
                // await new Promise(resolve => setTimeout(resolve, 500));

                // setNumberCard({
                //     master: dataNumberMasterCard,
                //     payPal: dataNumberMasterPayPal
                // });

                // setData(prevData => prevData.map(item => {
                //     if (item.name === 'MasterCard') {
                //         return { ...item, number: dataNumberMasterCard || '' };
                //     }
                //     if (item.name === 'Paypal') {
                //         return { ...item, number: dataNumberMasterPayPal || '' };
                //     }
                //     return item;
                // }));
            } catch (error) {
                console.log(error);
            } finally {
                setIsLoading(false);
            }
        };
        const fetchPayBookData = async () => {
            // setIsLoading(true);
            try {
                const response = await BookingController.getMovieBook(splitId)
                if (response) {
                    setpayBookData(response.data);
                    setIsValid(true)
                    setIsLoading(true);
                }



            } catch (error) {
                setIsLoading(true);
                // console.log(error);
            } finally {
                setIsLoading(true);
            }
        };

        fetchData();

        fetchPayBookData();
    }, [splitId]);
    // console.log(payBookData);
    const [data, setData] = useState([
        { id: 1, name: 'MasterCard', number: "", url: '/assets/img/masterCard.png', size: null, select: false },
        { id: 2, name: 'Paypal', number: "", url: '/assets/img/payPal.png', size: 35, select: false }
    ]);
    // console.log(numberCard);
    // console.log(data)

    const [payBookData, setpayBookData] = useState([]);
    const [qrData, setQrData] = useState([])
    const [dataTicket, setDataTicket] = useState([])
    const [formValues, setFormValues] = useState({
        nameCard: '',
        numberCard: '',
        date: '',
        numberCVV: '',
    });

    const handleChange = (value) => {
        setSelectedValue(value);
        const selectedCard = data.find(item => item.name === value);
        if (selectedCard) {
            setFormValues(prevValues => ({
                ...prevValues,
                numberCard: selectedCard.number
            }));
        }
    };
    
    const handlePay = async () => {
        setIsValid(false);
        
        const toastId = toast.loading("Please Loading ...");
        const token = localStorage.getItem('access_token')
        if (!token) {
            alert('Please Login');
            setIsValid(true);   
            return
        } 
        if (token) {
            try {
                const response = await BookingController.seatsBookings(token, parsed, splitId)

                if (response.success === true) {
                    setIsOpenPay(true)
                    setQrData(response.imgUrl)
                    setDataTicket(response.dataQr)
                    // showSuccessToast(response.message)
                    toast.update(toastId, {
                        render: 'Task completed successfully!',
                        type: 'success',
                        isLoading: false,
                        autoClose: 5000,
                      });
                }
                if (response.response.status === 401) {
                    setIsValid(true)
                    // showErrorToast(response.response.data.error)
                    toast.update(toastId, {
                        render: `${response.response.data.error}`,
                        type: 'error',
                        isLoading: false,
                        autoClose: 5000,
                      });
                }
            } catch (error) {
                setIsValid(true);
                toast.update(toastId, {
                    render: `${response.response.data.error}`,
                    type: 'error',
                    isLoading: false,
                    autoClose: 5000,
                  });

            }
            setTimeout(() => {
                toast.dismiss(toastId);
              }, 5000);

        }
    };
    return (
        <div className={`iphone-12-pro-max:flex flex flex-col min-h-screen w-full font-movie px-5 ${themeUniver}`}>
            {!isLoading ? <div >Loading...</div>

                : <div>
                    <div>
                        <div className="translate-y-9">
                            <Link to={`${splitBooking}`}>
                                <box-icon name='chevron-left' size={"40px"} color={color}></box-icon>
                            </Link>
                        </div>
                        <h1 className='text-center font-logo'>Checkout</h1>
                    </div>

                    <div>
                        {payBookData && (
                            <div key={payBookData._id}>
                                <div className={`flex-shrink-0 w-[calc(100% / 3)] pr-2 mt-10 flex rounded-3xl p-5 ${buttonClasses} drop-shadow-xl`}>
                                    <img
                                        src={payBookData.poster}
                                        alt={payBookData.title}
                                        className="rounded-xl h-[100px] w-[100px] bg-contain object-cover"
                                    />
                                    <div className="flex flex-col justify-around pl-6">
                                        <div>

                                            <h2 className="font-[700] text-xl">{truncateText(payBookData.title, 15)}</h2>
                                            <p className="text-gray-300 text-xs">{payBookData.tomatoes && payBookData.tomatoes.production ? payBookData.tomatoes.production : 'hang phim ko ton tai'}</p>
                                        </div>
                                        <div className='flex gap-2 '>
                                            <FaStar color='yellow' />
                                            <span>{payBookData.imdb && payBookData.imdb.rating ? payBookData.imdb.rating : '0'}</span>
                                            <p>({payBookData.imdb && payBookData.imdb.votes ? payBookData.imdb.votes : ''} Reviews)</p>
                                        </div>
                                    </div>
                                </div>


                                <DoneBooking isOpenPay={isOpenPay} qrCode={qrData} dataTicket={dataTicket} />
                            </div>
                        )}
                        <div className='my-10'>
                            <h2 className='font-logo'>Payment Method</h2>
                            {data.map((itemm) => (
                                <div key={itemm.id}>
                                    <div className='flex justify-between my-5' onClick={() => handleChange(itemm.name)}>
                                        <div className='flex gap-2 items-center'>
                                            <div className={`${inputClasses} w-[50px] h-[50px] rounded-lg flex items-center justify-center`}>
                                                <img src={itemm.url} width={itemm.size} alt="" />
                                            </div>
                                            <div className='flex flex-col'>
                                                <h2 className='font-logo'>{itemm.name}</h2>
                                                <span>{formatCardNumber(itemm.number)}</span>
                                            </div>
                                        </div>
                                        <div className='cursor-pointer pt-2'>
                                            <input
                                                type="radio"
                                                name="radio-group"
                                                value={itemm.name}
                                                checked={selectedValue === itemm.name}
                                                onChange={() => handleChange(itemm.name)}
                                            />
                                        </div>
                                    </div>
                                    {selectedValue === itemm.name && (
                                        <button
                                            onClick={() => setIsOpen(true)}
                                            className={`border-primary-textMovie border-[1px] min-w-full flex items-center justify-center rounded-lg py-4 text-primary-textMovie `}
                                        >+ Add New Card</button>
                                    )}
                                    {/* <AddCard isOpen={isOpen} setIsOpen={setIsOpen} setItem={setItem} formValues={formValues} setData={setData} selectedValue={selectedValue} /> */}
                                </div>
                            ))}
                        </div>
                        <div className='h-[1px] w-full bg-gray-600'></div>
                        <div className='m-2 py-10 flex justify-between items-center'>
                            <div className=' flex gap-5 items-center'>
                                <img src="/assets/img/momo_icon_square_pinkbg_RGB.png" alt="momo_icon_square_pinkbg_RGB" width={35} />
                                <h2 className='font-logo'>Payment via qr code</h2>
                            </div>
                            <FaQrcode size={35} />
                        </div>
                        <div className='flex flex-col gap-10'>
                            <div>
                                <div className='h-[1px] w-full bg-gray-600'></div>
                                <div className='flex justify-between py-10'>
                                    <p>Item Total</p>
                                    <span>${Number(parsed.totalprice).toLocaleString()} USD</span>
                                </div>
                                <div className='flex justify-between'>
                                    <p>Discount</p>
                                    <span>- $5</span>
                                </div>
                            </div>
                            <div className='h-[1px] w-full bg-gray-600'></div>
                            <div className='flex justify-between mb-20 font-bold text-lg'>
                                <h2>Grand Total</h2>
                                <p>${Number(parsed.totalprice - 5).toLocaleString()} USD</p>
                            </div>
                        </div>
                    </div>

                    <button
                        className={`${buttonCLick} min-w-full flex items-center justify-center rounded-lg py-4 text-white`}
                        onClick={handlePay}
                        disabled={!isValid}
                    > {!isLoading ?  "Processing..." :"Pay Now"}</button>
                </div>}
        </div>
    );
};

export default Pay;
