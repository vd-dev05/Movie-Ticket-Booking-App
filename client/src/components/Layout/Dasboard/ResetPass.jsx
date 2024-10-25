import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useTheme } from "../../../context/Theme";
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
const Password = () => {
    const themeCtx = useTheme()
    return ( 
        
        <div className={`iphone-12-pro-max:flex flex flex-col h-[100vh]  font-movie ${themeCtx.theme == 'dark' ? 'bg-dark-bg text-light-bg':'bg-white' } `}>
            <div className=" flex justify-center h-56">
            <img src="/assets/img/logo1.png" className=" h-96 -translate-y-20" alt="" />
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
                            className={`w-full p-5 mb-5 border-2 ${themeCtx.theme == 'dark' ? 'bg-dark-bg text-light-bg':'bg-white'}`}
                        />
                    </div>
                    <div>
                        <label >New Password </label>
                        <Input
                        className={`w-full p-5 mb-5 border-2 ${themeCtx.theme == 'dark' ? 'bg-dark-bg text-light-bg':'bg-white'}`}
                        type="password"  />
                    </div>
                    <div className="text-right mt-3 mb-5 ">
                        <Link className="text-primary-textMovie" to="/reset">Other Method ?</Link>
                    </div>
                    <div >
                        <Link className="text-primary-textMovie" to="/ticket">
                            <Button
                                className="w-full bg-primary-textMovie  "
                                variant="outline"
                            >
                                <p className="text-white">
                                    Submit </p> </Button>
                        </Link>

                    </div>
                    <p className="text-center mt-5">
                    Login in already password <Link className="text-primary-textMovie" to="/L">Login</Link>
                    </p>


                </form>

            </div>
        </div>
    );
}
 
export default Password;