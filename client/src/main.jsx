import React, { useState } from 'react'
import ReactDOM from 'react-dom/client'
// import App from './App.jsx'
// import './App.css'
import './index.css'
// import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
// import Home from './components/Layout/Home/homebaner'
// import Login from './components/Layout/Dasboard/Login';
// import Otp from './components/Layout/Dasboard/OtpLog';
// import SignUp from './components/Layout/Dasboard/SignUp';
// import Password from './components/Layout/Dasboard/ResetPass';
// import HomePage from './components/Layout/Home/Homepage';
// import LatestMovie from './components/Layout/Product/Lastmovie/CardLmovie';
// import ItemMovie from './components/Layout/Product/Lastmovie/itemMovie';
// import Select from './components/Layout/Product/Booking/SelectSeats';
// import Pay from './components/Layout/Product/Booking/PayBooking';
// import HomeFile from './components/Layout/Product/Profile/homeFile';
// import Privacy from './components/Layout/Product/Profile/Privacy';
// import Terms from './components/Layout/Product/Profile/Terms';
// import Search from './components/Layout/Product/Search';
// import LoveMovie from './components/Layout/Product/LoveMovie';
// import ItemLove from './components/Layout/Product/LoveMovie/ItemLove';
// import Myticket from './components/Layout/Product/Myticket';
// import Theme from './components/Layout/Theme';

import 'boxicons'
import App from './App';
import Test from './components/Layout/Product/test';
// import FireBase from './components/firebase/test';

// import About from './Component/Layout/About/about.jsx'
// import Contact from './Component/Layout/Contact/contact.jsx';
// import Login from './Component/Layout/Dasboard/Login.jsx';
// import Otp from './Component/Layout/Dasboard/OtpLog.jsx';
// import { ClerkProvider } from '@clerk/clerk-react'
// import SignUp from './Component/Layout/Dasboard/Signup';
// import TicketBooking from './Component/Product/booking/ticket';
// import TestVeryOtp from './Component/Layout/Dasboard/otpveroy';
// const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY
// if (!PUBLISHABLE_KEY) {
//     throw new Error("Missing Publishable Key")
// }
// import { BrowserRouter as Router } from 'react-router-dom';

import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
// import Test from './components/Layout/Product/test';
// import Test from './components/Layout/Product/test';
ReactDOM.createRoot(document.getElementById('root')).render(

    <React.StrictMode>
        {/* <ClerkProvider publishableKey={PUBLISHABLE_KEY} afterSignOutUrl="/"> */}
        <Router>

            <App>

            </App>
        </Router>
        {/* <Router>
            <Routes>

                <Route path="/test" element={<Test />} />
            </Routes>
        </Router> */}
        {/* <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/L" element={<Otp />} />
                <Theme.Provider value={{ theme, setTheme }}>
                    <Route path="/home" element={<HomePage />} />
                </Theme.Provider>

                <Route path="/signup" element={<SignUp />} />
                <Route path="/reset" element={<Password />} />
                <Route path="/lmovie" element={<LatestMovie />} />
                <Route path="/item" element={<ItemMovie />} />
                <Route path="/boking" element={<Select />} />
                <Route path="/pay" element={<Pay />} />
                <Route path="/profile" element={<HomeFile />} />
                <Route path="/privacy" element={<Privacy />} />
                <Route path="/terms" element={<Terms />} />
                <Route path="/search" element={<Search />} />
                <Route path="/itemlove" element={<ItemLove />} />
                <Route path="/love" element={<LoveMovie />} />
                <Route path="/ticket" element={<Myticket />} />
                <Route path="/test" element={<Test />} />




            </Routes>

        </Router> */}

        {/* </ClerkProvider> */}
    </React.StrictMode>,
)
