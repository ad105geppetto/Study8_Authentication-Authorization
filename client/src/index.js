import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  // <React.StrictMode> <--개발단계에서 React가 제공하는 검사도구이다. 이거때문에 useEffect사용하면 콘솔 두번 찍힘
  <>
    <App />
  </>
  // </React.StrictMode>
);
