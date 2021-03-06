const fs = require("fs");
const https = require("https");
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const app = express();
const HTTPS_PORT = 4000;

const controllers = require("./controllers");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(
  cors({
    origin: true,
    credentials: true,
    methods: ["GET", "POST", "OPTIONS"],
  })
);
app.use(cookieParser());

app.post("/login", controllers.login);
app.post("/callback", controllers.handleCallback);
app.get("/accesstokenrequest", controllers.accessTokenRequest);
app.get("/refreshtokenrequest", controllers.refreshTokenRequest);

let server;
if (fs.existsSync("./key.pem") && fs.existsSync("./cert.pem")) {
  const privateKey = fs.readFileSync(__dirname + "/key.pem", "utf8");
  const certificate = fs.readFileSync(__dirname + "/cert.pem", "utf8");
  const credentials = { key: privateKey, cert: certificate };

  server = https.createServer(credentials, app);
  server.listen(HTTPS_PORT, () => console.log("server runnning https://localhost:4000"));
} else {
  server = app.listen(HTTPS_PORT);
}
