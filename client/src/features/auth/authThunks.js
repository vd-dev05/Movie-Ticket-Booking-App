import UserHistory from '@/services/users/history';
import UserServices from '@/services/users/User.controller';
import { createAsyncThunk } from '@reduxjs/toolkit';
// import axios from 'axios';
// const BaseUrl = import.meta.env.VITE_REACT_API_URL 
export const loginUser = createAsyncThunk('auth/login' , async ( credential) => {
    try {
        const response = await UserServices.loginUser(credential);
        return response;
    } catch (error) {
        throw new Error(error?.message || 'Login failed');
    }
});

export const getHistoryUser = createAsyncThunk('auth/user/history', async () => {
    try {
        const response = await UserHistory.getLastMovie();
        // console.log(response);
        // console.log(response);
        
        return response.history || [];
    } catch (error) {
        throw new Error(error?.message || 'Failed to get history');
    }
})

export const getLoveUser = createAsyncThunk('auth/user/love', async () => {
    try {
        const response = await UserHistory.getLoveMovie()
      
        
        return response;
    } catch (error) {
        throw new Error(error?.message || 'Failed to get love');
    }
})

export const logoutUser = createAsyncThunk('auth/logout', async () => {
    localStorage.removeItem('asscess_token');
    // try {
    //     await axios.post(`${BaseUrl}/api/v1/users/logout`)
    // } catch (error) {
    //     throw new Error(error?.message || 'Logout failed')
    // }
})
        // try {
        //     const response = await axios.post(`${BaseUrl}/api/v1/users/signin`, credential)
        //     if (response.statusText === 'OK') {
        //         return response.data
        //     }else { 
        //         throw new Error(response.message || 'Login failed')
        //     }
        // } catch (error) {
            
        //     // console.log(error);
            
        //     return rejectWithValue(error.response.data)
        // }