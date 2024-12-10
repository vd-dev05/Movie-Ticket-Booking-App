
function encodeString(string, secretKey) { const encodedString = btoa(string.split('').map(char => String.fromCharCode(char.charCodeAt(0) ^ secretKey.charCodeAt(0))).join(''));  return encodedString; }


function decodeString(encodedString, secretKey) { const decodedString = atob(encodedString).split('').map(char => String.fromCharCode(char.charCodeAt(0) ^ secretKey.charCodeAt(0)) ).join(''); return decodedString; }

function parseQueryString(queryString) { return queryString.split('&').reduce((acc, pair) => { const [key, value] = pair.split('='); acc[key] = value; return acc; }, {}); }


export { encodeString,decodeString ,parseQueryString};