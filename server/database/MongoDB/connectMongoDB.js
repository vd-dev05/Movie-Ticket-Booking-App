import mongoose from 'mongoose';
import { DB_CONFIG } from '../../config/db.config.js';
const connectDB = async () => {
    try {
       await  mongoose.connect(`${DB_CONFIG.url_mongodb}`)
        console.log('Connected to MongoDB');
    } catch (error) {
        console.error(error.message);}
}
export default  connectDB;
