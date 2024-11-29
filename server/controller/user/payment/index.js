import { createMoMoPayment } from "../../../models/User/payment/index.js";

export const createPayment = async (req, res) => {
 
    try {
        const { title, price } = req.body
        // console.log(title);
        // console.log(req.body);   
        const order = `${title}  Order`
        const paymentDetails = {
            accessKey: 'F8BBA842ECF85',
            secretKey: 'K951B6PE1waDMi640xX08PD3vg6EkVlz',
            orderInfo:order ,
            partnerCode: 'MOMO',
            redirectUrl: 'http://192.168.1.224:3000/ticket',
            ipnUrl: 'http://192.168.1.224:3000/',
            requestType: 'payWithMethod',
            amount: price,
            lang: 'vi',
            extraData: '',
            // responseTime: 600
        }
        // console.log(paymentDetails );
        
        if (paymentDetails && order  ) {
            const paymentResponse = await createMoMoPayment(paymentDetails);
            // console.log(paymentResponse);
            
            res.json(paymentResponse);
        }
        // console.log(paymentResponse);
        

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}
