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
    },
    movieId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "movies",
    },
    status: {
        type: String,
        enum: ['Active', 'InActive'],
        default: 'InActive',
    },
    commentId : {
        type: mongoose.Schema.Types.ObjectId,
        ref: "comments"
    },
    createAt : {
        type: Date,
        default: Date.now,
    },
    updatedAt : {
        type: Date,
        // default: Date.now,
    }

})
const Comments = mongoose.model(Collections.COMMENTS,commentSchema)
export {
    Comments
}