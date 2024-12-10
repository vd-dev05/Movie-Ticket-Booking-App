import mongoose from 'mongoose';
const voucherSchema = new mongoose.Schema({
    title: { type: String, required: true },
    des: { type: String, required: true },
    expiryDate: { type: Date, required: true },
    discountType: { 
      type: String, 
      enum: ['percentage', 'fixed'], 
      required: true 
    },
    discountAmount: { type: Number, required: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'users', required: true },
    isClaimed: { type: Boolean, default: false },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
    code : { type : String, unique : true, required : true }
}) 
const Voucher = mongoose.model('vouchers', voucherSchema)
export default Voucher