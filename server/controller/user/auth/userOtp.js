import randomString from 'randomstring';
import { GolbalData } from '../../../cache/data.js';
import { Users } from '../../../models/movie/index.js';
import { Sessions } from '../../../models/auth/sessions.js';
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config()
export const TokenSend = (req,res) => {
    try {
        const {phone_number} = req.body
        if (!phone_number) throw new Error('Invalid phone_number')         
        res.status(200).json({ token : jwt.sign({ phone : phone_number }, process.env.SECRET_KEY, { expiresIn: '4m' })})
    } catch (error) {
        return res.status(403).json({error: error.message})
    }
}
export const ResetCodeOtp = (req,res) =>{
    try {
        // put otp 
       
        
        const {phone_number } = req.body
        if (!phone_number) throw new Error('Invalid phone_number')
        if (GolbalData.otp[phone_number]) {
            GolbalData.otp[phone_number] = ''
        }
    } catch (error) {
        return res.status(403).json({error: error.message})
    }
}
export const SendOtp = (req,res) => {
    try {
        const {phone_number}  = req.body
        if (!phone_number) throw new Error('Invalid phone_number')
        // console.log(req.body);
        
        if (GolbalData.otp[phone_number]) { 
            return res.json("OTP already sent to this number")
        }
        let otp = randomString.generate({
            length :4,
            charset : 'numeric'
        })
        // push the phone number golbal data
        GolbalData.otp[phone_number] = otp
        
        // console.log(GolbalData);
        console.log(`----------------------------------------------------`);
        console.log(`Your otp authentication code is ${otp} valid for 3 minutes. Please do not share with others`);
        console.log(`----------------------------------------------------`);

        if (GolbalData.otp[phone_number]) {
            return res.status(200).json({
                message : "OTP already sent to this number",
                token : jwt.sign({ phone : phone_number }, process.env.SECRET_KEY, { expiresIn: '4m' })
            })
        }
       
        
    } catch (error) {
        // console.log(error.message);
        
        return res.status(403).json({ error: error.message})
    }
   
}  
export const verifyOtp = (req, res) => {
    // console.log(req.body);
    
    const {phone_number, otp} = req.body;
    const r = GolbalData.otp[phone_number]  

    if(r === otp){
        delete GolbalData.otp[phone_number];
        // console.log(GolbalData);
        
        res.status(200).json({message : 'OTP verified successfully'})
    }else{
        // console.log("fasl failed");  
        
        res.status(400).json({error: 'Invalid OTP'})
    }
 
}
export const createAsscessTokenGlobal = (req, res,next) => {
    try {
        const dataUser = req.body
        if (!dataUser) throw new Error('Invalid user')
        //  console.log(dataUser);
        
    //     const token = jwt.sign({ userId : req.userId }, process.env.SECRET_KEY)
    //   const r =   await Sessions.create({
    //         user_id : req.userId,
    //         jwt : token
    //     })

    //    console.log(GolbalData);
       
    //    if (r) {
    //     return next();
    //    } 
    return next();
    

    } catch (error) {
         res.status(400).json({message : error.message})
    }
}