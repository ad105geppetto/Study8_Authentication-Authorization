const jwt = require("jsonwebtoken");
const { Users } = require("../../models");
const dotenv = require("dotenv");
const path = require("path");

module.exports = async (req, res) => {
  const userInfo = await Users.findOne({
    where: { userId: req.body.userId, password: req.body.password },
  });
  if (!userInfo) {
    res.status(400).send({ data: null, message: "not authorized" });
  } else {
    const Payload = {
      id: userInfo.dataValues.id,
      userId: userInfo.dataValues.userId,
      email: userInfo.dataValues.email,
      createdAt: userInfo.dataValues.createdAt,
      updatedAt: userInfo.dataValues.updatedAt,
    };
    const accessToken = jwt.sign(Payload, process.env.ACCESS_SECRET, { expiresIn: "10s" });
    const refreshToken = jwt.sign(Payload, process.env.REFRESH_SECRET, { expiresIn: "1d" });
    res
      .status(200)
      .cookie("refreshToken", refreshToken, {
        domain: "localhost",
        path: "/",
        sameSite: "none",
        httpOnly: true,
        secure: true,
      })
      .send({ data: { accessToken: accessToken }, message: "ok" });
  }
};
