import { useEffect, useState } from "react";
import Login from "./components/Login";
import Mypage from "./components/Mypage";
const axios = require("axios");

function App() {
  const [isLogin, setIsLogin] = useState(false);
  const [accessToken, setAccessToken] = useState("");

  const getAccessToken = (authorizationCode) => {
    console.log("getAccess");
    axios
      .post(
        "https://localhost:4000/callback",
        {
          authorizationCode: authorizationCode,
        },
        { headers: { "Content-Type": "application/json" }, withCredentials: true }
      )
      .then((resp) => {
        console.log(resp);
        setIsLogin(true);
        setAccessToken(resp.data.accessToken);
      });
  };

  useEffect(() => {
    const url = new URL(window.location.href);
    console.log(url);
    const authorizationCode = url.searchParams.get("code");
    if (authorizationCode) {
      console.log("인증됨@@@@@");
      getAccessToken(authorizationCode);
    } else {
      console.log("인증 안됨");
    }
  }, []);

  const loginHandler = (data) => {
    console.log(data);
    if (!data) {
      setIsLogin(false);
    } else {
      setIsLogin(true);
      issueAccessToken(data.data.accessToken);
    }
  };

  const issueAccessToken = (token) => {
    setAccessToken(token);
  };
  return (
    <div className="App">
      {isLogin ? (
        <div>
          <Mypage accessToken={accessToken} issueAccessToken={issueAccessToken} />
        </div>
      ) : (
        <div>
          <Login loginHandler={loginHandler} accessToken={accessToken} />
        </div>
      )}
    </div>
  );
}

export default App;
