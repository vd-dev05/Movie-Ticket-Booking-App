import { Routes, Route } from 'react-router-dom';
import { ThemeProvider } from '@/context/Theme/index';
import React, { lazy } from 'react';
import Home from '@/pages/Home/homebaner';
// const Login = lazy(() => import('@/pages/Login/bannerLogin'))
import Login from '@/pages/Login/bannerLogin';
import Otp from '@/pages/Login/login';
import { TestMongo } from '@/components/User/testMongo';
import SignUp from '@/pages/SignUp/signUp';
// import HomePage from '@/pages/Home/Homepage';
// const HomeMovie = lazy(() => import('@/pages/Home/HomeMovie'))
import HomeMovie from '@/pages/Home/HomeMovie';
import Select from '@/pages/Booking/seats/index';
import TestOtp from '@/components/User/test';
import Password from '@/components/Layout/Dasboard/ResetPass';
import { UserProvider } from '@/context/User/index';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Search from '@/pages/Search';
import ItemLove from '@/components/Layout/Product/LoveMovie/ItemLove';
import SignupManager from '@/pages/manager/signup';
import HomeManager from '@/pages/manager/dashboard';
import UserOCR from '@/pages/manager/layout/userOCR';
import Settings from '@/pages/manager/layout/setting';
import Total from '@/pages/manager/layout/total';
import TicketBooking from '@/pages/manager/layout/ticket';
import LastMovies from '@/pages/Home/lastMovie/movieCard';
import MovieDetails from '@/pages/Home/details';
import Privacy from '@/components/common/file/Privacy';
import Terms from '@/components/common/file/Terms';
import UserRename from '@/components/common/file/UserRename';
import ChangePassWord from '@/components/common/file/ChangePass';
import HomeFile from '@/pages/Profile/homeFile';
import SettingProfile from '@/components/common/file/Setting';
import TicketVoucher from '@/components/common/file/Voucher';
import Myticket from '@/pages/MyTicket';
import LoveMovie from '@/pages/Love';
import Genners from '@/components/common/category';
import Pay from '@/pages/Booking/payment';
import QrCode from '@/components/common/booking/detailsQrcode'
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
                        <Route path="/test" element={<TestOtp />} />
                        <Route path="/reset" element={<Password />} />
                        <Route path="/search" element={<Search />} />
                        <Route path='/search/:id' element={<ItemLove />} />
                        <Route path='/itemLove' element={<ItemLove />} />
                        <Route path="/lmovie" element={<LastMovies />} />
                        <Route path="/love" element={<LoveMovie />} />
                        <Route path='/details/:id' element={<MovieDetails />} />
                        <Route path='/details/:id/booking' element={<Select />} />
                        <Route path='/details/:id/booking/pay' element={<Pay />} />
                        <Route path='/geners/:id' element={<Genners/>}/>
                        <Route path='/qrcode/:id' element={<QrCode/>}/>
                    </Routes>
                    <Routes>
                        <Route path="/profile" element={<HomeFile />} >
                            <Route path="privacy" element={<Privacy />} />
                            <Route path="terms" element={<Terms />} />
                            <Route path="rename" element={<UserRename />} />
                            <Route path="change-password" element={<ChangePassWord/>} />
                            <Route path='setting' element={<SettingProfile/>}/>
                            <Route path='voucher' element={<TicketVoucher/>}/>  
                        </Route>
                    </Routes>
                    <Routes>
                    <Route path="/ticket" element={<Myticket/>} />
                    </Routes>
                </UserProvider>
            </ThemeProvider>
            <Routes>
                <Route path="/auth/signup/manager" element={<SignupManager />} />
                <Route path='/manager' element={<HomeManager />}>
                    <Route path="ticket" element={<TicketBooking />} />
                    <Route path="qrcode" element={<UserOCR />} />
                    <Route path="setting" element={<Settings/>}/>
                    <Route path="total" element={<Total />} />
                </Route>
            </Routes>
            <ToastContainer />
        </div>
    );
}

export default RouteMovie;