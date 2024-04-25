import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import http from "../http";
import axios from "axios";
import Auth from "../AuthVerify";
function Login() {
  const Navigator = useNavigate();
  const name = Auth();

  if (name != '') {
    Navigator("/");
  }

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  


  const handleLogin = (e) => {
    e.preventDefault();

    if (email.length == 0) {
      toast.error("Please enter your email");
    }
    if (password.length == 0) {
      toast.error("Please enter your password");
    }

    http
      .post("login", { email: email, password: password })
      .then((res) => {
        localStorage.setItem("token", JSON.stringify(res.data.token.email));
        axios.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${res.data.token}`;
        toast.success("Login successful");
        window.location.href = "/";
      })
      .catch((err) => {
        if (err.response.status == 422) {
          toast.error("Invalid login info");
          setPassword("");
        }
        console.log(err);
      });
  };
  return (
    <div className="table">
      <form action="" className="TaskForm">
        <h3>Login</h3>
        <div className="form">
          <label htmlFor="email">Enter email</label>
          <input
            type="text"
            name="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            autoComplete="username"
          />
        </div>
        <div className="form">
          <label htmlFor="password">Enter password</label>
          <input
            type="password"
            name="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            autoComplete="current-password"
          />
        </div>
        <br />
        <button className="btn" type="submit" onClick={handleLogin}>
          Submit
        </button>
      </form>
    </div>
  );
}

export default Login;
