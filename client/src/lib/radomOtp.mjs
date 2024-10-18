'use strict';

export default function generateRandomNumberString(length = 30) {
    if (length <= 0 || isNaN(length)) {
        throw new Error('Length must be a positive integer.');
    }

    let rand = '';
    const nums = '0123456789';

    for (let i = 0; i < length; i++) {
        rand += nums.charAt(Math.floor(Math.random() * nums.length));
    }

    return rand;
}