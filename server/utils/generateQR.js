import QRCode from 'qrcode'
const generateQRCode = async (data) => {
    try {
        const qrCode = await QRCode.toDataURL(data) 
        // console.log(qrCode);
        
        return qrCode;
    } catch (err) {
        console.error(err);
        return null;
    }
};
export {
    generateQRCode
}
