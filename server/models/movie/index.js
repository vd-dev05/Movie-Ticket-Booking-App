import mongoose from "mongoose";
import Collections from "../../database/collections.js";

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
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        enum: ['Active', 'Canceled', 'Expired'],
        default: 'Active',
    }
});

// Auto-generate movieQr if not provided
ticketSchema.pre('save', function (next) {
    if (!this.movieQr) {
        this.movieQr = `MOV-${new mongoose.Types.ObjectId()}`;
    }
    next();
});

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
            ref: "Ticket", // Optionally, set this for better referencing
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
        date: Date
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
    seats: [mongoose.Schema.Types.Mixed] // Mixed can be used for dynamic data types
});

// Movie Schema
const movieSchema = new mongoose.Schema({
    price: Number,
    plot: String,
    genres: [String],
    runtime: Number,
    rated: String,
    cast: String,
    title: String,
    fullplot: String,
    language: [String],
    released: Date,
    directors: [String],
    writers: [String],
    awards: String,
    lastupdated: Date,
    year: Number,
    imdb: mongoose.Schema.Types.Mixed, // Mixed to allow flexible structure
    countries: [String],
    type: String,
    tomatoes: mongoose.Schema.Types.Mixed, // Mixed type for dynamic content
    num_mflix_comments: Number,
});

// Models
const Users = mongoose.model(Collections.USERS, userSchema);
const Movies = mongoose.model(Collections.MOVIES, movieSchema);
const Booking = mongoose.model(Collections.BOOKINGS, bookSchema);

// Export Models
export {
    Movies,
    Users,
    Booking
};
