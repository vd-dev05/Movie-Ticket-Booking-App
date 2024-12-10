// import React from 'react';
import { useThemeClasses } from "@/context/Theme/themeStyles";
import { LuLock, LuUsers, LuBadgePercent, LuGift, LuCreditCard } from "react-icons/lu";
;
const Notification = () => {
    const { buttonClasses } = useThemeClasses()
    const notifications = {
        today: [
            { title: "Get 30% Off on Dance Event!", message: "Special promotion only valid today", icon: <LuBadgePercent /> },
            { title: "Password Update Successful", message: "Your password update successfully", icon: <LuLock /> }
        ],
        yesterday: [
            { title: "Account Setup Successful!", message: "Your account has been created", icon: <LuUsers /> },
            { title: "Redeem your gift cart", message: "You have get one gift card", icon: <LuGift /> },
            { title: "Debit card added successfully", message: "Your debit card added successfully", icon: <LuCreditCard /> }
        ]
    };

    return (
        <div>
            <h3 className="text-left font-bold  py-5">Today</h3>
            <ul className="flex flex-col gap-10">
                {notifications.today.map((note, index) => (
                    <li key={index} className={`flex gap-5 ${buttonClasses} drop-shadow-xl rounded-xl  p-5`}>
                        <div className="bg-primary-textMovie w-16 h-16 rounded-full  flex justify-center items-center text-white">{note.icon}</div>
                        <div className="flex flex-col gap-2 items-start">
                            <strong>{note.title}</strong>
                            <p>{note.message}</p>
                        </div>

                    </li>
                ))}
            </ul>
            <h3 className="text-left font-bold py-5">Yesterday</h3>
            <ul className="flex flex-col gap-10">
                {notifications.yesterday.map((note, index) => (
                    <li key={index}  className={`flex gap-5 ${buttonClasses} drop-shadow-xl rounded-xl  p-5`}>
                        <div className="bg-primary-textMovie w-16 h-16 rounded-full  flex justify-center items-center text-white">{note.icon}</div>
                        <div className="flex flex-col gap-2 items-start">
                            <strong>{note.title}</strong>
                            <p>{note.message}</p>
                        </div>

                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Notification;
