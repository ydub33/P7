import React from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/groupomania.jpg";
import { accountService } from "../utils/accountService";

import "./header.css";
import deconnexion from "../assets/logout.svg"

const Header = () => {

  let navigate = useNavigate()

  const logout = () => {
    accountService.logout()
    navigate("/auth/login")
  }

  return (
    <>
      <header className="public-header">
        <Link to="/home">
          <img src={logo} alt="logo de Groupomania" width={130} height={130} />
        </Link>
        <nav>
          <ul>
            <img className="logout"
              src={deconnexion}
              alt="Se déconnecter"
              onClick={logout}>
            </img>
          </ul>
        </nav>

      </header>
    </>
  );
};

export default Header;
