import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link } from "react-router-dom";

const SignUp = () => {
    return (
        <div>
            <div className="iphone-12-pro-max:flex h-[100vh]  flex-col text-left font-movie  bg-gray-500">
                <div className="p-3 text-center">
                    <div className="flex justify-center ">
                        <img src="/src/assets/img/logo.png" alt="" />
                    </div>
                    <div className="text-gray-400">
                        <h1 className="font-logo text-[29px] text-nowrap text-black font-movieTicket ">Create New Account </h1>
                        <p className="text-xl mt-2">Set Up yoyur username and password </p>
                        <p className="text-xl mb-4">You can always change it later</p>
                    </div>
                    <div>
                        <Input
                        className ="py-6 my-5 outline-none"
                        placeholder="Name"
                        type="text"></Input>
                        <Input
                         placeholder="Mobile Number"
                        className ="py-6 my-5 outline-none"
                        type="text"></Input>
                        <Input
                         placeholder="Password"
                        className ="py-6 my-5 outline-none"
                        type="password"></Input>
                        <Input 
                        placeholder="Password"
                        className ="py-6 my-5 outline-none"
                        type="password"></Input>
                    </div>
                    <div>
                        <Button
                            className="bg-primary-textMovie w-full p-6"
                        ><p className="text-white ">
                        Signup</p></Button>
                    </div>
                    <div>
                        <p className="mt-20">Aleady have an account?<Link to="/L">Login</Link></p>
                    </div>
                </div>

            </div>
        </div>
    );
}

export default SignUp;