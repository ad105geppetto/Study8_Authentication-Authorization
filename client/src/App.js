import { useState } from "react";
import Login from "./components/Login";
import Mypage from "./components/Mypage";

function App() {
  const [isLogin, setIsLogin] = useState(false);
  const [accessToken, setAccessToken] = useState("");

  const loginHandler = (data) => {
    if (!data) {
      setIsLogin(false);
    } else {
      setIsLogin(true);
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
          <Login
            loginHandler={loginHandler}
            accessToken={accessToken}
            issueAccessToken={issueAccessToken}
          />
        </div>
      )}
    </div>
  );
}

export default App;
