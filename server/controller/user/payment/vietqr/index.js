import jwt from 'jsonwebtoken'
export const Vietqr = async (req, res) => {
    const VALID_USERNAME = 'customer-vietqrtest-user2468';
    const VALID_PASSWORD = 'Y3VzdG9tZXItdmlldHFydGVzdC11c2VyMjQ2ODpZM1Z6ZEc5dFpYSXRkbWxsZEhGeWRHVnpkQzExYzJWeU1qUTJPQT09'; // Base64 của username:password
    const SECRET_KEY = 'your-256-bit-secret';
    
}