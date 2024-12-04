import { configureStore } from '@reduxjs/toolkit';
import authenticated from './reducers/authenticated';
import authSlice from '@/features/auth/authSlice';
import dataSlice from '@/features/user/userSlice';
import SellerSlice from '@/features/movie/movieSlice';

const store = configureStore({
    reducer: {
        authenticated : authenticated.reducer,
        auth  : authSlice.reducer,
        user:  dataSlice.reducer,
        seller : SellerSlice.reducer
    },
  });

export default store