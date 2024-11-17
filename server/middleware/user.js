import {Users}from '../models/movie/index.js'
import { hashPass, verifyPass } from '../utils/hashPassword.js'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import { Sessions } from '../models/auth/sessions.js'
dotenv.config()

const UserMiddleware = {
        createUser : async (req,res,next) => {
        try {
                if (!req.body) throw new Error('You must provide')
                // const isValidationEmail = await Users.findOne({ email: req.body.email})
                const isValidationPhone = await Users.findOne({ phone: req.body.phone_number })
                
                // if (isValidationEmail) throw new Error("Email already exists in the system")
                if (isValidationPhone) throw new Error("Phone already exists in the system")
                res.status(200).json()
                return 
                // return next()
        } catch (error) {
            return res.status(403).json(error.message)
            // throw new Error(error.message)
            // return res.status(403).json({
            //     error: error.message,
            //     success: false,
            //     data: null
            // })
        }

    },
    authTokenCreate : async (req, res,next ) => {
        try {
            // console.log(req.headers['Authorization']);
            
            // const token = jwt.verify(req.he)
            // if (!req.userId) throw new Error('Token Unothorized');       
            // const dataUser = await Users.findByOne({phone  : req.body.phone_number})
            // .select('name phone')
            // if (!dataUser) throw new Error('User not found');
            //  const session = await Sessions.findOne({user_id : dataUser._id})
            //  if (session) {
            //      throw new Error("Token is already in use for")
            //  }   
            //  req.data = req.body
             return next()
        } catch (error) {
            return res.status(403).json({error: error.message})
        }
    },
    loginUser : async (req,res,next) => {
        try {            
            const data = await Users.findOne({ phone: req.body.phone})
            if (data.phone !== req.body.phone) throw new Error("Phone not found in the system")
                
            const hashedPass = verifyPass(req.body.password,data.password)
            if (!hashedPass) {
                throw new Error("Passwords do not match !")  
            } else {
               const userData = {
                id: data._id,
                name: data.name,
                phone: data.phone,
                role: data.role,
                email: data.email
               }
                const token = jwt.sign(userData, process.env.SECRET_KEY, {expiresIn : 60});
                res.status(200).json({
                    token : token
                })
                return next();
            }
        
        } catch (error) {
            return res.status(403).json({error: error.message})
        
        }},
    checkEmpty : (key,value) => {
        if (!key) throw new Error(value)
    }
}
export default UserMiddleware