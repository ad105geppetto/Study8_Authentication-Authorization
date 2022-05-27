const { Users } = require("../../models");
const jwt = require("jsonwebtoken");

module.exports = (req, res) => {
  const token = req.cookies.refreshToken;
  if (!token) {
    res.status(400).send({ data: null, message: "refresh token not provided" });
  } else {
    jwt.verify(token, process.env.ACCESS_SECRET, async (err, data) => {
      if (err) {
        res.status(400).send({ data: null, message: "invalid refresh token, please log in again" });
      } else {
        const userData = await Users.findOne({
          where: { userId: data.userId },
        });

        const payload = {
          id: userData.dataValues.id,
          userId: userData.dataValues.userId,
          email: userData.dataValues.email,
          createdAt: userData.dataValues.createdAt,
          updatedAt: userData.dataValues.updatedAt,
        };

        console.log(payload);
        res.send("ok");
      }
    });
  }
};
