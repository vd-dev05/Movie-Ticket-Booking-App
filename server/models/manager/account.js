import mongoose from "mongoose";

const newAccountSchema = new mongoose.Schema({
    email : {
        type : String,
        required : true,
    },
    role : {
        type : String,
        enum : ['Admin', 'Seller'],
        default : "Seller"
    },
    code : {
        type : String,
        required : true
    },
    taxCode:{
        type : String,
        required : true
    },
    addressManager : {
        type : String,
        required : true
    },
    nameSeller : {
        type : String,
        required : true
    },
    password : {
        type : String,
        required : true
    },
    seller : {
        type : String,
        enum : ['CGV', 'LOTTE','GALAXY','BETA','BHD']
    },
    logo : String
})

const ManagerSeller = mongoose.model('manager' ,newAccountSchema)
export {
    ManagerSeller  
}