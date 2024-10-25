// import React, { useEffect, useState } from 'react';

// const TypingEffect = (nameUser) => {
//     const [displayText, setDisplayText] = useState('');
//     const fullText = `Welcome ${nameUser ? nameUser : 'user'} 👋`;

//     useEffect(() => {
//         let index = 0;
//         const intervalId = setInterval(() => {
//             setDisplayText((prev) => prev + fullText[index]);
//             index++;

//             if (index >= fullText.length) {
//                 clearInterval(intervalId);
//             }
//         }, 100); // Thay đổi giá trị này để điều chỉnh tốc độ gõ

//         return () => clearInterval(intervalId);
//     }, [fullText]);

//     return <h1 className="font-logo">{displayText}</h1>;
// };

// export default TypingEffect;
import React from 'react';
import { TypeAnimation } from 'react-type-animation';

const TypingEffect = (nameUser) => {
    
    const name = localStorage.getItem('name')
    const arr = [`Welcome ${name ? name : nameUser } 👋`,3500,"Book Ticket My App",3500,"Add Voucher Movie to List "]
    return (
        <h1 className="font-logo">
            <TypeAnimation
                sequence={arr} // Thay đổi thời gian hiển thị
                // speed={1}
                repeat={100} 
                cursor = {false}
            />
        </h1>
    );
};


export default TypingEffect;

