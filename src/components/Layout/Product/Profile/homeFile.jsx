import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
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
import Nav from "../../Nav";
import { useTheme } from "../../Theme";
// import { db, doc, setDoc, getDoc } from "../../../firebase/firebase";
const HomeFile = () => {
    // const UserData = useContext(useUser);
    // console.log(UserData);
    const themeCtx = useTheme()
    // console.log(themeCtx);

    const [reset, setReset] = useState({
        // user: UserData.dataUser.user || "",
        // phone: UserData.dataUser.phone || "",
        // password: UserData.dataUser.password || "",
    });

    const [isDialogOpen, setDialogOpen] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setReset((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {

            await setDoc(doc(db, "users", "user-id"), reset);
            setDialogOpen(false);
        } catch (error) {
            console.error("Error updating document: ", error);
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const docRef = doc(db, "users", "user-id");
                const docSnap = await getDoc(docRef);

                if (docSnap.exists()) {
                    setReset(docSnap.data());
                } else {
                    console.log("No such document!");
                }
            } catch (error) {
                console.error("Error fetching document: ", error);
            }
        };

        fetchData();
    }, []);

    return (
        <div className={`iphone-12-pro-max:flex flex flex-col  iphone-12:h-[844px] iphone-12:w-[390px] text-center font-movie   relative ${themeCtx.theme === 'dark' ? 'bg-[#130d0d] text-white' : 'bg-white'}`}>
            <h1 className="text-center font-bold text-xl ">Profile</h1>
            <div className="flex justify-center items-center mt-10">
                <img
                    src="https://github.com/shadcn.png"
                    width={100}
                    alt="Profile"
                    className="rounded-lg"
                />
            </div>

            <div className="mt-5">
                <p className="font-bold text-2xl">{reset.user}</p>
                <p className="text-gray-500">{reset.phone}</p>
            </div>

            <div className="px-5">
                <Dialog open={isDialogOpen} onOpenChange={setDialogOpen}>
                    <DialogTrigger asChild>
                        <div className="flex justify-between items-center py-5">
                            <div className="flex">
                                <FaRegEdit size={30} />
                                <Button variant="outline" className="text-2xl ml-3">
                                    Edit Profile
                                </Button>
                            </div>
                            <FaChevronRight size={24} />
                        </div>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px] bg-gray-50">
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
                                    value={reset.user}
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
                                    value={reset.phone}
                                    className="col-span-3 text-black outline-none border-2 p-2 rounded-lg"
                                    required
                                />
                            </div>
                            <DialogFooter>
                                <Button type="submit" className="bg-chairMovie-chairSelected text-white">
                                    Save changes
                                </Button>
                            </DialogFooter>
                        </form>
                    </DialogContent>
                </Dialog>

                <hr />

                <Link className={`${themeCtx.theme === 'dark' ? ' text-[#e1e1e1]' : 'text-black'}`} to="/tickets">
                    <div className="flex justify-between items-center py-5">
                        <div className="flex">
                            <LuTicket size={30} />
                            <p className="text-2xl pl-5">My Ticket</p>
                        </div>
                        <FaChevronRight size={24} />
                    </div>
                    <hr />
                </Link>

                <Link className={`${themeCtx.theme === 'dark' ? ' text-[#e1e1e1]' : 'text-black'}`} to="/change-password">
                    <div className="flex justify-between items-center py-5">
                        <div className="flex">
                            <TbBrandSamsungpass size={30} />
                            <p className="text-2xl pl-5">Change Password</p>
                        </div>
                        <FaChevronRight size={24} />
                    </div>
                    <hr />
                </Link>

                <Link className={`  ${themeCtx.theme === 'dark' ? ' text-[#e1e1e1]' : 'text-black'}`} to="/privacy">
                    <div className="flex  justify-between items-center py-5">
                        <div className="flex">

                            <box-icon name="check-shield" size="34px" color={`${themeCtx.theme === 'dark' ? '#e1e1e1' : 'black'}`}> </box-icon>
                            <p className="text-2xl pl-5">Privacy Policy</p>
                        </div>

                        <FaChevronRight size={24} />
                    </div>
                    <hr />
                </Link>

                <Link className={`${themeCtx.theme === 'dark' ? ' text-[#e1e1e1]' : 'text-black'}`} to="/terms">
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

            <div className="fixed bottom-0 w-full">
                <Nav data={"user"} />
            </div>
        </div>
    );
};

export default HomeFile;
