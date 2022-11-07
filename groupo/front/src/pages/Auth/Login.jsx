import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { accountService } from "../../utils/accountService";


import "./auth.css";

const Login = () => {
  let navigate = useNavigate();


  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });
  //input change
  const onChange = (e) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value,
    });
  };
  
  const onSubmit = (e) => {
    e.preventDefault();
    accountService
      .login(credentials)
      .then((res) => {
        accountService.saveToken(res.data.token);
        navigate("/home");
      })
      .catch((error) => console.log(error));
  };

  return (
    <div className="sign">
      <h3 className="loginLogo">Groupomania</h3>
          <span className="loginDesc">
          Bienvenue
          </span>
          
      <form onSubmit={onSubmit}>
        
        
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
          <button>Connexion</button>
        </div>
        <div className="suggestion">
          <Link to="/auth/signup"  style={{ color: "blue" }}>
            Inscription</Link>
        </div>
      </form>
    </div>
  );
};

export default Login;
