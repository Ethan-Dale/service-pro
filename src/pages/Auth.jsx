import React from "react";
import axios from "axios";
import { useState, useEffect, useContext } from "react";
import AuthContext from "../store/authContext";
import "../styles/AuthStyles.css";
import { useNavigate } from "react-router-dom";

const Auth = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [address, setAddress] = useState("");
  const [number, setNumber] = useState("");
  const [userType, setUserType] = useState("customer");
  const [register, setRegister] = useState("");
  const authCtx = useContext(AuthContext);

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post(
        register ? "/api/register" : "/api/login",
        register
          ? { email, password, firstName, lastName, address, number, userType }
          : { email, password }
      )
      .then((res) => {
        console.log(res.data.userId)
        authCtx.login(res.data.userId);
        navigate('/dashboard');
      })
      .catch((err) => console.log(err));
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div id="wholePage">
      <section id="formSide">
        <header id="header">
          <img
            id="proLogo"
            src="https://avatars.githubusercontent.com/u/1610283?s=280&v=4"
          />
          <h1 id="title1">
            SERVICE<b>PRO</b>
          </h1>
          <div id="spacer"></div>
        </header>
        <main id="authFormContainer">
          {register ? (
            <form className="Form" onSubmit={(e) => handleSubmit(e)}>
              <input
                className="inputDec"
                type="email"
                placeholder="Email"
                onChange={(e) => setEmail(e.target.value)}
              />
              <div id="passwordInput" className="inputDec">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  onChange={(e) => setPassword(e.target.value)}
                />
                <i
                  onClick={toggleShowPassword}
                  className={`fa ${showPassword ? "fa-eye-slash" : "fa-eye"}`}
                  style={{ cursor: "pointer" }}
                ></i>
              </div>
              <input
                className="inputDec"
                placeholder="First Name"
                onChange={(e) => setFirstName(e.target.value)}
              />
              <input
                className="inputDec"
                placeholder="Last Name"
                onChange={(e) => setLastName(e.target.value)}
              />
              <input
                className="inputDec"
                placeholder="Address"
                onChange={(e) => setAddress(e.target.value)}
              />
              <input
                className="inputDec"
                type="tel"
                placeholder="Phone Number"
                onChange={(e) => setNumber(e.target.value)}
              />
              <label className="container">
                Are you a Tradesman?
                <input
                  type="checkbox"
                  onChange={(e) =>
                    setUserType(e.target.checked ? "tradesman" : "customer")
                  }
                />
                <span className="checkmark"></span>
                
              </label>
              <button><span>Register</span></button>
            </form>
          ) : (
            <form className="Form" onSubmit={(e) => handleSubmit(e)}>
              <input
                className="inputDec"
                type="email"
                placeholder="Email"
                onChange={(e) => setEmail(e.target.value)}
              />
              <div id="passwordInput" className="inputDec">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  onChange={(e) => setPassword(e.target.value)}
                />
                <i
                  onClick={toggleShowPassword}
                  className={`fa ${showPassword ? "fa-eye-slash" : "fa-eye"}`}
                  style={{ cursor: "pointer" }}
                ></i>
              </div>
              <button><span>Login</span></button>
            </form>
          )}

          <button id="swapper" onClick={() => setRegister(!register)}>
            {register ? "Back To Log In" : "Need To Register?"}
          </button>
        </main>
      </section>
      <div id="imageHalf"></div>
    </div>
  );
};

export default Auth;
