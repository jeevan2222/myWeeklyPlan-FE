import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import './Login.css';
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

  const changeHandler = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleLogin = (e) => {
    e.preventDefault();
    // Add actual authentication logic here
    // if (true) {
    //   setIsAuthenticated(true);
    //   localStorage.setItem("authenticated", true);
    //   navigate("/dashboard");
    // }
  };

  const handleRegister = (e) => {
    e.preventDefault();

    const { username, email, password } = data;
    const name = username;

    axios.post("http://localhost:6969/users/create", { name, email, password })
      .then(result => {
        console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>",result.data.status)
        result.data.status==400?navigate("/"):navigate("/dashboard")
      })
      .catch(err => {
        console.error("Error during registration:", err);
        if (err.response) {
          console.error("Server responded with a status:", err.response.status);
          console.error("Response data:", err.response.data);
        } else if (err.request) {
          console.error("Request was made but no response received:", err.request);
        } else {
          console.error("Something happened in setting up the request:", err.message);
        }
      });
  };

  const handleToggleForm = () => {
    setIsLogin(!isLogin);
  };

  const { username, email, password } = data;

  return isLogin ? (
    <div className="container">
      <div className="form">
        <h3>Your Path to Success Begins Here</h3>
        <form>
          <input
            type="text"
            name="username"
            value={username}
            onChange={changeHandler}
            placeholder="Username"
            required
          />
          <br />
          <input
            type="email"
            name="email"
            value={email}
            onChange={changeHandler}
            placeholder="Email"
            required
          />
          <br />
          <input
            type="password"
            name="password"
            value={password}
            onChange={changeHandler}
            placeholder="Password"
            required
          />
          <br />
          <button onClick={handleRegister}>Register</button>
          <br />
        </form>
        <h5>Already have an account? Log in here</h5>
        <button onClick={handleToggleForm}>Login</button>
      </div>
    </div>
  ) : (
    <div className="container">
      <div className="form">
        <h3>Your Path to Success Begins Here</h3>
        <form>
          <input
            type="email"
            name="email"
            value={email}
            onChange={changeHandler}
            placeholder="Email"
          />
          <br />
          <input
            type="password"
            name="password"
            value={password}
            onChange={changeHandler}
            placeholder="Password"
          />
          <br />
          <button onClick={handleLogin}>Login</button>
        </form>
        <h5>Don't have an account? Register here</h5>
        <button onClick={handleToggleForm}>Register</button>
      </div>
    </div>
  );
};

export default Login;
