const jwt = require("jsonwebtoken");

module.exports = (req, res) => {
  console.log(req);
  const { authorization } = req.headers;
  if (!authorization) {
    // 실제 서비스에서 로직상으로 로그인되지 않은 사람은 마이페이지에 들어오지 못하도록 되어있는데 이것을 넣을 이유가 있을까??
    res.status(400).json({ data: null, message: "invalid access token" });
  } else {
    const token = authorization.split(" ")[1];
    jwt.verify(token, process.env.ACCESS_SECRET, (err, data) => {
      if (err) {
        res.status(403).json({ message: err.message }); // 토큰의 만료로 인한 에러
      } else {
        res.json({ data: data, message: "ok" });
      }
    });
  }
};
