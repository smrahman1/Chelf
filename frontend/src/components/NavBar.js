import "./NavBar.css";
import { CameraIcon, GenerateIcon, Home } from "./Icons";
import { useState } from "react";
import { Link } from "react-router-dom";

function NavBar() {
  const [active, setActive] = useState(1);
  return (
    <>
      <div className="navContainer">
        <Link
          to="/camera"
          style={{
            textDecoration: "none",
            color: active === 0 ? "white" : "black",
          }}
          onClick={() => setActive(0)}
        >
          <CameraIcon />
        </Link>
        <Link
          to="/"
          style={{
            textDecoration: "none",
            color: active === 1 ? "white" : "black",
          }}
          onClick={() => setActive(1)}
        >
          <Home />
        </Link>
        <Link
          to="/generate"
          style={{
            textDecoration: "none",
            color: active === 2 ? "white" : "black",
          }}
          onClick={() => setActive(2)}
        >
          <GenerateIcon />
        </Link>
      </div>
    </>
  );
}

export default NavBar;
