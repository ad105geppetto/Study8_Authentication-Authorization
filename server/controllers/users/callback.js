require("dotenv").config();

const clientID = process.env.GITHUB_CLIENT_ID;
const clientSecret = process.env.GITHUB_CLIENT_SECRET;
const axios = require("axios");

module.exports = (req, res) => {
  axios({
    method: "post",
    url: `https://github.com/login/oauth/access_token`,
    headers: {
      accept: "application/json",
    },
    withCredentials: true,
    data: {
      client_id: clientID,
      client_secret: clientSecret,
      code: req.body.authorizationCode,
    },
  })
    .then((response) => {
      console.log(response.data);
      accessToken = response.data.access_token;
      res.status(200).json({ accessToken: accessToken, response: response.data, message: "ok" });
    })
    .catch((e) => {
      res.status(404);
    });
};
