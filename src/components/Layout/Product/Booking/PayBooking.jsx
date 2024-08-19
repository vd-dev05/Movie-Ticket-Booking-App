import { Link, useLocation } from 'react-router-dom';
import { useItem } from '../GetApi/ItemContext';
import { useThemeClasses } from '../../Theme/themeStyles';
import {truncateText    } from '../GetApi/GetApi'
import { useTheme } from '../../Theme';
const Pay = () => {
    const { item } = useItem();
    const {buttonClasses,backGround,textClasses} = useThemeClasses()
    const {color} = useTheme()
    const themeCtx = useTheme()
    console.log(item);

    return (
        <div className={`iphone-12-pro-max:flex flex flex-col h-[100vh] min-w-max font-movie px-5 ${backGround}${textClasses}`}>
            <div>
                <div className="translate-y-9">
                    <Link to="/lmovie">
                        <box-icon name='chevron-left' size={"40px"} color={color}> </box-icon>
                    </Link>

                </div>
                <h1 className='text-center font-logo'>Checkout</h1>
            </div>
            <div>
                <div key={item.id} className={`flex-shrink-0 w-[calc(100% / 3)] pr-2 mt-10 flex  rounded-3xl p-5 ${buttonClasses}`}>
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
                        <p className="text-gray-400 text-xs">{item.theFirm}</p>
                        <p className="text-xs">Language:{item.language}</p>
                    </div>

                </div>
            </div>
        </div>
    );
}

export default Pay;