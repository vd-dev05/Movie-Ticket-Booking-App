import React from 'react';
import QRCode from 'react-qr-code';

async function TestOtp() {
   
    console.log(dataURL);
    
    await  fetch('http://localhost:8080/api/v1/users/send-code' , {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            phone_number: '+84559699620',password : 'admin@123'
        }),
    }).then((r) =>{
        console.log(r);
        if(r.ok === true) {
            alert("true")
        } else alert("false")
        
    })
    return (
        <div>
            <div id='recaptcha-container'></div>
            <div id='capcha'></div>
            <div>test</div>
      
        </div>
    );
}

export default TestOtp;