import axios from "axios";
import { useState } from "react";

function Mypage({ accessToken, issueAccessToken }) {
  const [userId, setUserId] = useState("");
  const [email, setEmail] = useState("");
  const [createdAt, setCreatedAt] = useState("");

  const accessTokenRequest = () => {
    axios
      .get("https://localhost:4000/accesstokenrequest", {
        headers: { authorization: `Bearer ${accessToken}` },
        withCredentials: true,
      })
      .then((res) => {
        console.log(res);
        setEmail(res.data.data.email);
        setCreatedAt(res.data.data.createdAt);
      })
      .catch((err) => {
        alert(err.response.data.message);
      });
  };

  const refreshTokenRequest = () => {
    axios
      .get("https://localhost:4000/refreshtokenrequest", {
        headers: { authorization: `Bearer ${accessToken}` },
        withCredentials: true,
      })
      .then((res) => {
        console.log(res);
      });
  };
  return (
    <div className="mypageContainer">
      <div className="title">Mypage</div>
      <hr />
      <br />
      <br />
      <div>
        안녕하세요. <span className="name">{userId ? userId : "Guest"}</span>님! jwt 로그인이
        완료되었습니다.
      </div>
      <br />
      <br />
      <div className="item">
        <span className="item">나의 이메일: </span> {email}
      </div>
      <div className="item">
        <span className="item">나의 아이디 생성일: </span> {createdAt}
      </div>
      <br />
      <br />
      <div className="btnContainer">
        <button className="tokenBtn red" onClick={accessTokenRequest}>
          access token request
        </button>
        <button className="tokenBtn navy" onClick={refreshTokenRequest}>
          refresh token request
        </button>
      </div>
    </div>
  );
}

export default Mypage;
