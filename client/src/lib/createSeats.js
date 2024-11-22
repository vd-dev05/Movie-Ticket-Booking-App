const obValues = ['A', 'B', 'C', 'D', 'E', 'F', 'G'];
const generateSeats = (count, startIndex) =>

    // console.log(count);

    Array.from({ length: count }, (_, i) => ({
        id: `${obValues[i]}${startIndex}`,
        booked: Math.random() < 0.5,
        selected: false,
        // ob:obValues[i],
        // price: 99
    }));

export {
    generateSeats
}