// import UserServices from '@/services/users/User.controller';
import { createAsyncThunk } from '@reduxjs/toolkit';
// import axios from 'axios';
// const BaseUrl = import.meta.env.VITE_REACT_API_URL 
export const loveUser = createAsyncThunk('user/love/access' , ( credential) => {
    // console.log(credential);
    
  return credential
});
export const history = createAsyncThunk('user/history/access' , ( credential) => {
 
    return credential
});