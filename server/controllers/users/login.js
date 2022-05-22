const jwt = require("jsonwebtoken");
const { Users } = require("../../models");

module.exports = async (req, res) => {
  const userInfo = await Users.findOne({
    where: { userId: req.body.userId, password: req.body.password },
  });

  console.log(userInfo);
  res.send("ok");
};
