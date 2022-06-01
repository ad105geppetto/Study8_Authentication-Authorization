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
        console.log(res.data);
        if (res.data.message !== "ok") {
          const message =
            "access token이 만료되어 불러올 수 없습니다. refresh token을 사용해주시기 바랍니다.";
          setEmail(res.data.data.userInfo.email);
          setCreatedAt(res.data.data.userInfo.createdAt);
          console.log(message);
        } else {
          const { createdAt, userId, email } = res.data.data.userInfo;
          setUserId(userId);
          setEmail(email);
          setCreatedAt(createdAt);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const refreshTokenRequest = () => {
    axios
      .get("https://localhost:4000/refreshtokenrequest", {
        withCredentials: true,
      })
      .then((res) => {
        const { createdAt, userId, email } = res.data.data.userInfo;
        setUserId(userId);
        setEmail(email);
        setCreatedAt(createdAt);
        issueAccessToken(res.data.data.newAccessToken);
      })
      .catch((err) => {
        setTimeout(() => {
          window.location.replace("/");
        }, 2000);
        console.log(err.response.data.message);
        const message = err.response.data.message;
        setEmail(message);
        setCreatedAt(message);
        return;
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
