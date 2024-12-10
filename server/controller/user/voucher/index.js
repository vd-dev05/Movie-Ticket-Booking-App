import mongoose from "mongoose"
import Voucher from "../../../models/User/voucher/index.js"
import {Users} from '../../../models/movie/index.js'
// create a new voucher instance
const VoucherUser = {
    newVoucherUser: async (req, res) => {
        try {
            const userId = req.userId
            const savedVoucher = await Users.findById(userId)
            .select('vouchers')
    
            
            if (!savedVoucher) {
                throw new Error("User already has a voucher")
            }
            
            
            const data = {
                userId: userId,
                title: "50% off first order",
                des: "Use this code to get 50% off your first order. Applies to all products.",
                discountType: "percentage",
                discountAmount: 50,
                expiryDate: "2024-12-31T23:59:59.000Z",
                isClaimed: false,
                _id : new mongoose.Types.ObjectId(),
                code :  "MOV50SALE"
            }
            const voucher = await Voucher.findOne({ userId: new mongoose.Types.ObjectId(userId), title: data.title })

            if (voucher) {
                throw new Error("Voucher already exists")
            } else {
                const newVoucher = await Voucher.create(data)   
                await savedVoucher.updateOne({ $push: { vouchers: newVoucher._id } })
                
                if (newVoucher) {       
                    res.status(201).json({
                        message: "Voucher created successfully",
                        // data: newVoucher
                    })
                }
            }
            
            // if ( voucher &&  data.title === voucher.title && data.userId === voucher.userId) {
            //     res.status(409).json({ message: "Voucher already exists" })
            //     // throw new Error ("Voucher already exists")
            // } else if (!voucher){
            // const newVoucher = await Voucher.create(data)
            //     res.status(201).json({
            //         message: "Voucher created successfully",
            //         // data: newVoucher
            //     })
            // }

            // if ()


            // console.log(newVoucher);

        } catch (error) {
            res.status(404).json({ error: error.message })
        }
    },
    getVoucherUser : async (req, res) => {
        try {
            const userId = req.userId         
            const savedVoucher = await Users.findById(userId)
            .select('vouchers')
            .populate('vouchers')
            if (!savedVoucher) {
                throw new Error("User does not have a voucher")
            }
            const voucher = savedVoucher.vouchers.filter((item) => {
                return item.isClaimed === false
            })
            // console.log(voucher);
            
            res.status(200).json({
                message: "Voucher fetched successfully",
                data: voucher
            })
        } catch (error) {
            res.status(404).json({ error: error.message })
        }
    }
}
export default VoucherUser