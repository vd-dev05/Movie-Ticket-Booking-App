import { Button } from "@/components/ui/button";
import Nav from "../../Nav";
import Cancelled from "./Cancelled";
import Upcoming from "./UpComing";
import React, { useState } from "react";
import Past from "./Past";
import { useTheme } from "../../Theme";
import { useThemeClasses } from "../../Theme/themeStyles";

const Myticket = () => {
    const themeCtx = useTheme()
    const { textClasses, backGroundTow, backGround } = useThemeClasses()
    const [activeTab, setActiveTab] = useState("Update");

    const handleClick = (tab) => {
        setActiveTab(tab);
    };

    // Component NavButton
    const NavButton = ({ label, isActive, onClick }) => (
        <div>
            <button
                className={`flex justify-center items-center text-sm px-8 py-4 ${textClasses} ${isActive ? 'bg-chairMovie-chairSelected text-white' : 'text-black'} p-2 rounded-lg transition-colors duration-300 ease-in-out`}
                onClick={onClick}
            >
                {label}
            </button>
        </div>
    );

    // Component Task
    const Task = ({ content, isActive }) => (
        <div className={`mt-10 ${isActive ? 'text-black opacity-1' : 'text-black opacity-0'}`}>
            {isActive && content}
        </div>
    );

    // Tab Configuration
    const tabs = [
        { label: 'Upcoming', value: 'Update', content: <Upcoming /> },
        { label: 'Past', value: 'Past', content: <Past /> },
        { label: 'Cancelled', value: 'Cancell', content: <Cancelled /> }
    ];

    return (
        <div className={`${textClasses} ${backGroundTow} h-full min-w-full`}>
            <div className=" px-5 pt-5  ">
                <h1 className="text-center mb-5 font-bold font-movie">My Tickets</h1>
                <div className={`flex justify-between  ${backGround} `}>
                    {tabs.map((tab, index) => (
                        <NavButton
                            key={index}
                            label={tab.label}
                            isActive={activeTab === tab.value}
                            onClick={() => handleClick(tab.value)}
                        />
                    ))}
                </div>
                <div>
                    {tabs.map((tab, index) => (
                        <Task
                            key={index}
                            content={tab.content}
                            isActive={activeTab === tab.value}
                        />
                    ))}
                </div>
            </div>
                <div>
                    <Nav data={"tickets"} />
                </div>

        </div>
    );
};

export default Myticket;
