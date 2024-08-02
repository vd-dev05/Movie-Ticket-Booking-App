import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
const Password = () => {
    return ( 
        <div className="iphone-12-pro-max:flex flex flex-col h-[100vh] iphone-12:w-[390px] font-movie ">
            <div className=" flex justify-center ">
                <img src="/src/assets/img/logo.png" alt="logo" />
            </div>
            <div class=" text-center text-3xl">
                <h1 className="font-logo text-3xl">Set a new password</h1>
                <p className="text-xl  px-10 text-gray-400">
                   Create a new password. Ensure it differs from previous ones for securtity
                </p>

            </div>
            <div>

            </div>
       
            <div className="p-5">
                <form>
                    <div>
                        <label>Password Old</label>
                        <Input
                            type="number"
                            // placeholder="Mobile Number"
                            className="w-full mb-5 border-2"
                        />
                    </div>
                    <div>
                        <label >New Password </label>
                        <Input
                        className=" border-2"
                        type="password"  />
                    </div>
                    <div className="text-right mt-3 mb-5 ">
                        <Link to="/reset">Other Method ?</Link>
                    </div>
                    <div >
                        <Link to="/ticket">
                            <Button
                                className="w-full bg-primary-textMovie  "
                                variant="outline"
                            >
                                <p className="text-white">
                                    Submit </p> </Button>
                        </Link>

                    </div>
                    <p className="text-center mt-5">
                    Login in already password <Link to="/L">Login</Link>
                    </p>


                </form>

            </div>
        </div>
    );
}
 
export default Password;