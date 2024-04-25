import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import Auth from "../AuthVerify";

function Header() {
  
  const name = Auth();


  return (
    <header>
      <div className="flex-ms">
        <Link to="/">
          <h2>
            <i className="fa-brands fa-laravel red"></i>{" "}
            <i className="sky fa-brands fa-react"></i> task App
          </h2>
        </Link>
        {name != "" ? (
          <>
            <h3 className="welcomeText">Welcome, {name}</h3>
          </>
        ) : (
          ""
        )}
      </div>
      <div className="flex-gap">
        <button
          className="btn"
          title="Sorry, You can't see any promotions"
          onClick={() => {
            toast.info("Thank you for your support ❤💝");
            window.open("https://webhimel.vercel.app", "_blank");
          }}
        >
          <i className="fa-solid fa-arrow-up-right-from-square"></i>sponsor 🎫
        </button>
        <button
          className="btn"
          onClick={() => {
            toast.info("Thank you for your support ❤💝");

            window.open("https://github.com/HIMELha/ReactCrud", "_blank");
          }}
        >
          <i className="fa-brands fa-github"></i>Give a star
        </button>

        {name == "" ? (
          <Link to="/login" className="btn">
            <i className="fa-solid fa-circle-arrow-up"></i>Login
          </Link>
        ) : (
          <Link to="/logout" className="btn">
            <i className="fa-solid fa-power-off"></i>Logout
          </Link>
        )}
      </div>
    </header>
  );
}

export default Header;
