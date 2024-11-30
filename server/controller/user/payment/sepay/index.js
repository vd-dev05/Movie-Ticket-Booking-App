import { Order, Transaction } from "../../../../models/movie";

export const SepayWeb = async (req, res) => {
    const data = req.body;
  
    if (!data || typeof data !== 'object') {
      return res.status(400).json({ success: false, message: 'No valid data received' });
    }
  
   
    const { 
      gateway, 
      transactionDate, 
      accountNumber, 
      subAccount, 
      transferType, 
      transferAmount, 
      accumulated, 
      code, 
      content, 
      referenceCode, 
      description 
    } = data;
  
 
    let amountIn = 0;
    let amountOut = 0;

    if (transferType === 'in') {
      amountIn = transferAmount;
    } else if (transferType === 'out') {
      amountOut = transferAmount;
    }
  
    try {
 
      const transaction = new Transaction({
        gateway,
        transaction_date: transactionDate,
        account_number: accountNumber,
        sub_account: subAccount,
        amount_in: amountIn,
        amount_out: amountOut,
        accumulated,
        code,
        transaction_content: content,
        reference_number: referenceCode,
        body: description
      });
  
      await transaction.save(); 
  
   
      const regex = /DH(\d+)/;
      const match = content.match(regex);
  
      if (!match || match.length < 2 || isNaN(match[1])) {
        return res.status(400).json({ success: false, message: 'Order ID not found in the transaction content' });
      }
  
      const orderId = match[1];
  
      const order = await Order.findOne({ id: orderId, total: amountIn, payment_status: 'Unpaid' });
  
      if (!order) {
        return res.status(404).json({ success: false, message: 'Order not found or mismatch in payment amount' });
      }
  
    
      order.payment_status = 'Paid';
      await order.save();
  
     
      res.json({ success: true, message: 'Order payment status updated successfully' });
  
    } catch (err) {
      console.error('Error processing webhook:', err);
      res.status(500).json({ success: false, message: 'Error processing webhook' });
    }
  }
