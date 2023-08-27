import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/navbar.css";
import { useCookies } from "react-cookie";

function Navbar() {
  const [cookies, setCookies] = useCookies(["access_token"]);
  const navigate = useNavigate();
  const logOut = () => {
    setCookies("access_token", "");
    window.localStorage.removeItem("userId");
    navigate("/auth");
  };
  return (
    <div className="navbar">
      <div className="nav-links">
        <Link className="nav-link" to="/">
          Home
        </Link>
        <Link className="nav-link" to="/create-recipe">
          Create Recipe
        </Link>
        {!cookies.access_token ? (
          <>
            <Link className="nav-link" to="/auth">
              Register/Login
            </Link>
            <Link className="nav-link" to="/save-recipe">
              Saved Recipes
            </Link>
          </>
        ) : (
          <button className="logoutButton" onClick={logOut}>
            Logout
          </button>
        )}
      </div>
    </div>
  );
}

export default Navbar;
