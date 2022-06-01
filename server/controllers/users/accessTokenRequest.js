const { Users } = require("../../models");
const jwt = require("jsonwebtoken");
const { default: axios } = require("axios");

module.exports = (req, res) => {
  const { authorization } = req.headers;
  if (!authorization) {
    // 실제 서비스에서 로직상으로 로그인되지 않은 사람은 마이페이지에 들어오지 못하도록 되어있는데 이것을 넣을 이유가 있을까??
    res.status(400).json({ data: null, message: "invalid access token" });
  } else {
    const token = authorization.split(" ")[1];
    // Oauth로 access토큰을 생성하더라도 토큰을 확인하고자 한다면 아래와 같은 JWT 메서드를 거쳐야한다.
    // Oauth의 access 토큰은 JWT로 만든게 아니라서 데이터가 복호화 되지 않는다.
    if (token.slice(0, 3) === "gho") {
      return axios
        .get("https://api.github.com/user", { headers: { Authorization: `token ${token}` } })
        .then((data) => {
          const userInfo = {
            id: data.data.id,
            userId: data.data.login,
            email: data.data.email,
            createdAt: data.data.created_at,
            updatedAt: data.data.updated_at,
          };
          res.json({
            data: { userInfo: userInfo },
            message: "ok",
          });
        });
    }
    jwt.verify(token, process.env.ACCESS_SECRET, async (err, data) => {
      console.log(data);
      if (err) {
        res.status(403).json({ message: err.message }); // 토큰의 만료로 인한 에러
      } else {
        const userData = await Users.findOne({
          where: { userId: data.userId },
        });
        if (!userData) {
          res.status(400).send({ data: null, message: "access token has been tempered" }); //액세스토큰이 강화되었다??
        } else {
          const userInfo = {
            id: userData.id,
            userId: userData.userId,
            email: userData.email,
            createdAt: userData.createdAt,
            updatedAt: userData.updatedAt,
          };

          res.json({ data: { userInfo: userInfo }, message: "ok" });
        }
      }
    });
  }
};
