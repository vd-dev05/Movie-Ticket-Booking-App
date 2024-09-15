export const formatCardNumber = (number) => {
    return number
        .replace(/\s/g, '') 
        .replace(/(.{4})/g, '$1 ') 
        .trim(); 
};