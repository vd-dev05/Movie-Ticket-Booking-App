import { Link } from 'react-router-dom';
import { useItem } from '../../../../hooks/GetApi/ItemContext';
import { useThemeClasses } from '../../../../context/Theme/themeStyles';
import { truncateText } from '../../../../hooks/GetApi/GetApi';
import { useTheme } from '../../../../context/Theme';
import { FaStar } from 'react-icons/fa6';
import { useEffect, useState } from 'react';
import AddCard from './accept/addCard';
import DoneBooking from './accept/doneBooking';
import { useUser } from '../../../../hooks/GetApi/GetContext';
import { toast, ToastContainer } from 'react-toastify';
import { formatCardNumber } from '@/lib/fomatCard';
import { database } from '@/components/firebase/firebase';
import 'react-toastify/dist/ReactToastify.css';
import { dataMovie } from '@/hooks/GetApi/GetApi';
import { get, ref, update } from 'firebase/database';

const Pay = () => {
    const { buttonClasses, backGround, textClasses, inputClasses, themeUniver, btnSubmit, buttonCLick } = useThemeClasses();
    const { color } = useTheme();
    const { item, setItem } = useItem();
    const { dataUser } = useUser();
    const payData = JSON.parse(localStorage.getItem('pay'));

    const [selectedValue, setSelectedValue] = useState(null);
    const [isOpen, setIsOpen] = useState(false);
    const [isOpenPay, setIsOpenPay] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    
    // const [numberCard, setNumberCard] = useState({
    //     master: '',
    //     payPal: ''
    // });



    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            try {
                const dataNumberMasterCard = await dataMovie('users/userCard/MasterCard/numberCard');
                const dataNumberMasterPayPal = await dataMovie('users/userCard/PayPal/numberCard');

                // Simulate a loading delay
                // await new Promise(resolve => setTimeout(resolve, 500));

                // setNumberCard({
                //     master: dataNumberMasterCard,
                //     payPal: dataNumberMasterPayPal
                // });

                setData(prevData => prevData.map(item => {
                    if (item.name === 'MasterCard') {
                        return { ...item, number: dataNumberMasterCard || '' };
                    }
                    if (item.name === 'Paypal') {
                        return { ...item, number: dataNumberMasterPayPal || '' };
                    }
                    return item;
                }));
            } catch (error) {
                console.log(error);
            } finally {
                setIsLoading(false);
            }
        };
        const fetchPayBookData = async () => {
            setIsLoading(true);
            try {
                const data = await dataMovie('users/dataTicket/book');
                const dataTic = data.filter(item => item.id == localStorage.getItem('pay'));
                setpayBookData(dataTic);
            } catch (error) {
                console.log(error);
            } finally {
                setIsLoading(false);
            }
        };
        
        fetchData();
        
        return () =>  fetchPayBookData();
    }, []);

    const [data, setData] = useState([
        { id: 1, name: 'MasterCard', number: "", url: '/assets/img/masterCard.png', size: null, select: false },
        { id: 2, name: 'Paypal', number: "", url: '/assets/img/payPal.png', size: 35, select: false }
    ]);
    // console.log(numberCard);
    // console.log(data)

    const [payBookData, setpayBookData] = useState(null);
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
        try {
            const userRefData = ref(database, 'users/userCard/' + selectedValue);
            await update(userRefData, item.userCard);
        } catch (error) {
            console.error("Error initializing user data:", error);
        }
        const d1= data.findIndex((item) => item.number )
        // console.log(d1);
        
        if (d1 == '0' ) {
            try {
                const PayRef = ref(database, 'users/dataTicket/book');
                const snapshot = await get(PayRef);
                if (snapshot.exists()) {
                    const data = snapshot.val();
                    for (const key in data) {
                        if (data[key].id == localStorage.getItem('pay')) {
                            await update(ref(database, `users/dataTicket/book/${key}`), {
                                paid: true,
                            });
                            setIsOpenPay(true)
                            return;
                        }
                    }
                    console.log("No matching booking found.");
                } else {
                    console.log("No data found in 'book' path.");
                }
            } catch (error) {
                console.error("Error updating data:", error);
            }

       
        }

        const d = data.find(({ select }) => select === true);
        // console.log(d.select);
        // if (d.select  ) {
        //     setIsOpenPay(true)
        // }
        if (d === undefined || d1 == '1') {
            toast.info('You need to add a payment card', {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
        }
    };

    return (
        <div className={`iphone-12-pro-max:flex flex flex-col min-h-screen w-full font-movie px-5 ${themeUniver}`}>
            {isLoading ? <div >Loading...</div>

                : <div>
                    <div>
                        <div className="translate-y-9">
                            <Link to="/boking">
                                <box-icon name='chevron-left' size={"40px"} color={color}></box-icon>
                            </Link>
                        </div>
                        <h1 className='text-center font-logo'>Checkout</h1>
                    </div>

                    <div>
                        {payBookData ? payBookData.map((item) => (
                            <div key={item.id}>
                                <div className={`flex-shrink-0 w-[calc(100% / 3)] pr-2 mt-10 flex rounded-3xl p-5 ${buttonClasses} drop-shadow-xl`}>
                                    <img
                                        src={item.poster}
                                        alt={item.Title}
                                        loading="lazy"
                                        className="rounded-xl h-[100px] w-[100px] bg-contain object-cover"
                                    />
                                    <div className="flex flex-col justify-around pl-6">
                                        <h2 className="font-[700] text-xl">{truncateText(item.title, 15)}</h2>
                                        <p className="text-gray-300 text-xs">{item.theFirm}</p>
                                        <div className='flex gap-2'>
                                            <FaStar color='yellow' />
                                            <span>{payData.rateLive ? payData.rateLive : '0'}</span>
                                            <p>({payData.review} Reviews)</p>
                                        </div>
                                    </div>
                                </div>

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
                                            <AddCard isOpen={isOpen} setIsOpen={setIsOpen} setItem={setItem} formValues={formValues} setData={setData} selectedValue={selectedValue} />
                                        </div>
                                    ))}
                                </div>

                                <div className='flex flex-col gap-10'>
                                    <div>
                                        <div className='h-[1px] w-full bg-gray-600'></div>
                                        <div className='flex justify-between py-10'>
                                            <p>Item Total</p>
                                            <span>${Number(item.total).toLocaleString()} USD</span>
                                        </div>
                                        <div className='flex justify-between'>
                                            <p>Discount</p>
                                            <span>- $5</span>
                                        </div>
                                    </div>
                                    <div className='h-[1px] w-full bg-gray-600'></div>
                                    <div className='flex justify-between mb-20 font-bold text-lg'>
                                        <h2>Grand Total</h2>
                                        <p>${Number(item.total - 5).toLocaleString()} USD</p>
                                    </div>
                                </div>
                                <DoneBooking isOpenPay={isOpenPay} payBookData={item.codeQr} />
                            </div>
                        )) : null}
                    </div>

                    <button
                        className={`${buttonCLick} min-w-full flex items-center justify-center rounded-lg py-4 text-white`}
                        onClick={handlePay}
                    >Pay Now</button>
                </div>}



            <ToastContainer />
        </div>
    );
};

export default Pay;
