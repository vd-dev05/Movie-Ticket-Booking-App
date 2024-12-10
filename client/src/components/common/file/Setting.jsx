import { IoMdArrowRoundBack, IoIosNotificationsOutline } from "react-icons/io";
import { FaSearch ,FaHistory } from "react-icons/fa";
import { useThemeClasses } from "@/context/Theme/themeStyles";
import { TbWorld ,TbFileSearch } from "react-icons/tb";
import { BiFontSize } from "react-icons/bi";
import { FaTicket } from "react-icons/fa6";
import { Link, useLocation } from "react-router-dom";
import TicketHistory from "./history/ticket";
import queryString from "query-string";
const stylesClassName = {
    textH2: 'text-xl font-bold',
    parentText: 'text-gray-500 ',
    flexNavbar : 'flex gap-5 items-center '
}
import Notification from "./notifications";
const SettingProfile = () => {
    const { themeUniver,textClasses } = useThemeClasses()
    const location = useLocation();
    const pared = queryString.parseUrl(location.search)
    console.log(location.pathname);
    
    // const ticketHistory = location.pathname === '/profile/setting/ticket'
    console.log(pared.query.action);
    const ticketHistory = pared.query.action === 'ticket'
    const notifiactions = pared.query.action === 'notifications'
    return (
        <div className={`p-5 ${themeUniver}`}>
            <div className="flex justify-between items-center my-5">
                <Link to={location.search ?location.pathname :'/profile'} className={textClasses}>
                <IoMdArrowRoundBack  />
                </Link>
                <h1 className="font-bold text-xl"> {notifiactions ? "Notifiaction" : "Setting Profile"}</h1>
                <FaSearch />
            </div>
            <hr />
            {!ticketHistory && !notifiactions && (
                  <div className="text-left">
                  <div className="my-5">
                      <div>
                          <h2 className={stylesClassName.textH2}>Preferences</h2>
                          <p className={stylesClassName.parentText}>Customize your exprerience on Movie </p>
                      </div>
                      <div className="flex flex-col gap-10 p-2">
                          {/* <div className={stylesClassName.flexNavbar} >
                              <span><IoIosNotificationsOutline size={30}/></span>
                              <h2 className={stylesClassName.textH2}>Notifications</h2>
                          </div> */}
                             <Link
                          to={'?action=notifications'}
                           className={`${stylesClassName.flexNavbar} ${textClasses} hover:${textClasses}`} >
                             <span><IoIosNotificationsOutline size={30}/></span>
                             <h2 className={stylesClassName.textH2}>Notifications</h2>
                          </Link>
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
                          <Link
                          to={'?action=ticket'}
                           className={`${stylesClassName.flexNavbar} ${textClasses} hover:${textClasses}`} >
                              <span><FaTicket size={30}/></span>
                              <h2 className={stylesClassName.textH2}>Ticket</h2>
                          </Link>
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
            )}
            {ticketHistory && <TicketHistory/> }
            {notifiactions && <Notification/>}



        </div>
    );
}

export default SettingProfile;