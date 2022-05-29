import { useEffect, useState } from "react";
import Login from "./components/Login";
import Mypage from "./components/Mypage";

function App() {
  const [isLogin, setIsLogin] = useState(false);
  const [accessToken, setAccessToken] = useState("");

  const getAccessToken = async (authorizationCode) => {
    let resp = await axios.post("http://localhost:4000/callback", {
      authorizationCode: authorizationCode,
    });
    setIsLogin(true);
    setAccessToken(resp.data.accessToken);
  };

  useEffect(() => {
    const url = new URL(window.location.href);
    const authorizationCode = url.searchParams.get("code");
    if (authorizationCode) {
      getAccessToken(authorizationCode);
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
