import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { AiOutlineVideoCamera } from "react-icons/ai";
import { IoMdTime } from "react-icons/io";
import { CiStar } from "react-icons/ci";
import { Button } from '@/components/ui/button';
import { convertMinutesToHhMm, truncateText } from '../GetApi/GetApi';
import { useTheme } from '../../Theme';
import { useThemeClasses } from '../../Theme/themeStyles';
import { useItem } from '../GetApi/ItemContext';
import { FaRegHeart, FaHeart } from "react-icons/fa";
import { get, ref, remove, set, update } from 'firebase/database';
import { database } from '@/components/firebase/firebase';
import { toast, ToastContainer } from 'react-toastify';
import { useUser } from '../GetApi/GetContext';
import { PostData } from '../GetApi/PostApiBook';
const ItemLove = () => {
    const themeCtx = useTheme();
    const { color } = useTheme();

    const {setDataUser} = useUser()

    const location = useLocation();
    const { data } = location.state || {};
    // setDataUser(pre => ({...pre,dataIdBook:data}))
    const check = data;
    const { item } = useItem();
    const { buttonClasses, inputClasses, textClasses, backGround, themeUniver, buttonCLick } = useThemeClasses();
    
    const [IsTrue, setIsTrue] = useState(false);

    useEffect(() => {


      setDataUser(pre => ({...pre,dataIdBook:data}))
        const LoveData = async () => {
            const loveRef = ref(database, 'users/loveMovie');
            const snapshot = await get(loveRef);
            const currentArray = snapshot.exists() ? snapshot.val() : [];

            // Kiểm tra xem ID có tồn tại trong danh sách yêu thích không
            const isInLoveList = currentArray.some(item => item.id === check.id);
            setIsTrue(isInLoveList);
        }
        LoveData();
    }, [check.id,setDataUser]);

    useEffect(  () => {
        (
            async () => {
                try {
                    const loveRef = ref(database, 'users/dataLastMovie');
                    const snapshot = await get(loveRef);
                    let currentArray = snapshot.exists() ? snapshot.val() : [];
        
                    if (currentArray.some(item => item.id === check.id)) {
                        // toast.warning("Movie already in the love list.");
                        return;
                    }
                    currentArray.push(check);
                    await set(loveRef, currentArray); 
                } catch (error) {
                    console.error('Error adding to love list:', error);
                    // toast.error("Failed to add to love list.");
                }
            }
        )()
       
    }, [])
    

    const handleRemoveLove = async () => {
        const loveRef = ref(database, 'users/loveMovie');
        const snapshot = await get(loveRef);

        if (snapshot.exists()) {
            const data = snapshot.val();

            for (const key in data) {
                if (data[key].id === check.id) {
                    await remove(ref(database, `users/loveMovie/${key}`));
                    toast.success("Remove List Successfully");
                    setIsTrue(false); 
                    return;
                }
            }
        } else {
            console.log("Danh sách 'loveMovie' trống.");
        }
    };

    const handleAddLove = async () => {
        try {
            const loveRef = ref(database, 'users/loveMovie');
            const snapshot = await get(loveRef);
            let currentArray = snapshot.exists() ? snapshot.val() : [];

            if (currentArray.some(item => item.id === check.id)) {
                toast.warning("Movie already in the love list.");
                return;
            }

            currentArray.push(check);
            await set(loveRef, currentArray);
            toast.success("Add Successful!");
            setIsTrue(true); 
        } catch (error) {
            console.error('Error adding to love list:', error);
            toast.error("Failed to add to love list.");
        }
    };

    const handlePayData = async  (data) => {    
        // console.log(data);   
        // localStorage.setItem('pay',data.id)
        // console.log(data.id);
        localStorage.setItem('pay',data.id)

        const userRefData = ref(database, '/users/dataTicket/' + 'book');
        const dataBook = await get(userRefData) 

        let arrBook = dataBook.exists() ? dataBook.val() :[];

        if (arrBook.some(item => item.id === data.id) ) {
            console.log("fasle");
        }else {
            const postData = PostData(data); 
            arrBook.push(postData)
            await set(userRefData,arrBook)
        }


        // console.log(dataBook.exists());
        
        // let arrData = 
        // await set(userRefData, PostData  )


    }
    return (
        <div>  
            <div className={`iphone-12-pro-max:flex flex flex-col min-h-screen  font-movie px-5 ${themeUniver}`}>
                <div>
                    <div className="translate-y-9">
                        <Link to="/love">
                            <box-icon name='chevron-left' size={"40px"} color={color} />
                        </Link>
                    </div>  
                    <h1 className='text-center font-logo'>Movie Details</h1>
                </div>

                <div className='flex mt-10'>
                    <div className='w-full'>
                        <img src={data.poster} loading='lazy' alt="poster" className='rounded-2xl h-[300px] w-full object-cover' />
                    </div>

                    <div className='flex flex-col justify-between px-10 text-center'>
                        <div className='flex flex-col items-center'>
                            <AiOutlineVideoCamera className={`${themeCtx.theme === 'travel' ? 'text-[#09FBD3]' : 'text-primary-textMovie'}`} size={35} />
                            <span className='text-gray-400'>Type</span>
                            <p className='font-logo'>{data.type[0]}</p>
                        </div>

                        <div className='flex flex-col items-center'>
                            <div><IoMdTime className={`${themeCtx.theme === 'travel' ? 'text-[#09FBD3]' : 'text-primary-textMovie'}`} size={35} /></div>
                            <span className='text-gray-400'>Duration</span>
                            <p className='font-logo text-sm'>{convertMinutesToHhMm(data.runtime)}</p>
                        </div>

                        <div className='flex flex-col items-center'>
                            <div><CiStar className={`${themeCtx.theme === 'travel' ? 'text-[#09FBD3]' : 'text-primary-textMovie'}`} size={35} /></div>
                            <span className='text-gray-400'>Rating</span>
                            <p className='font-logo'>{Number(data.rate).toFixed(1)}/10</p>
                        </div>
                    </div>
                </div>
                <div className='my-5 flex justify-between items-center'>
                    <div>
                        <h2 className='font-w900'>{data.title}</h2>
                        <p className='text-gray-400 mt-2'>{data.theFirm}</p>
                    </div>

                    <div>
                        {IsTrue
                            ? <div
                                onClick={handleRemoveLove}
                                className={`flex w-[200px] p-4 items-center gap-2 ${buttonCLick} cursor-pointer`} >
                                <span><FaHeart size={30} /></span>
                                <p>Remove List</p>
                            </div>
                            : <div
                                onClick={handleAddLove}
                                className={`flex w-[200px] p-4 items-center gap-5 ${buttonCLick} cursor-pointer`}>
                                <span><FaRegHeart size={30} /></span>
                                <p>Add List</p>
                            </div>
                        }
                    </div>
                </div>
                <div>
                    <h2 className='font-w900'>Descriptions</h2>
                    <p>{data.description}</p>
                </div>
                <div className={`${buttonCLick} h-16 mt-10 w-full`}>
                    <Link className='text-white hover:text-white' to="/boking" state={data.id} onClick={() => handlePayData(data)}>
                        <Button className="w-full text-xl">Select Seat</Button>
                    </Link>
                </div>
            </div>

            <ToastContainer />
        </div>
    );
};

export default ItemLove;
