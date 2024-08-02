import React from 'react'
import ReactDOM from 'react-dom/client'
// import App from './App.jsx'
// import './App.css'
import './index.css'
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
// import Layout from './Component/Layout/Layout.jsx'
import Home from './components/Layout/Home/homebaner'
import Login from './components/Layout/Dasboard/Login';
import Otp from './components/Layout/Dasboard/OtpLog';
import SignUp from './components/Layout/Dasboard/SignUp';
import 'boxicons'
import Password from './components/Layout/Dasboard/ResetPass';
import HomePage from './components/Layout/Home/Homepage';
import LatestMovie from './components/Layout/Product/cardLmovie';
import ItemMovie from './components/Layout/Product/itemMovie';
import Select from './components/Layout/Product/Booking/selectSeats';
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
ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        {/* <ClerkProvider publishableKey={PUBLISHABLE_KEY} afterSignOutUrl="/"> */}

            <Router>
                {/* <nav>
                    <ul>
                        <li><Link to="/home">Home</Link></li>
                        <li><Link to="/about">About</Link></li>
                        <li><Link to="/contact">Contact</Link></li>
                    </ul>
                </nav> */}

                <Routes>
                    {/* <Route path="/" element={<Layout />} /> */}
                    <Route path="/" element={<Home />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/L" element={<Otp />} />
                    <Route path="/home" element={<HomePage />} />
                    <Route path="/signup" element={<SignUp />} />
                    <Route path="/reset" element={<Password />} />
                    <Route path="/lmovie" element={<LatestMovie />} />
                    <Route path="/item" element={<ItemMovie />} />
                    <Route path="/boking" element={<Select/>} />
                  
                </Routes>

            </Router>

        {/* </ClerkProvider> */}
    </React.StrictMode>,
)
