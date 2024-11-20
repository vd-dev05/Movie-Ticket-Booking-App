import { TypeAnimation } from 'react-type-animation';
const TypingEffect = ({nameUser}) =>  {
      
    const {name }= JSON.parse(localStorage.getItem('account-info'))
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
}
const TypingSearchEffect = ({text}) => {
    // console.log(text);
    
    // const arr = [text[0], 3500,text[1], 3500,text[2], 3500]
    // console.log(arr);
    const arr = []
    for(let i = 0; i < text.length; i++) {
        arr.push(text[i]);
        arr.push(3500);
    }    
    return (
            <TypeAnimation
                sequence={arr} 
                // speed={1}
                repeat={100} 
                cursor = {false}
            />
    );
} 
export {
    TypingSearchEffect,
    TypingEffect,
}