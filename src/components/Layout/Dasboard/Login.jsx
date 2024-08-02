import React, { useEffect, useState, useMemo, useCallback } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [data, setData] = useState([]);
    const [header, setHeader] = useState({
        text: 'Find the latest and greatest movie here',
        highlight: 'latest and greatest',
        img: 'src/assets/img/1.png'
    });
    const navigate = useNavigate();
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('/api/banner.json');
                setData(response.data);
                if (response.data.length > 0) {
                  
                    const { titleH1, titleColor, url } = response.data[0];
                    setHeader({
                        text: titleH1,
                        highlight: titleColor,
                        img: url
                    });
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();

     

    }, []);
    
    const handleClick = useCallback(() => {
        const nextIndex = (selectedIndex + 1) ;
        // console.log(nextIndex);
        setTimeout(() => {
            if (nextIndex == 2) {
                navigate('/L');
            }
          
        },0);

        
        if (data.length > 0) {
            const { titleH1, titleColor, url } = data[nextIndex];
            setSelectedIndex(nextIndex);
            setHeader({
                text: titleH1,
                highlight: titleColor,
                img: url
             
            });
        }
    }, [data, selectedIndex]);

    const getHighlightedText = useMemo(() => {
        const { text, highlight } = header;
        const parts = text.split(highlight);
        return (
            <>
                {parts[0]}
                <span className="text-primary-textMovie">{highlight}</span>
                {parts[1]}
            </>
        );
    }, [header]);
    // console.log(header);
    return (
        <div className="iphone-12-pro-max:flex  flex-col text-left font-movieTicket font-bold">
        <h1 className="text-[30px] p-5 ">
            {getHighlightedText}    
        </h1>
        <p className="font-normal px-5 ">
            {data.length > 0 ? data[selectedIndex].p : 'Initial paragraph text.'}
        </p>

        <ul className="text-[#d9e1e1] flex mt-5 px-5">
            {data.length > 0 ? (
                data.map((item, index) => (
                    <li
                        key={index}
                        className={`mr-1 p-1 rounded-lg ${selectedIndex === index ? 'bg-primary-textMovie text-white w-10 h-1 list-none transition ease-out delay-100' : 'bg-gray-300'}`}
                    >
                   
                    </li>
                ))
            ) : (
                <p>Error</p>
            )}
        </ul>
        <div className='px-3 '>
            <button
                className='text-left bg-primary-textMovie mt-5 w-[50px] h-[50px] flex justify-center items-center rounded-full'
                onClick={handleClick}
            >
                <box-icon name='right-arrow-alt' color ="white"></box-icon>
            </button>
        </div>
        <div className="flex justify-center items-center overflow-hidden ">
            <img
                src={header.img}
                alt="Banner"
                className="h-[600px] w-full object-cover "
            />
        </div>
    </div>
    )
}

export default Login;
