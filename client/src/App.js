import { useState } from "react";
import Login from "./components/Login";
import Mypage from "./components/Mypage";

function App() {
  const [isLogin, setIsLogin] = useState(false);
  return (
    <div className="App">
      {isLogin ? (
        <div>
          <Mypage />
        </div>
      ) : (
        <div>
          <Login />
        </div>
      )}
    </div>
  );
}

export default App;
