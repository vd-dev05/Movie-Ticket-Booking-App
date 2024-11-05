import mongoose from "mongoose";
import Collections from "../../database/collections.js";
const cardSchema = new mongoose.Schema({
    number  : {
        type : Number,
        required : true,
    },
    cvv : { 
        type : Number,
        required : true,
        min :1,
        max :3
    },
    name : {
        type : String,
            required : true,
        },
    date : {
        type : String,
        required : true,
    }

})
const ticketSchema = new mongoose.Schema({
    movieQr : {
        type : String,
        // required : true,    
        unique: true
    },
    seat : {
        type : Array,
        required : true
    },
    price : {
        type : Number,
        required : true
    },
    status : {
        type : String,
        enum : ['Active', 'Canceled', 'Expired'],
        default : 'Active',
    }
},{
    _id : false
})
ticketSchema.pre('save', function(next) {
    if (!this.movieQr) {
        this.movieQr = `MOV-${new mongoose.Types.ObjectId()}`
    }
    next();
})
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
            // required : true,
        },
        avatar : {
            type : String,
        },
        phone : {
            type : String,
            
        },
        address : {
            type : String,
        },
        role : {
            type : String,
            enum : ['Admin', 'User'],
            default : 'User',
        },
        movieLove : [{
            type : mongoose.Schema.Types.ObjectId,
            ref : "movies",
            list : {
                type : Boolean,
                default : false
            },
            required : true
        }],
        ticket : [{
            _id : false,
            movieId : {
                type : mongoose.Schema.Types.ObjectId,
            },
            book : {
                type : ticketSchema,
                ref : "movies",

            },
        
            
        }],
        comment :[ {
            _id : false,
            movieId : {
                type : mongoose.Schema.Types.ObjectId,
            },
            status : {
                type : String,
                enum : ['Active', 'InActive'],
                default : 'InActive',
            },
            date : Date
            
        }],
    history : {
        type : [mongoose.Schema.Types.ObjectId],
        ref : "Ticket",
    },
    card : {
        type : cardSchema,
        ref : "Card",
    },
    salt : String
})
const bookSchema = new mongoose.Schema({
    
    seats :[mongoose.Schema.Types.Mixed]
    
})
const movieSchema = new mongoose.Schema({
    price : Number,
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
const Booking = mongoose.model(Collections.BOOKINGS, bookSchema)
export  {
    Movies,
    Users,
    Booking
}