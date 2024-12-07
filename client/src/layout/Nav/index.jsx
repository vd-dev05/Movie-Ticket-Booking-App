import { useContext, useState } from 'react';
import { FaHome, FaSearch, FaRegHeart } from 'react-icons/fa';
import { TbUserSquareRounded } from "react-icons/tb";
import { LuTicket } from "react-icons/lu";
import { Link } from 'react-router-dom';
import { useThemeClasses } from '@/context/Theme/themeStyles';
// import {useTheme} from '../Theme';
// import {}
const Nav = ({ data }) => {

    const { buttonClasses, btnSubmit, buttonNav } = useThemeClasses()

    const [activeTab, setActiveTab] = useState(data);
    const handleClick = (tab) => {
        setActiveTab(tab);
    };
    const NavButton = ({ label, icon, isActive, onClick }) => (
        <div >
            <div>
                <button
                    className={`flex  justify-center items-center text-sm ${isActive ? btnSubmit : `text-gray-400 ${buttonClasses}`} p-2 rounded-lg transition-colors duration-300 ease-in-out`}
                    onClick={onClick}
                >
                    <div className="text-xl">{icon}</div>
                    {isActive && <span className="pl-2">{label}</span>}
                </button>
            </div>

        </div>

    );
    return (
        <div className={`fixed bottom-0 w-full h-20  shadow-lg flex justify-between p-5 z-40 xl:hidden ${buttonClasses}  `}>
            <Link to="/home" className='bg-none'>
                <NavButton
                    label="Home"
                    icon={<FaHome />}
                    isActive={activeTab === 'home'}
                    onClick={() => handleClick('home')}
                />
            </Link>

            <Link to="/search">
                <NavButton
                    label="Search"
                    icon={<FaSearch />}
                    isActive={activeTab === 'search'}
                    onClick={() => handleClick('search')}
                />
            </Link>
            <Link to="/sorts">
                <NavButton
                    label="Sorts Trailer"
                    icon={
                        <div style={{ width: '100%', height: '100%', display: 'block', fill: 'currentColor' }}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" height="24" viewBox="0 0 24 24" width="24" focusable="false" aria-hidden="true" style={{ pointerEvents: 'none', display: 'inherit', width: '100%', height: '100%' }}>
                                <path
                                    clipRule="evenodd"
                                    d="M18.45 8.851c1.904-1.066 2.541-3.4 1.422-5.214-1.119-1.814-3.57-2.42-5.475-1.355L5.55 7.247c-1.29.722-2.049 2.069-1.968 3.491.081 1.423.989 2.683 2.353 3.268l.942.404-1.327.742c-1.904 1.066-2.541 3.4-1.422 5.214 1.119 1.814 3.57 2.421 5.475 1.355l8.847-4.965c1.29-.722 2.049-2.068 1.968-3.49-.081-1.423-.989-2.684-2.353-3.269l-.942-.403 1.327-.743ZM10 14.567a.25.25 0 00.374.217l4.45-2.567a.25.25 0 000-.433l-4.45-2.567a.25.25 0 00-.374.216v5.134Z"
                                    fillRule="evenodd"
                                />
                            </svg>
                        </div>
                    }
                    isActive={activeTab === 'sorts'}
                    onClick={() => handleClick('sorts')}
                />
            </Link>

            <Link to={localStorage.getItem('access_token') ? '/ticket' : '/login'}>
                <NavButton
                    label="My Tickets"
                    icon={<LuTicket size={25} className='-translate-y-[2px]' />}
                    isActive={activeTab === 'tickets'}
                    onClick={() => handleClick('tickets')}
                />
            </Link>

            <Link to="/profile">
                <NavButton
                    label="Profile"
                    icon={<TbUserSquareRounded size={25} className='-translate-y-[3px]' />}
                    isActive={activeTab === 'user'}
                    onClick={() => handleClick('user')}
                />
            </Link>
        

        </div>
    )

}

export default Nav
