
import SignupManager from '@/pages/manager/signup';
import HomeManager from '@/pages/manager/dashboard';
import UserOCR from '@/pages/manager/layout/userOCR';
import Settings from '@/pages/manager/layout/setting';
import Total from '@/pages/manager/layout/total';
import TicketBooking from '@/pages/manager/layout/ticket';
import { Route, Routes } from 'react-router-dom';
import NotFound from '@/pages/404';
const RootManager = () => {
    return (
        <Routes>
            <Route path="/auth/signup/manager" element={<SignupManager />} />
            <Route path='/manager' element={<HomeManager />}>
                <Route path="ticket" element={<TicketBooking />} />
                <Route path="qrcode" element={<UserOCR />} />
                <Route path="setting" element={<Settings />} />
                <Route path="total" element={<Total />} />
            </Route>
            {/* <Route path="*" element={<NotFound/>}/> */}
        </Routes>
    );
}

export default RootManager;