import { toast } from "react-toastify";

export default function Logout() {
    const token = localStorage.getItem('token');
    if (!token) {
        return window.location.href = "/login";
    }

    localStorage.removeItem('token');
    document.write("logging out...");
    toast.info("Logout successful");
    return window.location.href = "/";
}