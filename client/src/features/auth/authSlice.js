import { createSlice } from "@reduxjs/toolkit";
import {  getHistoryUser, getLoveUser, loginUser, logoutUser } from "./authThunks";

const initialState = {
    user: null,
    isLoading: false,
    isError: false,
    successfull: false,
    message: null,
    loveData: null,
    historyData: null,
    isLoadingData : false,
    isLogout : false,
    vouchers : null
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        login: (state) => {
            for (const key in initialState) {
                state[key] = initialState[key]
            }
        },
        logout: (state) => {
            state.user = null
            state.successfull = false
            state.isLoading = false
            state.isError = false
            state.message = null
            state.loveData = null
            state.historyData = null
            isLogout = true
        }
    },
    extraReducers: (builder) => {
        // login 
        builder.addCase(loginUser.pending, (state, action) => {
            state.isLoading = true
            // state.message = null
            // state.isError = false
            // console.log(action);

            // state.message =action.payload.message
        })
        builder.addCase(loginUser.fulfilled, (state, action) => {
            state.successfull = true
            state.loveData = action.payload.data.movieLove
            state.user = action.payload
            state.isLoading = false
            state.isError = false
            state.message = action.payload.message
            state.historyData = action.payload.data.history
            state.vouchers = action.payload.data.vouchers
            // console.log(action.payload.data.vouchers);
            
            // console.log(action.payload.data.movieLove);
        })
        builder.addCase(loginUser.rejected, (state, action) => {

            // console.log(action);

            state.isLoading = false
            state.isError = true
            state.message = action.error.message
            // console.log('Error:', action.error.message)

        })
       

        builder.addCase(getLoveUser.pending, (state) => {
          
            state.loveData = null
            state.isLoadingData = false
        })
    
    
        builder.addCase(getLoveUser.fulfilled , (state, action) => {
            state.isLoadingData = true
            state.loveData = action.payload
            // console.log(action);
            
        })
        builder.addCase(getLoveUser.rejected, (state, action) => {
            // console.log(action);

        })
        builder.addCase(getHistoryUser.pending, (state) => {
            // console.log(state);
            state.historyData= null
            state.isLoading = false
        })



        builder.addCase(getHistoryUser.fulfilled, (state, action) => {
            // console.log(action);
            
            state.isLoadingData = true
            state.historyData = action.payload
        })
        builder.addCase(getHistoryUser.rejected, (state, action) => {
            // console.log(action);

        })
        // logout
        builder.addCase(logoutUser.fulfilled, (state) => {
            state.isLogout = true
            state.user = null
            state.successfull = false
            state.isLoading = false
            state.isError = false
            state.message = null
            state.loveData = null
            state.historyData = null
        })
        builder.addCase(logoutUser.rejected, (state, action) => {
            console.log(action);
        })

    
    }
})

export const {  login  } = authSlice.actions
export default authSlice