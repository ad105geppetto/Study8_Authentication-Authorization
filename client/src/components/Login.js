import { useState } from "react";

const axios = require("axios");

function Login(props) {
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");

  const inputUserIdHandler = (e) => {
    setUserId(e.target.value);
  };
  const inputPasswordHandler = (e) => {
    setPassword(e.target.value);
  };

  const loginRequestHandler = () => {
    axios
      .post(
        "https://localhost:4000/login",
        {
          userId: userId,
          password: password,
        },
        { headers: { "Content-Type": "application/json" }, withCredentials: true }
      )
      .then((res) => {
        props.loginHandler(res.data);
      });
  };

  return (
    <div className="Login">
      <div className="inputField">
        <div>Username</div>
        <input name="userId" value={userId} onChange={inputUserIdHandler} type="text" />
      </div>
      <div className="inputField">
        <div>Password</div>
        <input name="password" value={password} onChange={inputPasswordHandler} type="password" />
      </div>
      <div className="loginBtnContainer">
        <button className="loginBtn" onClick={loginRequestHandler}>
          JWT Login
        </button>
      </div>
    </div>
  );
}

export default Login;
