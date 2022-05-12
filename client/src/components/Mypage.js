function Mypage({ userId, email, createdAt }) {
  return (
    <div className="mypageContainer">
      <div className="title">Mypage</div>
      <hr />
      <br />
      <br />
      <div>
        안녕하세요. <span className="name">{userId ? userId : "Guest"}</span>님!
        jwt 로그인이 완료되었습니다.
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
        <button className="tokenBtn red">access token request</button>
        <button className="tokenBtn navy">refresh token request</button>
      </div>
    </div>
  );
}

export default Mypage;
