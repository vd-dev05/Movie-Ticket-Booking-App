import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { Link } from "react-router-dom";
import { db } from '../../firebase/firebase';
import { collection, addDoc } from "firebase/firestore";
import { useTheme } from "../Theme";

const SignUp = () => {
    const themeCtx = useTheme()
    const [data, setData] = useState({
        user: "",
        password: "",
        phone: "",
        realignPass: "",
    });

    const ClickAddUser = async () => {
        try {
            const docRef = await addDoc(collection(db, "users"), {
                name: data.user,
                phone: data.phone,
                password: data.password
            });
            console.log(docRef);
        } catch (error) {
            console.error("Error adding document: ", error);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setData(prevData => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (data.realignPass !== data.password) {
            alert("Passwords do not match");
            return;
        }
        ClickAddUser();
        // reset 
        setData({
            user: "",
            password: "",
            phone: "",
            realignPass: "",
        });
    };

    return (
        <div>
            <div className={ ` iphone-12-pro-max:flex h-[100vh] flex-col text-left font-movie  ${themeCtx.theme == 'dark' ? 'bg-dark-bg text-light-bg' :'bg-white'} ` }>
                <div className="p-3 text-center">
                    <div className="flex justify-center h-56">
                        <img src="/src/assets/img/logo1.png" className="h-96 -translate-y-20" alt="Logo" />
                    </div>
                    <div className="text-gray-400">
                        <h1 className={ `font-logo text-[29px] text-nowrap  font-movieTicket  ${themeCtx.theme == 'dark' ? 'text-light-bg': 'text-dark-bg'}`}>Create New Account</h1>
                        <p className="text-xl mt-2">Set up your username and password</p>
                        <p className="text-xl mb-4">You can always change it later</p>
                    </div>
                    <div>
                        <form onSubmit={handleSubmit}>
                            <Input
                                className={`py-6 my-5 outline-none ${themeCtx.theme == 'dark' ? 'bg-dark-bg text-light-bg ':'bg-white'}`}
                                placeholder="Name"
                                type="text"
                                value={data.user}
                                onChange={handleChange}
                                name="user"
                            />
                            <Input
                                placeholder="Mobile Number"
                                className={`py-6 my-5 outline-none ${themeCtx.theme == 'dark' ? 'bg-dark-bg text-light-bg':'bg-white'}`}
                                value={data.phone}
                                onChange={handleChange}
                                name="phone"
                                type="text"
                            />
                            <Input
                                placeholder="Password"
                                className={`py-6 my-5 outline-none ${themeCtx.theme == 'dark' ? 'bg-dark-bg text-light-bg':'bg-white'}`}
                                name="password"
                                value={data.password}
                                required
                                onChange={handleChange}
                                type="password"
                            />
                            <Input
                                placeholder="Re-enter Password"
                                className={`py-6 my-5 outline-none ${themeCtx.theme == 'dark' ? 'bg-dark-bg text-light-bg':'bg-white'}`}
                                name="realignPass"
                                value={data.realignPass}
                                required
                                onChange={handleChange}
                                type="password"
                            />
                            <Button
                                type="submit"
                                className="bg-primary-textMovie w-full p-6 focus:bg-chairMovie-chairSelected"
                            >
                                <p className="text-white">Signup</p>
                            </Button>
                        </form>
                    </div>
                    <div>
                        <p className="mt-20">Already have an account? <Link to="/L" className="text-primary-textMovie">Login</Link></p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SignUp;
