import { database } from '@/components/firebase/firebase';
import { ref, get, update } from 'firebase/database';

const updateBookingStatus = async ( bookingId, updateData) => {
    try {
        const PayRef = ref(database, 'users/dataTicket/book');
        const snapshot = await get(PayRef);

        if (snapshot.exists()) {
            const data = snapshot.val();
            for (const key in data) {
                if (data[key].id == bookingId) {
                    await update(ref(database, `users/dataTicket/book/${key}`), updateData);
                    return;
                }
            }
            console.log("No matching booking found.");
        } else {
            console.log("No data found in 'book' path.");
        }
    } catch (error) {
        console.error("Error updating data:", error);
    }
}; 


export default updateBookingStatus;