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

  const socialLoginHandler = () => {
    window.location.assign(process.env.REACT_APP_GITHUB_LOGIN_URL);
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
        <br />
        <br />
        <button className="socialloginBtn" onClick={socialLoginHandler}>
          Github으로 로그인
        </button>
      </div>
    </div>
  );
}

export default Login;
