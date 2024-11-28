import { Button } from "@/components/ui/button";
import Nav from "@/layout/Nav/index";
import Cancelled from "@/components/common/ticket/Cancelled";
import Upcoming from "@/components/common/ticket/UpComing";
import React, { useEffect, useState } from "react";
import Past from "@/components/common/ticket/Past";
import { useTheme } from "@/context/Theme/index";
import { useThemeClasses } from "@/context/Theme/themeStyles";
import TicketController from "@/services/users/ticket";

const Myticket = () => {
    const themeCtx = useTheme()
    const tabClick = localStorage.getItem('activeTabTicket') || 'Update'
    const { textClasses, backGroundTow, backGround, themeUniver, buttonClasses, inputClasses, btnSubmit } = useThemeClasses()
    const [activeTab, setActiveTab] = useState(tabClick);
    const [data,setData] = useState([])
    const [dataLoad, setDataLoad] = useState(false)
    const handleClick = (tab) => {
        setActiveTab(tab);
        localStorage.setItem("activeTabTicket", tab)
    };
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await TicketController.getAllTicket();            
                if (response) {
                    const data = response.data.ticket      
                    
                    if (tabClick === 'Update') {
                        const upComing = data.filter(ticket => ticket.book.status === 'Expired');
                        setData(upComing)
                        
                         setDataLoad(true)
                        //  console.log(upComing);
                         
                    } 
                    if (tabClick === 'Past') {
                        const pastData = data.filter(ticket => ticket.book.status === 'Active')
                        setData(pastData)
                         setDataLoad(true)
                    }
                    if (tabClick === 'Cancell') {
                        const cancelledData = data.filter(ticket => ticket.book.status === 'Cancelled')
                       
                        
                        setData(cancelledData)
                         setDataLoad(true)
                    } 
                }
            } catch (error) {
                console.error(error);
            }
        }
        fetchData();
    }, [dataLoad,activeTab]);
    const NavButton = ({ label, isActive, onClick }) => (
        <div>
            <button
                className={`flex justify-center items-center text-sm px-8 py-4 ${textClasses} ${isActive ? btnSubmit : inputClasses} p-2 rounded-lg transition-colors duration-300 ease-in-out`}
                onClick={onClick}
            >
                {label}
            </button>
        </div>
    );

    // Component Task
    const Task = ({ content, isActive , data }) => (
        <div className={`mt-10 ${isActive ? 'text-black opacity-1' : 'text-black opacity-0'}`}>
            {isActive && content }
        </div>
    );
  
    // Tab Configuration
    const tabs = [
        { label: 'Upcoming', value: 'Update', content: <Upcoming data={data} /> },
        { label: 'Past', value: 'Past', content: <Past data={data} /> },
        { label: 'Cancelled', value: 'Cancell', content: <Cancelled data={data} /> }
    ];
    if (!dataLoad) {
        return <div>Loading...</div>
    }
   return (
        <div className={`${themeUniver} h-full min-w-full`}>
            <div className=" px-5 pt-5  ">
                <h1 className="text-center mb-5 font-bold font-movie">My Tickets</h1>
                <div className={`flex justify-between  ${inputClasses} rounded-lg `}>
                    {tabs.map((tab, index) => (
                        <NavButton
                            key={index}
                            label={tab.label}
                            isActive={activeTab === tab.value}
                            onClick={() => handleClick(tab.value)}
                        />
                    ))}
                </div>
              {!dataLoad ? (<div>Loading ...</div>) : <div>
                    {tabs.map((tab, index) => (
                        <Task
                            key={index}
                            content={tab.content}
                            isActive={activeTab === tab.value}
                        />
                    ))}
                </div> }  
            </div>
            <div>
                <Nav data={"tickets"} />
            </div>

        </div>
    );
};

export default Myticket;
