import React, { useContext, useEffect, useState } from "react";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { FaRegEdit, FaChevronRight } from "react-icons/fa";
import { LuTicket } from "react-icons/lu";
import { TbBrandSamsungpass } from "react-icons/tb";
import { RiTodoLine } from "react-icons/ri";
import { AiOutlineLogin, AiOutlineLogout } from "react-icons/ai";
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
import Nav from "../../../common/Nav";
import { useTheme } from "../../../../context/Theme";
import { useThemeClasses } from "@/context/Theme/themeStyles"
import { Regex } from "@/validations/Regex";
import Privacy from "./childRouter/Privacy";
import { doc, getDoc } from "firebase/firestore";
import { database, db } from "@/components/firebase/firebase";
import { child, get, onValue, ref, remove, set, update } from "firebase/database";
import Terms from "./childRouter/Terms";
import UserRename from "./childRouter/UserRename";
import ChangePassWord from "./childRouter/ChangePass";
import {deleteData} from '@/hooks/GetApi/GetApi'

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
    const { oppositeTheme, themeUniver,textClasses } = useThemeClasses()
    const [reset, setReset] = useState({
        user: '',
        phone: '',
        passWord: ''
    })
    const nav  = useNavigate()
    const [True, setTrue] = useState(false)
    const [dataLoad,setDataLoad] = useState(false)
    // if (!isDialogOpen) {

    // }

    useEffect(() => {
        // get(child(ref(database), `users/auth`)).then((snapshot) => {
        //     if (snapshot.exists()) {
        //         const data = snapshot.val();
        //             console.log(data);
        
        //             setReset(pre => ({
        //                 ...pre,
        //                 user: data.name,
        //                 phone: data.phone
        //             }))
        //     } else {
        //       console.log("No data available");
        //     }
        //   }).catch((error) => {
        //     console.error(error);
        //   });
            
            onValue(ref(database, 'users/' + 'auth'), (snapshot) => {
                const data = snapshot.val();
                // const data =  {
                //     name:'alex' ,
                //     phone:'012'
                // }
                console.log(data);
                if (data) {
                    setReset(pre => ({
                        ...pre,
                        user: data.name  ,
                        phone: data.phone 
                    }))
                    setTrue(!True)
                    setDataLoad(true)
                }
              
               
            });
    }, [dataLoad])
    const handleLogout = async () => {
        const currentUser = {
            displayName:"user",
            photoURL:''
        }
        localStorage.setItem('user', JSON.stringify(currentUser))
    
        deleteData(`users/auth`) 
            .then(() => {
             setDataLoad(false)
             toast.success("Logout SuccessFull !" , {
                autoClose:2000
            })
            })
            .catch((error) => {
                console.error('Error deleting movie:', error);
            });
            
        deleteData(`users/userCard`) 
        .then(() => {
         setDataLoad(false)
         toast.success("Logout SuccessFull !" , {
            autoClose:2000
        })
        })
        .catch((error) => {
            console.error('Error deleting movie:', error);
        });
            setDataLoad(false)
            setTimeout(() => {
                setReset('')
                setTrue(!True)
            }, 1900);
        

    }
    const handleLogin = () => {
       
        nav('/l')
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
                        <Link className={textClasses} to="/profile/rename">

                            <div className="flex justify-between items-center py-5"
                            // onClick={() => setDialogOpen(!isDialogOpen)}
                            >
                                <div className="flex">
                                    <FaRegEdit size={30} />
                                   <p className="text-2xl pl-5"> Edit Profile</p>
                                </div>
                                <FaChevronRight size={24} />
                            </div>
                        </Link>


                        <hr />

                        <Link className={textClasses} to="/tickets">
                            <div className="flex justify-between items-center py-5">
                                <div className="flex">
                                    <LuTicket size={30} />
                                    <p className="text-2xl pl-5">My Ticket</p>
                                </div>
                                <FaChevronRight size={24} />
                            </div>
                            <hr />
                        </Link>

                        <Link className={textClasses} to="/profile/change-password">
                            <div className="flex justify-between items-center py-5">
                                <div className="flex">
                                    <TbBrandSamsungpass size={30} />
                                    <p className="text-2xl pl-5">Change Password</p>
                                </div>
                                <FaChevronRight size={24} />
                            </div>
                            <hr />
                        </Link>

                        <Link className={textClasses} to="/profile/privacy">
                            <div className="flex  justify-between items-center py-5">
                                <div className="flex">

                                    <box-icon name="check-shield" size="34px" color={`${themeCtx.theme === 'dark' && 'travel' ? '#e1e1e1' : 'black'}`}> </box-icon>
                                    <p className="text-2xl pl-5">Privacy Policy</p>
                                </div>

                                <FaChevronRight size={24} />
                            </div>
                            <hr />
                        </Link>

                        <Link className={`${textClasses} hover:${textClasses}`}  to="/profile/terms">
                            <div className="flex  justify-between items-center py-5">
                                <div className="flex">

                                    <box-icon name="check-shield" size="34px" color={`${themeCtx.theme === 'dark' && 'travel'? '#e1e1e1' : 'black'}`}> </box-icon>
                                    <p className="text-2xl pl-5">Terms & Conditions</p>
                                </div>

                                <FaChevronRight size={24} />
                            </div>

                        </Link>
                    </div>

                    <div className="px-5">
                   
                        {!!True
                         ?
                         <Button 
                        onClick={handleLogin}
                         className="text-xl mt-10 bg-chairMovie-chairSelected hover:bg-chairMovie-chairSelected text-white focus:bg-chairMovie-chairSelected w-full p-5 h-[60px] rounded-lg  ">
                             <AiOutlineLogin size={24} className="mr-2 " />
                             Login
                         </Button>
                        : 
                        <Button
                        onClick={handleLogout}
                        className="text-xl mt-10 bg-chairMovie-chairSelected hover:bg-chairMovie-chairSelected  text-white focus:bg-chairMovie-chairSelected  w-full h-[60px] p-5 rounded-lg  ">
                        <AiOutlineLogout size={24} className="mr-2" />
                        Logout
                    </Button>
                        }
                     
                  
                    </div>
                 
                  
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
