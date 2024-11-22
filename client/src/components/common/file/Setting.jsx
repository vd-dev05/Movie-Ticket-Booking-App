import { IoMdArrowRoundBack, IoIosNotificationsOutline } from "react-icons/io";
import { FaSearch ,FaHistory } from "react-icons/fa";
import { useThemeClasses } from "@/context/Theme/themeStyles";
import { TbWorld ,TbFileSearch } from "react-icons/tb";
import { BiFontSize } from "react-icons/bi";
import { FaTicket } from "react-icons/fa6";
const stylesClassName = {
    textH2: 'text-xl font-bold',
    parentText: 'text-gray-500 ',
    flexNavbar : 'flex gap-5 items-center '
}
const SettingProfile = () => {
    const { themeUniver } = useThemeClasses()
    return (
        <div className={`p-5 ${themeUniver}`}>
            <div className="flex justify-between items-center my-5">
                <IoMdArrowRoundBack />
                <h1 className="font-bold text-xl">Setting Profile</h1>
                <FaSearch />
            </div>
            <hr />
            <div className="text-left">
                <div className="my-5">
                    <div>
                        <h2 className={stylesClassName.textH2}>Preferences</h2>
                        <p className={stylesClassName.parentText}>Customize your exprerience on Movie </p>
                    </div>
                    <div className="flex flex-col gap-10 p-2">
                        <div className={stylesClassName.flexNavbar} >
                            <span><IoIosNotificationsOutline size={30}/></span>
                            <h2 className={stylesClassName.textH2}>Notifications</h2>
                        </div>
                        <div className={stylesClassName.flexNavbar}>
                            <span><TbWorld  size={30}/></span>
                            <h2 className={stylesClassName.textH2}>Language</h2>
                        </div>
                        <div className={stylesClassName.flexNavbar}>
                            <span><BiFontSize size={30}/></span>
                            <h2 className={stylesClassName.textH2}>Font size</h2>
                        </div>
                    </div>

                </div>
                <hr />
                <div className="my-5">
                    <div>
                        <h2 className={stylesClassName.textH2}>You activity</h2>
                        <p className={stylesClassName.parentText}>Review you activity and content </p>
                    </div>
                    <div className="flex flex-col gap-10 p-2">
                        <div className={stylesClassName.flexNavbar} >
                            <span><FaTicket size={30}/></span>
                            <h2 className={stylesClassName.textH2}>Ticket</h2>
                        </div>
                        <div className={stylesClassName.flexNavbar}>
                            <span><FaHistory size={30}/></span>
                            <h2 className={stylesClassName.textH2}>History</h2>
                        </div>
                        <div className={stylesClassName.flexNavbar}>
                            <span><TbFileSearch size={30}/></span>
                            <h2 className={stylesClassName.textH2}>Search</h2>
                        </div>
                    </div>

                </div>
            </div>



        </div>
    );
}

export default SettingProfile;