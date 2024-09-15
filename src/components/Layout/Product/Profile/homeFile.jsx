import React, { useContext, useEffect, useState } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import { FaRegEdit, FaChevronRight } from "react-icons/fa";
import { LuTicket } from "react-icons/lu";
import { TbBrandSamsungpass } from "react-icons/tb";
import { RiTodoLine } from "react-icons/ri";
import { AiOutlineLogout } from "react-icons/ai";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogClose,
} from "@/components/ui/dialog";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { ToastContainer, toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';
import Nav from "../../Nav";
import { useTheme } from "../../Theme";
import { useThemeClasses } from "@/components/Layout/Theme/themeStyles"
import { Regex } from "@/components/Regex";
import Privacy from "./childRouter/Privacy";
import { doc, getDoc } from "firebase/firestore";
import { database, db } from "@/components/firebase/firebase";
import { onValue, ref, set, update } from "firebase/database";
import Terms from "./childRouter/Terms";
import UserRename from "./childRouter/UserRename";
import ChangePassWord from "./childRouter/ChangePass";
// import { db, doc, setDoc, getDoc } from "../../../firebase/firebase";


const HomeFile = () => {
    // const UserData = useContext(useUser);
    // console.log(UserData);
    const location = useLocation();
    const isPrivacyRoute = location.pathname === '/profile/privacy';
    const isTermsRoute = location.pathname === '/profile/terms';
    const isRenameUser = location.pathname === '/profile/rename';
    const isChangePass = location.pathname === '/profile/change-password'

    // const ChildRouter = location.pathname !== '/profile';
    // const ChildEditPass = location.pathname != '/';
    const themeCtx = useTheme()
    const { oppositeTheme, themeUniver } = useThemeClasses()
    const [reset, setReset] = useState({
        user: '',
        phone: '',
        passWord: ''
    })

    const [True, setTrue] = useState(false)

    // if (!isDialogOpen) {

    // }

    useEffect(() => {
        onValue(ref(database, 'users/' + 'auth'), (snapshot) => {
            const data = snapshot.val();
            console.log(data);

            setReset(pre => ({
                ...pre,
                user: data.name,
                phone: data.phone
            }))
        });
    }, [])


    const CLickTest = () => {


    }
    return (
        <div className={`iphone-12-pro-max:flex flex flex-col h-[200vw]    text-center font-movie   relative ${themeUniver}`}>
            {/* <button  onClick={CLickTest}>Click</button> */}
            {!isPrivacyRoute && !isTermsRoute && !isRenameUser && !isChangePass && (
                <div>
                    <h1 className="text-center font-bold text-xl ">Profile</h1>

                    {/* <button onClick={notify}>CLick</button> */}
                    <div className="flex justify-center items-center mt-10">
                        <img
                            src="https://github.com/shadcn.png"
                            width={100}
                            alt="Profile"
                            className="rounded-lg"
                        />
                    </div>

                    <div className="my-5" >
                        <p className="font-bold text-2xl">{reset ? reset.user : 'user'}</p>
                        <p className="text-gray-500">{reset ? reset.phone : 'number  phone'}</p>
                    </div>

                    <div className="px-5    ">
                        <Link className={`${themeCtx.theme === 'dark' ? ' text-[#e1e1e1]' : 'text-black'}`} to="/profile/rename">

                            <div className="flex justify-between items-center py-5"
                            // onClick={() => setDialogOpen(!isDialogOpen)}
                            >
                                <div className="flex">
                                    <FaRegEdit size={30} />
                                    <Button variant="outline" className="text-2xl ml-3">
                                        Edit Profile
                                    </Button>
                                </div>
                                <FaChevronRight size={24} />
                            </div>
                        </Link>


                        <hr />

                        <Link className={``} to="/tickets">
                            <div className="flex justify-between items-center py-5">
                                <div className="flex">
                                    <LuTicket size={30} />
                                    <p className="text-2xl pl-5">My Ticket</p>
                                </div>
                                <FaChevronRight size={24} />
                            </div>
                            <hr />
                        </Link>

                        <Link className={`${themeCtx.theme === 'dark' ? ' text-[#e1e1e1]' : 'text-black'}`} to="/profile/change-password">
                            <div className="flex justify-between items-center py-5">
                                <div className="flex">
                                    <TbBrandSamsungpass size={30} />
                                    <p className="text-2xl pl-5">Change Password</p>
                                </div>
                                <FaChevronRight size={24} />
                            </div>
                            <hr />
                        </Link>

                        <Link className={`  ${themeCtx.theme === 'dark' ? ' text-[#e1e1e1]' : 'text-black'}`} to="/profile/privacy">
                            <div className="flex  justify-between items-center py-5">
                                <div className="flex">

                                    <box-icon name="check-shield" size="34px" color={`${themeCtx.theme === 'dark' ? '#e1e1e1' : 'black'}`}> </box-icon>
                                    <p className="text-2xl pl-5">Privacy Policy</p>
                                </div>

                                <FaChevronRight size={24} />
                            </div>
                            <hr />
                        </Link>

                        <Link className={`${themeCtx.theme === 'dark' ? ' text-[#e1e1e1]' : 'text-black'}`} to="/profile/terms">
                            <div className="flex  justify-between items-center py-5">
                                <div className="flex">

                                    <box-icon name="check-shield" size="34px" color={`${themeCtx.theme === 'dark' ? '#e1e1e1' : 'black'}`}> </box-icon>
                                    <p className="text-2xl pl-5">Terms & Conditions</p>
                                </div>

                                <FaChevronRight size={24} />
                            </div>

                        </Link>
                    </div>

                    <div className="px-5 mt-10">
                        <Link className="text-white" to="/logout">
                            <Button className="bg-chairMovie-chairSelected w-full p-7 text-xl">
                                <AiOutlineLogout size={24} className="mr-2" />
                                Logout
                            </Button>
                        </Link>
                    </div>
                    {/* 
                    <Dialog open={isDialogOpen} onOpenChange={setDialogOpen} >
                        <DialogContent className="sm:max-w-[425px] rounded-lg bg-gray-50">
                            <DialogHeader>
                                <DialogTitle>Edit Profile</DialogTitle>
                                <DialogDescription>
                                    Make changes to your profile here. Click save when you're done.
                                </DialogDescription>
                            </DialogHeader>
                            <form onSubmit={handleSubmit} className="grid gap-4 py-4">
                                <div className="grid grid-cols-4 items-center gap-4">
                                    <label htmlFor="user" className="text-right">
                                        Name
                                    </label>
                                    <input
                                        id="user"
                                        name="user"
                                        type="text"
                                        placeholder="Edit name..."
                                        onChange={handleChange}
                                        value={reset.user || ''}
                                        className="col-span-3 text-black outline-none border-2 p-2 rounded-lg"
                                        required
                                    />
                                </div>
                                <div className="grid grid-cols-4 items-center gap-4">
                                    <label htmlFor="phone" className="text-right">
                                        Phone
                                    </label>
                                    <input
                                        id="phone"
                                        name="phone"
                                        type="text"
                                        placeholder="Edit phone..."
                                        onChange={handleChange}
                                        value={reset.phone || ''}
                                        className="col-span-3 text-black outline-none border-2 p-2 rounded-lg"
                                        required
                                    />
                                </div>
                                <div className="grid grid-cols-4 items-center gap-4">
                                    <label htmlFor="phone" className="text-right">
                                        Enter Address
                                    </label>
                                    <input
                                        id="mail"
                                        name="mail"
                                        type="email"
                                        placeholder="Edit Mail..."
                                        onChange={handleChange}
                                        value={reset.mail || ''}
                                        className="col-span-3 text-black outline-none border-2 p-2 rounded-lg"
                                        required
                                    />
                                </div>
                                <Button type="submit" className="bg-chairMovie-chairSelected hover:bg-primary-textMovie  text-white">
                                    Save changes
                                </Button>
                            </form>
                        </DialogContent>
                    </Dialog> */}
                </div>
            )}
            {isPrivacyRoute && <Privacy />}
            {isTermsRoute && <Terms />}
            {isRenameUser && <UserRename />}
            {isChangePass  && <ChangePassWord/>}
            <div className="fixed bottom-0 w-full">
                <Nav data={"user"} />
            </div>


        </div>
    );
};

export default HomeFile;
