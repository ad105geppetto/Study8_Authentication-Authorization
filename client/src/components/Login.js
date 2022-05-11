function Login() {
  return (
    <div className="Login">
      <div className="inputField">
        <div>Username</div>
        <input name="userId" />
      </div>
      <div className="inputField">
        <div>Password</div>
        <input name="password" />
      </div>
      <div className="loginBtnContainer">
        <button className="loginBtn">JWT Login</button>
      </div>
    </div>
  );
}

export default Login;
