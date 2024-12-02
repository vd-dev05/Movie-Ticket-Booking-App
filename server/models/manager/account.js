import mongoose from "mongoose";

const newAccountSchema = new mongoose.Schema({
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
    logo : String
})

const ManagerSeller = mongoose.model('manager' ,newAccountSchema)
export {
    ManagerSeller  
}