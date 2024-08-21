import { Link, useLocation } from 'react-router-dom';
import { useItem } from '../GetApi/ItemContext';
import { useThemeClasses } from '../../Theme/themeStyles';
import { truncateText } from '../GetApi/GetApi'
import { useTheme } from '../../Theme';
import { FaStar } from "react-icons/fa6";
import { Button } from '@/components/ui/button';
import { useEffect, useState } from 'react';
import AddCard from './accept/addCard';
import DoneBooking from './accept/doneBooking';
const Pay = () => {
    // const { item } = useItem();
    const { buttonClasses, backGround, textClasses, inputClasses } = useThemeClasses()
    const { color } = useTheme()
    const themeCtx = useTheme()
    const item = JSON.parse(localStorage.getItem('pay'))
    // console.log(test);
    // const [state, setState] = useState({
    //     value: [],
    // })
    const [selectedValue, setSelectedValue] = useState(null);
    const [data, setData] = useState([
        { id: 1, name: "MasterCard", number: [], url: "/src/assets/img/masterCard.png", size: null, },
        { id: 2, name: "Paypal", number: [], url: "/src/assets/img/payPal.png", size: 35 }
    ])
    const handleAddCard = () => {

    }
    const handleChange = (value) => {
        console.log(value);

        setSelectedValue(value);
    };
    const [formValues, setFormValues] = useState({
        nameCard: '',
        numberCard: '',
        date: '',
        numberCVV: '',
        card: '',
    });
    const handleChangeCard = (event) => {


        const { name, value } = event.target;
        setFormValues({
            ...formValues,
            [name]: value
        });
    };
    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(formValues);


    };
    const Test = () => {
        console.log(selectedValue);
        console.log(formValues);
        // const data1 = data
        // console.log(data1.id);

    }


    return (
        <div className={`iphone-12-pro-max:flex flex flex-col min-h-screen w-full    font-movie px-5 ${backGround}${textClasses}`}>
            <div>
                <div className="translate-y-9">
                    <Link to="/lmovie">
                        <box-icon name='chevron-left' size={"40px"} color={color}> </box-icon>
                    </Link>

                </div>
                <h1 className='text-center font-logo'>Checkout</h1>
            </div>
            <div>
                <div key={item.id} className={`flex-shrink-0 w-[calc(100% / 3)] pr-2 mt-10 flex  rounded-3xl p-5 ${buttonClasses} drop-shadow-xl`}>
                    <div className="">
                        <img
                            src={item.poster}
                            alt={item.Title}
                            loading="lazy"
                            className="rounded-xl h-[100px] w-[100px] bg-contain object-cover "
                        />
                    </div>
                    <div className="flex flex-col justify-around pl-6">
                        <h2 className="font-[700] text-xl" >{truncateText(item.title, 15)}</h2>
                        <p className="text-gray-300 text-xs">{item.theFirm}</p>
                        {/* <p className="text-xs">Language:{item.language}</p> */}
                        <div className='flex'>
                            < FaStar color='yellow' />
                            <span>{item.rateLive}</span>
                            <p>({item.review} Reviews)</p>
                        </div>

                    </div>

                </div>
            </div>
            <div className='my-10'>
                <h2 className='font-logo '>Payment Method</h2>
                <div>
                    <button onClick={Test}>OnclickTest</button>
                    {data.map((item, idx) => (
                        <div key={idx}>
                            <div className='flex justify-between my-5' onClick={() => handleChange(item.name)}  >
                                <div className='flex gap-2 items-center'>
                                    <div className={`${inputClasses} w-[50px]  h-[50px] rounded-lg flex items-center justify-center `}>
                                        <img src={item.url} width={item.size} alt="" />
                                    </div>
                                    <div className='flex flex-col'>
                                        <h2 className='font-logo'>{item.name}</h2>
                                        <span>{item.name === selectedValue && selectedValue === data.name ? formValues.numberCard : ""}</span>
                                    </div>
                                </div>
                                <div className='cursor-pointer  pt-2 '>
                                    <input
                                        type="radio"
                                        name="radio-group"
                                        value={item.name}
                                        checked={selectedValue === item.name}
                                        onChange={() => handleChange(item.name)}
                                    /></div>

                            </div>
                            {selectedValue === item.name && (
                                //        <div onClick={handleAddCard} className={` border-primary-textMovie border-[1px] flex items-center justify-center rounded-lg py-3  text-primary-textMovie ${themeCtx.theme == 'dark' ? ' bg-none' : 'bg-white'}`}>

                                // </div> 
                                <AddCard text={"+ Add New Card"} onSubmit={handleSubmit} onChange={handleChangeCard} formValues={formValues}></AddCard>
                            )}

                        </div>


                    ))}
                </div>
            </div>
            <div className='flex flex-col gap-10'>
                <div >
                    <div className='h-[1px] w-full bg-gray-600'></div>
                    <div className='flex justify-between py-10'>
                        <p>Item Total</p>
                        <span>$10</span>
                    </div>
                    <div className='flex justify-between '>
                        <p>Discount</p>
                        <span>$5</span>
                    </div>
                </div>
                <div className='h-[1px] w-full bg-gray-600'></div>
                <div className='flex justify-between mb-20 font-bold text-lg'>
                    <h2>Grand Total</h2>
                    <p >$5</p>
                </div>
            </div>
            <div  >
                <DoneBooking text={"Pay Now"} ></DoneBooking>
            </div>
        </div>

    );
}

export default Pay; 