import mongoose from "mongoose"
import Collections from "../../database/collections.js"

const commentSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true,
    },
    email : {
        type : String,
        required : true,
    },
    movie_id : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "movies"
    },
    date :{
        type : Date,
        default : Date.now,
    },
    text : String

})
const Comments = mongoose.model(Collections.COMMENTS,commentSchema)
export {
    Comments
}