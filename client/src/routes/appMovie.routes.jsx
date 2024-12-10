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
import Search from '@/pages/Search';
import ItemLove from '@/components/Layout/Product/LoveMovie/ItemLove';
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
import NotFound from '@/pages/404';
import VietQr from '@/layout/qrcode/payVietQr';
import SelectSeller from '@/pages/Booking/seller';
import TicketHistory from '@/components/common/file/history/ticket';
import SortTrailer from '@/pages/video';
import PayMentVoucher from '@/pages/Booking/payment/voucher/Discount';
const RouteMovie = () => {
    return (
        // <div>
        <Routes>
            <Route path="/" exact element={<Home />} />
            <Route path="/L" element={<Login />} />
            <Route path="/login" element={<Otp />} />
            <Route path="/history" element={<LastMovies />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/home" element={<HomeMovie />} />
            <Route path="/test" element={<TestOtp />} />
            <Route path="/reset" element={<Password />} />
            <Route path="/search" element={<Search />} />
            <Route path='/search/:id' element={<ItemLove />} />
            <Route path='/itemLove' element={<ItemLove />} />
            <Route path="/love" element={<LoveMovie />} />
            <Route path='/details/:id' element={<MovieDetails />} />
            <Route path='/details/:id/seller' element={<SelectSeller />} />
            <Route path='/details/:id/seller/booking' element={<Select />} />
            <Route path='/details/:id/seller/booking/pay' element={<Pay />} />
            <Route path='/details/:id/seller/booking/pay/vietqr' element={<VietQr />} />
            <Route path="/discount" element={< PayMentVoucher/>} />
            <Route path='/geners/:id' element={<Genners />} />
            <Route path='/qrcode/:id' element={<QrCode />} />
            <Route path="/sorts" element={<SortTrailer />} />

            <Route path="/profile" element={<HomeFile />} >
                <Route path="privacy" element={<Privacy />} />
                <Route path="terms" element={<Terms />} />
                <Route path="rename" element={<UserRename />} />
                <Route path="change-password" element={<ChangePassWord />} />
                <Route path='voucher' element={<TicketVoucher />} />
                <Route path='setting' element={<SettingProfile />} >
                    <Route path='ticket' element={<TicketHistory />} />
                </Route>
            </Route>
            <Route path="/ticket" element={<Myticket />} />
            {/* <Route path="*" element={<NotFound/>}/> */}

            {/* </ThemeProvider> */}
        </Routes>
        // </div>
    );
}

export default RouteMovie;