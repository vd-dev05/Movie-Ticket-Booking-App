import BookingController from '@/services/users/booking';
import { createAsyncThunk } from '@reduxjs/toolkit';
export const SellerBooking = createAsyncThunk('seller/all' , async ( credential) => {
    try {
        const response = await BookingController.getBookingSeller(credential);
        return response;
    } catch (error) {
        throw new Error(error?.message || 'Data failed');
    }
});