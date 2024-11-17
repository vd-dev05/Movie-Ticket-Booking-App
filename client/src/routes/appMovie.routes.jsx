import { Routes, Route } from 'react-router-dom';
import { ThemeProvider } from '@/context/Theme/index';
import Home from '@/pages/Home/homebaner';
import Login from '@/components/Layout/Dasboard/bannerLogin';
import Otp from '@/pages/login';
import { TestMongo } from '@/components/User/testMongo';
import SignUp from '@/pages/signUp';
// import HomePage from '@/pages/Home/Homepage';
import HomeMovie from '@/pages/Home/HomeMovie';
import Select from '@/components/Layout/Product/Booking/SelectSeats';
import TestOtp from '@/components/User/test';
import Password from '@/components/Layout/Dasboard/ResetPass';
import { UserProvider } from '@/context/User/index';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Search from '@/components/Layout/Product/Search';
import ItemLove from '@/components/Layout/Product/LoveMovie/ItemLove';
import Nav from '@/components/common/Nav';
const RouteMovie = () => {
    return (
        <div>
            <ThemeProvider>
                <UserProvider>
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/L" element={<Login />} />
                        <Route path="/login" element={<Otp />} />
                        <Route path="/signup" element={<SignUp />} />
                        <Route path="/home" element={<HomeMovie />} />
                        <Route path="/boking" element={<Select />} />
                        <Route path="/test" element={<TestOtp />} />
                        <Route path="/reset" element={<Password />} />
                        <Route path="/search" element={<Search />} />
                        <Route path='/search/:id' element={<ItemLove />} />
                    </Routes>
                </UserProvider>
            </ThemeProvider>
            <ToastContainer/>
        </div>
    );
}

export default RouteMovie;