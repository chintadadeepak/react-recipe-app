import React, { useState } from "react";
import Form from "../auth/Form";
import axios from "axios";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import "../styles/project.css";
function Auth() {
  const [cookies, _] = useCookies(["access_token"]);
  return (
    <div className="auth-container">
      <Register /> <Login />
    </div>
  );
}

export default Auth;

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [_, setCookies] = useCookies(["access_token"]);
  const navigate = useNavigate();
  const onSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post("http://localhost:3001/auth/login", {
        username: username,
        password: password,
      });
      setCookies("access_token", response.data.token);
      window.localStorage.setItem("userId", response.data.userId);
      alert("Logged In..");
      navigate("/");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="login-container">
      <Form
        username={username}
        setUsername={setUsername}
        password={password}
        setPassword={setPassword}
        label="Login"
        onSubmit={onSubmit}
      />
    </div>
  );
};

const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const onSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios.post("http://localhost:3001/auth/register", {
        username: username,
        password: password,
      });
      alert("Registration successfull, you can login now!!");
    } catch (error) {
      console.error(error);
    }
    setUsername("");
    setPassword("");
  };
  return (
    <div className="register-container">
      <Form
        username={username}
        setUsername={setUsername}
        password={password}
        setPassword={setPassword}
        label="Register"
        onSubmit={onSubmit}
      />
    </div>
  );
};
