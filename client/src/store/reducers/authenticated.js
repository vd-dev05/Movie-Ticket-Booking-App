import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"; 
import axios from "axios";

const initState = {
    data : null,
    message : '',
    successfull : false,
    isError : false,
    isLoading  : false
}
// call api 
export const queryAuthenticated = createAsyncThunk('QUERY_AUTHENTICATED', async (payload) => {
    console.log(payload);
    
    const response = await axios.post(`${import.meta.env.VITE_REACT_API_URL}/api/v1/users/signin`, payload)
    return response.data
})

const authenticated = createSlice({
    name: "authenticated",
    initialState: initState  ,
    reducers :{
        reset : (state) => {
            for (const key in initState) {
                state[key] = initState[key]
            }
        }
    },
    extraReducers(builder)  {
        builder
        // login user
        .addCase(queryAuthenticated.pending , (state,action) => {
            state.isLoading = true
        })
        .addCase(queryAuthenticated.fulfilled , (state,action) => {
            console.log(action);
            
        })
       .addCase(queryAuthenticated.rejected, (state,action) => {
            console.log(action);
            
        })
        //resgiter 
        
    }
})
export default authenticated