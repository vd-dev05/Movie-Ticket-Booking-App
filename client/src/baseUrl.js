import { jwtDecode } from "jwt-decode";
const token = localStorage.getItem("access_token")

const decoded = jwtDecode(token);
export {
    decoded
}