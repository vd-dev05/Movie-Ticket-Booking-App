const obValues = ['A', 'B', 'C', 'D', 'E', 'F', 'G'];
const generateSeats = (count, startIndex,response  ) =>

    Array.from({ length: count }, (_, i) =>  ({
        
        id: `${obValues[i]}${startIndex}`,
        booked: response.includes(`${obValues[i]}${startIndex}`) || false,
        selected: false,
        // ob:obValues[i],
        // price: 99
    }));

export {
    generateSeats
}