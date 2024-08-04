import Nav from "../../Nav";
import { FaRegEdit, FaChevronRight } from "react-icons/fa";
import { LuTicket } from "react-icons/lu";
import { TbBrandSamsungpass } from "react-icons/tb";
import { RiTodoLine } from "react-icons/ri";
import { Link } from "react-router-dom";
import { AiOutlineLogout } from "react-icons/ai";
import { Button } from "@/components/ui/button";
const HomeFile = () => {
    return (
        <div className="iphone-12-pro-max:flex flex flex-col  iphone-12:w-[390px] text-center font-movie  mt-10 relative ">
            <h1 className="text-center font-bold text-xl  ">Profile</h1>
            <div className="flex justify-center  items-center mt-10 ">
                <img src="https://github.com/shadcn.png" width={100} alt="" className="rounded-lg" />
            </div>

            <div className="mt-5">
                <p className="font-bold text-2xl">Name Alex Nguyen </p>
                <p className="text-gray-500 py">0123456789</p>
            </div>
            <div className=" px-5">
                <Link className="text-black ">
                    <div className="">
                        <div className="flex justify-between  w-full py-5">
                            <div className="flex">
                                <FaRegEdit size={30} />
                                <p className="text-2xl pl-5">Edit Profile</p>
                            </div>
                            <div><FaChevronRight size={24} /></div>
                        </div>

                       
                    </div>
                    <hr></hr>
                </Link>

                <Link className="text-black ">
                    <div className="flex justify-between  w-full py-5">
                        <div className="flex">
                            <LuTicket size={30} />
                            <p className="text-2xl pl-5">My Tickets</p>
                        </div>
                        <div><FaChevronRight size={24} /></div>
                    </div>
                    <hr></hr>
                </Link>

                <Link className="text-black ">
                    <div className="flex justify-between  w-full py-5">
                        <div className="flex">
                            <TbBrandSamsungpass size={30} />
                            <p className="text-2xl pl-5">Change Password</p>
                        </div>
                        <div><FaChevronRight size={24} /></div>
                    </div>
                    <hr></hr>
                </Link>

                <Link className="text-black " to="/privacy">
                    <div className="flex justify-between  w-full py-5">
                        <div className="flex">
                            <box-icon name='check-shield' size="34px"></box-icon>
                            <p className="text-2xl pl-5 ">Privacy Policy</p>
                        </div>
                        <div><FaChevronRight size={24} /></div>
                    </div>
                    <hr></hr>
                </Link>

                <Link className="text-black " to="/terms">
                    <div className="flex justify-between  w-full py-5">
                        <div className="flex">
                            <RiTodoLine size={30} />
                            <p className="text-2xl pl-5">Terms & Conditions</p>
                        </div>
                        <div><FaChevronRight size={ 24}/></div>
                    </div>
                   
                </Link>
                

            </div>
            <div className="px-5 mt-10">
            <Link className="text-white">
            <Button  className="bg-chairMovie-chairSelected w-full p-7  text-xl">

             <AiOutlineLogout size={24} className="mr-2" />
            Logout
            </Button>

            </Link>

            </div>
            
            

            <div className="fixed bottom-0 w-full">
                <Nav data={"user"}></Nav>
            </div>

        </div>

    );
}

export default HomeFile;