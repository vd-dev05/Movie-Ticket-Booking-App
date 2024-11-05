import {Users}from '../models/movie/index.js'
import * as Yup from 'yup'
const UserMiddleware = {
        createUser : async (req,res,next) => {
        try {
                const isValidationEmail = await Users.findOne({ email: req.body.email})
                const isValidationPhone = await Users.findOne({ phone: req.body.phone})
                if (isValidationEmail) throw new Error("Email already exists in the system")
                if (isValidationPhone) throw new Error("Phone already exists in the system")
             
           
        } catch (error) {
            return res.status(403).json({
                error: error.message,
                success: false,
                data: null
            })
        }
        return next();
    },
    loginUser : async (req,res,next) => {
        try {
            if (!req.body.email) throw new Error("You must provide a email")
            if (!req.body.password) throw new Error("You must provide a password")
            
            const data = await Users.findOne({ phone: req.body.phone})
            if (data.phone !== req.body.phone) throw new Error("Phone not found in the system")
            if (data.password !== req.body.password) throw new Error("Password  not found in the system")
            // console.log(data);
            
        return next();
        } catch (error) {
            return res.status(403).json({
                error: error.message,
                success: false,
                data: null
            })
        
        }},
    checkEmpty : (key,value) => {
        if (!key) throw new Error(value)
    }
}
export default UserMiddleware