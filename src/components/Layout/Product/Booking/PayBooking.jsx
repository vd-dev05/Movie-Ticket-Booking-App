import { Link } from 'react-router-dom';
import { useItem } from '../GetApi/ItemContext';
import { useThemeClasses } from '../../Theme/themeStyles';
import { truncateText } from '../GetApi/GetApi';
import { useTheme } from '../../Theme';
import { FaStar } from 'react-icons/fa6';
import { useEffect, useState } from 'react';
import AddCard from './accept/addCard';
import DoneBooking from './accept/doneBooking';
import { useUser } from '../GetApi/GetContext';
import { toast, ToastContainer } from 'react-toastify';
import { formatCardNumber } from '@/lib/fomatCard'
import { set } from 'date-fns';
const Pay = () => {
    const { buttonClasses, backGround, textClasses, inputClasses } = useThemeClasses();
    const { color } = useTheme();
    const { item, setItem } = useItem();
    // console.log(item);
    // console.log(item.userCard.numberCard);

    const { dataUser } = useUser();
    const payData = JSON.parse(localStorage.getItem('pay'));

    const [selectedValue, setSelectedValue] = useState(null);
    const [isOpen, setIsOpen] = useState(false)
    const [isOpenPay, setIsOpenPay] = useState(false)
    // const [message,setMessage] = useState()
    const [data, setData] = useState([
        { id: 1, name: 'MasterCard', number: '', url: '/assets/img/masterCard.png', size: null, select: false },
        { id: 2, name: 'Paypal', number: '', url: '/assets/img/payPal.png', size: 35, select: false }
    ]);

    const [formValues, setFormValues] = useState({
        nameCard: '',
        numberCard: '',
        date: '',
        numberCVV: '',
    });


    // useEffect(() => {

    //     setData(prevData => prevData.map(i => 
    //         i.name === selectedValue ? { ...i, number: item.userCard.numberCard ? item.userCard.numberCard :null } : i
    //     ));
    // }, [item, selectedValue]);

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

    const handlePay = () => {
        
        const d = data.findIndex(item => item.select)
        console.log(d);

        if (d === -1) {
            toast.info('You need to add a payment card', {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                
                // transition: Bounce,
            });
        } 
        if (d === 0) {
            setIsOpenPay(true)
        
        }
        
      
        // if (d == "0") {
           
        //         setTimeout(() => {
        //             setIsOpenPay(true)
        //         }, 500);
                    
        // }
        // else {
        //     toast.success('Successful Payment', {
        //         position: "top-right",
        //         autoClose: 3000,
        //         hideProgressBar: false,
        //         closeOnClick: true,
        //         pauseOnHover: true,
        //         draggable: true,
        //         progress: undefined,
        //         theme: "light",
        //         // transition: Bounce,
        //     });
        //     setIsOpenPay(true)
        // }
        
      
    }
    const Test = () => {
        // console.log(selectedValue);
        // console.log(formValues);
        // console.log(item);
        console.log('data', data);
    };

    return (
        <div className={`iphone-12-pro-max:flex flex flex-col min-h-screen w-full font-movie px-5 ${backGround} ${textClasses}`}>
            <div>
                <div className="translate-y-9">
                    <Link to="/lmovie">
                        <box-icon name='chevron-left' size={"40px"} color={color}></box-icon>
                    </Link>
                </div>
                <h1 className='text-center font-logo'>Checkout</h1>
            </div>
            <div>
                <div key={payData.id} className={`flex-shrink-0 w-[calc(100% / 3)] pr-2 mt-10 flex rounded-3xl p-5 ${buttonClasses} drop-shadow-xl`}>
                    <div className="">
                        <img
                            src={payData.poster}
                            alt={payData.Title}
                            loading="lazy"
                            className="rounded-xl h-[100px] w-[100px] bg-contain object-cover"
                        />
                    </div>
                    <div className="flex flex-col justify-around pl-6">
                        <h2 className="font-[700] text-xl">{truncateText(payData.title, 15)}</h2>
                        <p className="text-gray-300 text-xs">{payData.theFirm}</p>
                        <div className='flex'>
                            <FaStar color='yellow' />
                            <span>{payData.rateLive}</span>
                            <p>({payData.review} Reviews)</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className='my-10'>
                <h2 className='font-logo'>Payment Method</h2>
                <div>
                    <button onClick={Test}>OnclickTest</button>
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
                                    onClick={() => setIsOpen(true)
                                    }
                                    className={`border-primary-textMovie border-[1px] min-w-full flex items-center justify-center rounded-lg py-4 text-primary-textMovie ${backGround}`}
                                >+ Add New Card</button>
                            )}
                            <AddCard isOpen={isOpen} setIsOpen={setIsOpen} setItem={setItem} formValues={formValues} setData={setData} selectedValue={selectedValue} />
                        </div>
                    ))}
                </div>
            </div>
            <div className='flex flex-col gap-10'>
                <div>
                    <div className='h-[1px] w-full bg-gray-600'></div>
                    <div className='flex justify-between py-10'>
                        <p>Item Total</p>
                        <span>${Number(dataUser.total).toLocaleString()} USD</span>
                    </div>
                    <div className='flex justify-between'>
                        <p>Discount</p>
                        <span>- $5</span>
                    </div>
                </div>
                <div className='h-[1px] w-full bg-gray-600'></div>
                <div className='flex justify-between mb-20 font-bold text-lg'>
                    <h2>Grand Total</h2>
                    <p>${Number(dataUser.total - 5).toLocaleString()} USD</p>
                </div>
            </div>
            <div>
                <button
                    className={`bg-chairMovie-chairSelected   min-w-full flex items-center justify-center rounded-lg py-4 text-white  `}
                    onClick={handlePay}
                >Pay Now</button>

                <DoneBooking isOpenPay={isOpenPay} />
            </div>
            <ToastContainer></ToastContainer>

        </div>
    );
};

export default Pay;
