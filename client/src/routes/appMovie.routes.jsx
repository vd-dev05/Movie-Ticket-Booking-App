import { Routes, Route } from 'react-router-dom';
import { ThemeProvider } from '@/context/Theme/index';
import Home from '@/pages/Home/homebaner';
import Login from '@/components/Layout/Dasboard/Login';
import Otp from '@/components/Layout/Dasboard/OtpLog';
import { TestMongo } from '@/components/User/testMongo';
import SignUp from '@/components/Layout/Dasboard/SignUp';
// import HomePage from '@/pages/Home/Homepage';
import HomeMovie from '@/pages/Home/HomeMovie';
import Select from '@/components/Layout/Product/Booking/SelectSeats';
const RouteMovie = () => {
    return (
        <div>
            <ThemeProvider>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/L" element={<Otp />} />
                    <Route path="/signup" element={<SignUp />} />
                    <Route path="/home" element={<HomeMovie />} />
                    <Route path="/boking" element={<Select/>} />
                    <Route path="/test" element={<TestMongo />} />

                </Routes>
            </ThemeProvider>
        </div>
    );
}

export default RouteMovie;