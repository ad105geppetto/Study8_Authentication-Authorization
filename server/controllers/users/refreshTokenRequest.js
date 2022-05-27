const { Users } = require("../../models");
const jwt = require("jsonwebtoken");

module.exports = (req, res) => {
  const token = req.cookies.refreshToken;
  if (!token) {
    res.status(400).json({ data: null, message: "refresh token not provided" });
  } else {
    jwt.verify(token, process.env.REFRESH_SECRET, (err, data) => {
      if (err) {
        res.status(400).json({ data: null, message: "invalid refresh token, please log in again" });
      } else {
        const { userId } = data;
        Users.findOne({
          where: { userId: userId },
        })
          .then((data) => {
            if (!data) {
              res.json({
                data: null,
                message: "refresh token has been tempered",
              });
            } else {
              delete data.dataValues.password;

              console.log(data);
              const newAccessToken = jwt.sign(data.dataValues, process.env.ACCESS_SECRET, {
                expiresIn: "10s",
              });
              res.json({ data: { newAccessToken, userInfo: data.dataValues }, message: "ok" });
            }
          })
          .catch((err) => {
            console.log(err);
          });
      }
    });
  }
};
