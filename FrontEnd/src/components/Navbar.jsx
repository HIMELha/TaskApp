import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { Link } from "react-router-dom";
function Navbar() {
  const SearchBtn = {
    padding: "10px 12px 9px 12px",
    fontSize: "13px",
  };

  const navigator = useNavigate();
  const current = useLocation();

  const NavigateTos = () => {
    if (current.pathname != "/") {
      navigator("/");
    } else {
      navigator("/create");
    }
  };

  const [key, setKey] = useState();

  return (
    <nav>
      <form className="search">
        <input
          type="text"
          name="search"
          onChange={(e) => setKey(e.target.value)}
          placeholder="Search a task"
        />
        <Link to={"search/" + key}>
          <button className="btn" type="submit" style={SearchBtn}>
            <i className="fa-solid fa-magnifying-glass"></i>
          </button>
        </Link>
      </form>
      <button onClick={NavigateTos} className="btn">
        {current.pathname != "/" ? (
          <>
            <i className="fa-regular fa-hand-point-left"></i>
          </>
        ) : (
          <>
            <i className="fa-regular fa-file"></i>
          </>
        )}
        <span>
          {current.pathname != "/" ? <>Back to home</> : <>Create new task</>}
        </span>
      </button>
    </nav>
  );
}

export default Navbar;
