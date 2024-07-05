import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import axios from "axios";

const Login = () => {
  const navigate = useNavigate();
  const [data, setData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [isLogin, setIsLogin] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isEmailExists, setIsEmailExists] = useState(false);
  const [isAccountFind, setIsAccountFind] = useState(false);

  const changeHandler = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };
  const handleLogin = (e) => {
    e.preventDefault();
    const { email, password } = data;
    axios
      .post("http://localhost:6969/users/login", { email, password })
      .then((result) => {
        if (result.data.status === 404) {
          setIsAccountFind(true);
        } else {
          setIsAuthenticated(true);
          localStorage.setItem("authenticated", true);
          localStorage.setItem("Email", email);
          localStorage.setItem("token", result.data.token);
          navigate("/dashboard");
        }
      })
      .catch((err) => {
        console.error("Error during login:", err);
      });
  };

  const handleRegister = (e) => {
    e.preventDefault();
    const { username, email, password } = data;
    const name = username;
    axios
      .post("http://localhost:6969/users/create", { name, email, password })
      .then((result) => {
        if (result.data.status === 400) {
          navigate("/");
        } else if (result.data.status === 409) {
          setIsEmailExists(true);
        } else if (result.data.status === 201){
          navigate("/dashboard");
        }
      })
      .catch((err) => {
        console.error("Error during registration:", err);
      });
  };

  const handleToggleForm = () => {
    setIsLogin(!isLogin);
    setIsEmailExists(false);
    setIsAccountFind(false);
  };

  const { username, email, password } = data;

  return (
    <div className="container">
      <div className="form">
        <h3>Your Path to Success Begins Here</h3>
        <form onSubmit={isLogin ? handleLogin : handleRegister}>
          {!isLogin && (
            <>
              <input
                type="text"
                name="username"
                value={username}
                onChange={changeHandler}
                placeholder="Username"
                required
              />
              <br />
            </>
          )}
          <input
            type="email"
            name="email"
            value={email}
            onChange={changeHandler}
            placeholder="Email"
            required
          />
          <br />
          {isLogin ? (
            <p style={{ color: "red", fontSize: "20px" }}>
              {isAccountFind ? "User Not Exist" : ""}
            </p>
          ) : (
            <p style={{ color: "red", fontSize: "20px" }}>
              {isEmailExists ? "Email Already Exists" : ""}
            </p>
          )}
          <input
            type="password"
            name="password"
            value={password}
            onChange={changeHandler}
            placeholder="Password"
            required
          />
          <br />
          <button type="submit">{isLogin ? "Login" : "Register"}</button>
          <br />
        </form>
        <h5>
          {isLogin
            ? "Don't have an account? Register here"
            : "Already have an account? Log in here"}
        </h5>
        <button onClick={handleToggleForm}>
          {isLogin ? "Register" : "Login"}
        </button>
      </div>
    </div>
  );
};

export default Login;
