import { useContext, useState } from 'react';
import { FaHome, FaSearch, FaRegHeart } from 'react-icons/fa';
import { TbUserSquareRounded } from "react-icons/tb";
import { LuTicket } from "react-icons/lu";
import { Link } from 'react-router-dom';
import { useThemeClasses } from '../../../context/Theme/themeStyles';
// import {useTheme} from '../Theme';
// import {}
const Nav = ({ data }) => {

    const { buttonClasses, btnSubmit,buttonNav } = useThemeClasses()

    const [activeTab, setActiveTab] = useState(data);
    const handleClick = (tab) => {
        setActiveTab(tab);
    };
    const NavButton = ({ label, icon, isActive, onClick }) => (
        <div >
            <div>
            <button
                className={`flex  justify-center items-center text-sm ${isActive ? btnSubmit : `text-gray-400 ${buttonClasses}`  } p-2 rounded-lg transition-colors duration-300 ease-in-out`}
                onClick={onClick}
            >
                <div className="text-xl">{icon}</div>
                {isActive && <span className="pl-2">{label}</span>}
            </button>
            </div>
          
        </div>

    );
    return (
        <div className={`fixed bottom-0 w-full h-20  shadow-lg flex justify-between p-5 z-40 xl:hidden ${buttonClasses} `}>
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

            <Link to="/love">
                <NavButton
                    label="Love Movie"
                    icon={<FaRegHeart />}
                    isActive={activeTab === 'love'}
                    onClick={() => handleClick('love')}
                />
            </Link>

            <Link to="/ticket">
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
