import React from "react";
import axios from "axios";
import { useState, useEffect, useContext } from "react";
import AuthContext from "../store/authContext";

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
  const authCtx = useContext(AuthContext)
  
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
        authCtx.login(res.data.userId)
      })
      .catch((err) => console.log(err));
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <>
      {register ? (
        <form onSubmit={(e) => handleSubmit(e)}>
          <input
            type="email"
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
          />
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
          <input
            placeholder="First Name"
            onChange={(e) => setFirstName(e.target.value)}
          />
          <input
            placeholder="Last Name"
            onChange={(e) => setLastName(e.target.value)}
          />
          <input
            placeholder="Address"
            onChange={(e) => setAddress(e.target.value)}
          />
          <input
            type="tel"
            placeholder="Phone Number"
            onChange={(e) => setNumber(e.target.value)}
          />
          <label>
            Tradesman?
          <input
            type="checkbox"
            onChange={(e) => setUserType(e.target.checked ? "tradesman" : "customer")}
          />
          </label>
          <button>Register</button>
        </form>
      ) : (
        <form onSubmit={(e) => handleSubmit(e)}>
          <input
            type="email"
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
          />
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
          <button>Login</button>
        </form>
      )}

      <button onClick={() => setRegister(!register)}>
        {register ? "Log in" : "Register"}
      </button>
    </>
  );
};

export default Auth;
