import { createSlice } from "@reduxjs/toolkit";
import { SellerBooking } from "./movieThunks";

const initialState = {
    seller : null,
    isLoading: false,
    isError: false,
    successfull: false,
    message: null,
}

const SellerSlice = createSlice({
    name: 'seller',
    initialState,
    reducers: {
        send: (state) => {
            for (const key in initialState) {
                state[key] = initialState[key]
            }
        },
    },
    extraReducers: (builder) => {
       builder.addCase(SellerBooking.pending , (state,actions) => {
         state.isLoading = true
         state.message = null
         state.isError = false
         state.seller= null
        //  console.log(actions);
       })
       builder.addCase(SellerBooking.fulfilled, (state, actions) => {
         state.successfull = true
         state.seller = actions.payload
         state.isLoading = false
         state.isError = false
         state.message = actions.payload.message
       })
       builder.addCase(SellerBooking.rejected, (state, actions) => {
         state.isLoading = false
         state.isError = true
         state.message = actions.error.message
       })
    
    }
})

// export const {  send  } = authSlice.actions
export default SellerSlice