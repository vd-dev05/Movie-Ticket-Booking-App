import mongoose from "mongoose";
import Collections from "../../database/collections.js";
const userSchema = new mongoose.Schema({
    name : {
        type : String,
        // required : true,
    },  
    // email: {
    //     type: String,
    //     required: true,
    //     unique: true,
    // },
    password : {
        type : String,
        required : true,
    },
    avatar : {
        type : String,
    },
    phone : {
        type : Number,
        
    },
    address : {
        type : String,
    },
    role : {
        type : String,
        enum : ['Admin', 'User'],
        default : 'User',
    },
    movieLove : {
        type : [mongoose.Schema.Types.ObjectId],
        ref : "Movie",
    },
    ticket : {
        type : [mongoose.Schema.Types.ObjectId],
        ref : "Ticket",
    },
    history : {
        type : [mongoose.Schema.Types.ObjectId],
        ref : "Ticket",
    },
    card : {
        type : [mongoose.Schema.Types.ObjectId],
        ref : "Card",
    },
    hash : {
        type : String,
        required : true,
    }
    
})

const movieSchema = new mongoose.Schema({
    plot: String,
    genres : Array,
    runtime : Number,
    rated : String,
    cast : String,
    title: String,
    fullplot: String,
    language: Array,
    released : Date,
    directors : Array,
    writers : Array,
    awards : String,
    lastupdated : Date,
    year : Number,
    imdb : Object,
    countries : Array,
    type : String,
    tomatoes : Object,
    num_mflix_comments : Number,
   
})
const Users =  mongoose.model(Collections.USERS,userSchema)
const Movies = mongoose.model(Collections.MOVIES, movieSchema)
export  {
    Movies,
    Users,
 
}