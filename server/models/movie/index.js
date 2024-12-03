import mongoose from "mongoose";
import Collections from "../../database/collections.js";
// sepay 
const transactionSchema = new mongoose.Schema({
    gateway: String,
    transaction_date: String,
    account_number: String,
    sub_account: String,
    amount_in: Number,
    amount_out: Number,
    accumulated: Number,
    code: String,
    transaction_content: String,
    reference_number: String,
    body: String
  });
  
  const orderSchema = new mongoose.Schema({
    id: Number,
    total: Number,
    payment_status: String
  });
  


// ticket booking canncell 
const cancelSchema = new mongoose.Schema({
    ticketId : {
        type: mongoose.Schema.Types.ObjectId,
        // ref: ""
    },
    movieId : {
        type: mongoose.Schema.Types.ObjectId,
        ref: "movies"
    },
    cancelReason: String,
    checkBox : {
        type : String,
        enum : [
            "I have a better deal",
            "Some other work, can't come",
            "I want to book another movie",
            "Location is too far from my location",
        ]
    },
    canceledAt: {
        type: Date,
        default: Date.now()
    }
})


// Card Schema
const cardSchema = new mongoose.Schema({
    number: {
        type: Number,
        required: true,
    },
    cvv: {
        type: Number,
        required: true,
        min: 1,
        max: 999
    },
    name: {
        type: String,
        required: true,
    },
    date: {
        type: String,
        required: true,
    }
});

// Ticket Schema
const ticketSchema = new mongoose.Schema({
    movieQr: {
        type: String,
    },
    seat: {
        type: [String], // Array of strings to store seat identifiers
    },
    price: {
        type: Number,
    },
    status: {
        type: String,
        enum: ['Active', 'Cancelled', 'Expired'],
        default: 'Active',
    },
    date : {
        type : Date,
    },
    codeQR : String
});

// Auto-generate movieQr if not provided
// ticketSchema.pre('save', function (next) {
//     if (!this.movieQr) {
//         this.movieQr = `MOV-${new mongoose.Types.ObjectId()}`;
//     }
//     next();
// });

// User Schema
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    avatar: {
        type: String,
    },
    phone: {
        type: String,
        required: true,
    },
    address: {
        type: String,
    },
    role: {
        type: String,
        enum: ['Admin', 'User'],
        default: 'User',
    },
    movieLove: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "movies",
        required: true,
        list: {
            type: Boolean,
            default: false
        }
    }],
    ticket: [{
        movieId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "movies", // Reference to movie model
        },
        book: {
            type: ticketSchema, // Embedding ticket schema here
            ref: "booking", // Optionally, set this for better referencing
        },
    }],
    comment: [{
        _id: false,
        movieId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "movies",
        },
        status: {
            type: String,
            enum: ['Active', 'InActive'],
            default: 'InActive',
        },
        date: Date,
      
    }],
    history: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "movies",
        required: true
    }],
    card: {
        type: cardSchema,
        ref: "Card",
    },
    salt: {
        type: String,
    }
});

// Booking Schema
const bookSchema = new mongoose.Schema({
    movieId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "movies"
    },
    sellerId : {
        type: mongoose.Schema.Types.ObjectId,
        ref: "manager"
    },
    seats: [mongoose.Schema.Types.Mixed] ,
    price : Number ,
    address : {
        type: String,
        required: true,
    },
    createdAt : {
        type: Date,
        default: Date.now()
    },
    updatedAt : {
        type: Date, 
    }
    
});

// Movie Schema
const movieSchema = new mongoose.Schema({
    plot: String,
    genres: Array,
    runtime: Number,
    rated: String,
    cast: String,
    title: String,
    fullplot: String,
    languages: Array,
    released: Date,
    directors: [String],
    writers: [String],
    awards: {
        wins: String,
        nominations: String,
        text : String
    },
    lastupdated: Date,
    year: Number,
    imdb: {
        rating : Number,
        votes : Number,
    }, // Mixed to allow flexible structure
    countries: [String],
    type: String,
    tomatoes: mongoose.Schema.Types.Mixed, // Mixed type for dynamic content
    trailer : {
        type: String,
        required: true,
    },
    cast : Array,
    num_mflix_comments: Number,
});

// Models
const Users = mongoose.model(Collections.USERS, userSchema);
const Movies = mongoose.model(Collections.MOVIES, movieSchema);
const Booking = mongoose.model(Collections.BOOKINGS, bookSchema);
const Cancel = mongoose.model(Collections.CANCEL, cancelSchema);

//  Model sepay 
const Transaction = mongoose.model('Transaction', transactionSchema);
const Order = mongoose.model('Order', orderSchema);

// Export Models

export {
    Movies,
    Users,
    Booking,
    Cancel,
    Order,
    Transaction
};
