// models/paymentModel.js
import crypto from 'crypto';
import https from 'https';

export const createMoMoPayment = (paymentDetails) => {
  const {
    accessKey,
    secretKey,
    orderInfo,
    partnerCode,
    redirectUrl,
    ipnUrl,
    amount,
    lang,
    requestType,
    extraData,
  } = paymentDetails;
//   10 minutye
//     const expiresIn = 600; // 10 minutes
//     const currentTime = Math.floor(new Date().getTime() / 1000);
//     const expiredTime = currentTime + expiresIn;

//   //   15 seconds
//     const delay = 15; // 15 seconds
  const orderId = partnerCode + 'MOV' + new Date().getTime();
  const requestId = orderId;
  const rawSignature = `accessKey=${accessKey}&amount=${amount}&extraData=${extraData}&ipnUrl=${ipnUrl}&orderId=${orderId}&orderInfo=${orderInfo}&partnerCode=${partnerCode}&redirectUrl=${redirectUrl}&requestId=${requestId}&requestType=${requestType}`;

  console.log('--------------------RAW SIGNATURE----------------');
//   console.log(rawSignature);

  // Signature
  const signature = crypto.createHmac('sha256', secretKey)
    .update(rawSignature)
    .digest('hex');

  console.log('--------------------SIGNATURE----------------');
//   console.log(signature);

  // Request body
  const requestBody = JSON.stringify({
    partnerCode,
    partnerName: "Test",
    storeId: "MomoTestStore",
    requestId,
    amount,
    orderId,
    orderInfo,
    redirectUrl,
    ipnUrl,
    lang,
    requestType,
    extraData,
    signature,
  });

  // HTTPS options
  const options = {
    hostname: 'test-payment.momo.vn',
    port: 443,
    path: '/v2/gateway/api/create',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Content-Length': Buffer.byteLength(requestBody),
    },
  };

  return new Promise((resolve, reject) => {
    const req = https.request(options, (res) => {
      let body = '';
      res.on('data', (chunk) => {
        body += chunk;
      });
      res.on('end', () => {
        resolve(JSON.parse(body));
      });
    });

    req.on('error', (e) => {
      reject(`Problem with request: ${e.message}`);
    });

    console.log('Sending....');
    req.write(requestBody);
    req.end();
  });
};
