import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { accountService } from "../../utils/accountService";

import "./auth.css";

const Signup = () => {
  let navigate = useNavigate();

  // initialisation du state
  const [credentials, setCredentials] = useState({
    pseudo: "",
    email: "",
    password: "",
  });
  //passer par l'état précédent pour modifier les champs input
  const onChange = (e) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value,
    });
  };
  //déclenchement du formulaire
  const onSubmit = (e) => {
    e.preventDefault();
    accountService
      .signup(credentials)
      .then((res) => {
        accountService.saveToken(res.data.token);
        navigate("/auth/login");
      })
      .catch((error) => console.log(error));
  };

  return (
    <div className="sign">
      <h3 className="loginLogo">Groupomania</h3>
      <span className="loginDesc">
        Bienvenue
      </span>
      <form className="formauth" onSubmit={onSubmit}>

        
        <div className="group">
          
          <input
            type="text"
            name="pseudo"
            placeholder="Username"
            value={credentials.pseudo}
            onChange={onChange}
          />
        </div>
        <div className="group">
          
          <input
            type="text"
            name="email"
            placeholder="Email"
            value={credentials.email}
            onChange={onChange}
          />
        </div>
        <div className="group">
          
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={credentials.password}
            onChange={onChange}
          />
        </div>
        <div className="group">
          <button> Inscription </button>
        </div>
        <div className="suggestion">
          <Link to="/login" style={{ color: "blue" }}> Connexion </Link>
        </div>
      </form>
    </div>
  );
};

export default Signup;
