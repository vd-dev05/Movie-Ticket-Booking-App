import mongoose from "mongoose";
import Collections from "../../database/collections.js";

const sessionsSchema = new mongoose.Schema({
    user_id : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "users"
    },
    jwt : String,
    createAt : {
        type : Date,
        default : Date.now()
    },
    session_id : String,
    expires : Date,
    ip_address : String,
    user_agent : String,
    last_activity : Date,
    status : String,
    // Add more fields as needed for session management
})

const Sessions = mongoose.model(Collections.SESSIONS, sessionsSchema)
export {
    Sessions 
}