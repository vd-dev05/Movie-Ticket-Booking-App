import mongoose from "mongoose"
import Collections from "../../database/collections.js"

const commentSchema = new mongoose.Schema({
    name : {
        type : String,
        // required : true,
    },
    email : {
        type : String,
        // required : true,
    },
    movie_id : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "movies"
    },
    date :{
        type : Date,
        default : Date.now,
    },
    text : String,
    userId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "users"
    },
    star : {
        type : Number,
        default : 0,
        min : 0,
        max : 5,
        validate : {
            validator : Number.isInteger,
            message : "star must be an integer value between 0 and 5"
        }
    }

})
const Comments = mongoose.model(Collections.COMMENTS,commentSchema)
export {
    Comments
}