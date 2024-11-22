import { useThemeClasses } from "@/context/Theme/themeStyles";
import { truncateText } from "@/hooks/GetApi/GetApi";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { AppstoreOutlined, MailOutlined, SettingOutlined } from '@ant-design/icons';
import { FaStar } from "react-icons/fa";
import { FaSortAlphaUp } from "react-icons/fa";
import { Menu, Switch } from 'antd';
import { FaCalendarDays } from "react-icons/fa6";
import MovieController from "@/services/movie/Movie.controller"
const items = [
    {
        key: 'sub1',
        label: 'Sort Rating',
        icon: <FaStar  />,
        children: [
            {
                key: '1',
                label: '1 stars',
            },
            {
                key: '2',
                label: '2 stars',
            },{
                key: '3',
                label: '3 stars',
            },
            {
                key: '4',
                label: '4 stars',
            },
            {
                key: '5',
                label: `5 stars`,
            },
         
        ],
    },
    {
        key: 'sub2',
        label: 'Year of release',
        icon: <FaCalendarDays/>,
        children: [
            {
                key: '6',
                label: `2024 -> 1999`,
            },
            {
                key: '7',
                label: `1999 -> 2024`,
            },
    
        ],
    },
   
];
const Genners = () => {
    const { themeUniver, buttonClasses, textClasses } = useThemeClasses()
    const loacaltion = useLocation()
    const split = loacaltion.pathname.split("/")[2]
    const [data, setData] = useState([])
    const [theme, setTheme] = useState('dark');
    const [current, setCurrent] = useState('5');
    const [message,setMessage] = useState({
        year : null,
        rating : null,
        geners : split 
    })
    const onClick = (e) => {    

        if (e.key ==  6 ) {
            setMessage(pre => ({
                ...pre ,
                rating  :null,
                year : -1
            }))
        } else if (e.key == 7) {
            setMessage(pre => ({
                ...pre,
                rating  :null,
                year : 1
            }))
        } else  {
            setMessage(pre => ({
                ...pre,
                year  :null,
                rating : Number(e.key)
            }))
        }
        
       
        
    };
    useEffect(() => {
        (
            async () => {
                try {
                    const response = await MovieController.getGenersMovie(message)
                } catch (error) {
                    console.log(error);
                    
                }
            }
        )()
    }, [message,setMessage])
    
    useEffect(() => {
        const fetechData = async () => {
            try {
                const response = await axios.get('https://66cdd4778ca9aa6c8ccbcc08.mockapi.io/data/v1/data')
                setData(response.data)

               
                
            } catch (error) {
                console.log(error);

            }
        }
        fetechData()
    }, [])
    return (
        <div >

            <div className={`iphone-12-pro-max:flex flex flex-col min-h-screen font-movie px-5 pt-10 pb-20 ${themeUniver} `}>

                <h1 className="text-center font-logo">{split.toUpperCase()}</h1>
                <div className="fixed left-0 top-10  z-50"> 
                <Menu
                            theme={theme}
                            onClick={onClick}
                            style={{
                                width: 170,
                               
                                fontSize : 12,
                                
                            }}
                            defaultOpenKeys={['sub1']}
                            selectedKeys={[current]}
                            mode="horizontal"
                            items={items}
                        />

                </div>
              
              


              
                <div className="grid grid-cols-2 gap-10 mt-10    ">
              
                    {data.length > 0 ? data.map((item) => (

                        <div key={item.id} >
                            <Link to={`/details/${item._id}`} state={{ data: item }} className={` hover:${textClasses}`}>
                                <div className=" saturate-100" >
                                    <img src={item.poster} alt={item.title} className="rounded-2xl  h-[350px] w-full  bg-cover  object-cover"></img>
                                </div>
                                <div className="mt-2">
                                    <h2 className={`font-[700]  ${textClasses} `}>{truncateText(item.title, 20)}</h2>
                                    <p className="text-gray-400 text-xs">{item.tomatoes && item.tomatoes.production ? item.tomatoes.production : 'hang phim ko ton tai'}</p>
                                </div>
                            </Link>

                        </div>

                    )) : <div className={`flex-shrink-0 w- pr-2 mt-10 flex  rounded-3xl p-5 ${buttonClasses}`}>
                        <div className="animate-pulse flex space-x-4">
                            <div className="rounded-xl bg-slate-700 h-[100px] w-[100px]"></div>
                            <div className="flex-1 space-y-6 py-1">
                                No {split} here.
                                {/* <div className="h-2 bg-slate-700 rounded w-[200px]"></div> */}
                                <div className="space-y-10">
                                    Please movie gener {split}
                                    <div className="grid grid-cols-3 gap-4">

                                        {/* <div class="h-2 bg-slate-700 rounded col-span-2"></div>
                                        <div class="h-2 bg-slate-700 rounded col-span-1"></div> */}
                                    </div>
                                    {/* <div class="h-2 bg-slate-700 rounded"></div> */}
                                </div>
                            </div>
                        </div>
                    </div>}



                </div>

            </div>
        </div>
    );
}

export default Genners;