import { createSlice } from "@reduxjs/toolkit";
import { loveUser } from "./userThunks";

const initialState = {
   data : null ,
   isLoading : false,
   isError : false,
   successfull : false,
//    message  :null
}

const dataSlice = createSlice({
    name : 'user' ,
    initialState,
    reducers : {
        loveMovie : (state) => {
            for (const key in initialState) {
                state[key] = initialState[key]
            }
        }
    },
    extraReducers : (builder) => {
        // login 
        builder
        .addCase( loveUser.pending , (state,action) => {
            state.isLoading = true
            // state.message = null
            // state.isError = false
            // console.log(action);
            
            // state.message =action.payload.message
        })
       .addCase( loveUser.fulfilled, (state,action) => {
            state.successfull = true
            state.user = action.payload
            state.isLoading = false
            state.isError = false
            // state.message = action.payload.message
            // console.log(action);
        })
       .addCase( loveUser.rejected,  (state, action) => {
            state.isLoading = false
            state.isError = true
            // state.message = action.error.message
            // console.log('Error:', action.error.message)

        })
        // builder.addDefaultCase((state, action) => {
        //     // Log bất kỳ action nào không được xử lý
        //     console.log('Unhandled action:', action.type);
        //     // state.status = 'idle'; // Set lại trạng thái về idle khi không khớp với bất kỳ action nào
        //   });
        
    }
})

// export const {  login } = authSlice.actions
export default dataSlice