
import SignupManager from '@/pages/manager/signup';
import HomeManager from '@/pages/manager/dashboard';
import UserOCR from '@/pages/manager/layout/userOCR';
import Settings from '@/pages/manager/layout/setting';
import Total from '@/pages/manager/layout/total';
import TicketBooking from '@/pages/manager/layout/ticket';
import { Route, Routes } from 'react-router-dom';
import NotFound from '@/pages/404';
import SignIn from '@/pages/manager/login';
import CreateTicket from '@/pages/manager/layout/booked';
import GetIdMovie from '@/pages/manager/layout/movieSeller';
const RootManager = () => {
    return (
        <Routes>
            <Route path="/auth/signin/manager" element={<SignIn />} />
            <Route path="/auth/signup/manager" element={<SignupManager />} />
            <Route path='/manager' element={<HomeManager />}>
                <Route path="ticket" element={<TicketBooking />} />
                <Route path="qrcode" element={<UserOCR />} />
                <Route path="setting" element={<Settings />} />
                <Route path="total" element={<Total />} />
                <Route path="create" element={< CreateTicket     />} />
                <Route path="getId" element={< GetIdMovie     />} />
            </Route>
        </Routes>
    );
}

export default RootManager;