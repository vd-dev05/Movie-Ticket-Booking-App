// src/App.jsx
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './components/Layout/Home/homebaner';
import Login from './components/Layout/Dasboard/Login';
import Otp from './components/Layout/Dasboard/OtpLog';
import SignUp from './components/Layout/Dasboard/SignUp';
import Password from './components/Layout/Dasboard/ResetPass';
import HomePage from './components/Layout/Home/Homepage';
import LatestMovie from './components/Layout/Product/Lastmovie/CardLmovie';
import ItemMovie from './components/Layout/Product/Lastmovie/itemMovie';
import Select from './components/Layout/Product/Booking/SelectSeats';
import Pay from './components/Layout/Product/Booking/PayBooking';
import HomeFile from './components/Layout/Product/Profile/homeFile';
import Privacy from './components/Layout/Product/Profile/Privacy';
import Terms from './components/Layout/Product/Profile/Terms';
import Search from './components/Layout/Product/Search';
import LoveMovie from './components/Layout/Product/LoveMovie';
import ItemLove from './components/Layout/Product/LoveMovie/ItemLove';
import Myticket from './components/Layout/Product/Myticket';
import { ThemeProvider } from './components/Layout/Theme/index';
import { UserProvider } from './components/Layout/Product/GetApi/GetContext';
import { ItemProvider } from './components/Layout/Product/GetApi/ItemContext';

const App = () => {
    return (
        <ThemeProvider>
            <UserProvider>
                <ItemProvider>
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/L" element={<Otp />} />
                        <Route path="/home" element={<HomePage />} />
                        <Route path="/signup" element={<SignUp />} />
                        <Route path="/reset" element={<Password />} />
                        <Route path="/profile" element={<HomeFile />} />
                        <Route path="/privacy" element={<Privacy />} />
                        <Route path="/terms" element={<Terms />} />
                        <Route path="/item" element={<ItemMovie />} />
                        <Route path="/search" element={<Search />} />
                        <Route path="/itemlove" element={<ItemLove />} />
                        <Route path="/love" element={<LoveMovie />} />
                        <Route path="/ticket" element={<Myticket />} />
                        <Route path="/lmovie" element={<LatestMovie />} />
                        <Route path="/boking" element={<Select />} />
                        <Route path="/pay" element={<Pay />} />
                        {/* <Route path="/pay" element={<Pay />} /> */}
                    </Routes>
                </ItemProvider>
            </UserProvider>
        </ThemeProvider>
    );
};

export default App;
