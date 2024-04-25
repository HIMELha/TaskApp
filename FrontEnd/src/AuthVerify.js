import { useEffect, useState } from "react";
import http from "./http";

export default function Auth() {
    const token = JSON.parse(localStorage.getItem('token'));

    const [name, setName] = useState("");
    const [emaile, setEmail] = useState("");

    useEffect(() => {
        try {
            if (token) {
                http.post("/verifyPersonalToken", { 'token': token }).then((res) => {
                    if (res.data.status == true) {
                        setName(res.data.user.name);
                        setEmail(res.data.user.email);
                    }else if (res.response.status == false) {
                        localStorage.removeItem('token');
                    }
                }).catch((err) => {
                    console.log(err);
                })
            }
        } catch (error) {
            console.log(error);
        }
    }, [token])


    return name, emaile;
 
}




