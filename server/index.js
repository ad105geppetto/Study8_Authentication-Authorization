const express = require("express");
const server = express();
const PORT = 4000;

server.use("/", (req, res) => {
  res.send("hello");
});

server.listen(PORT, () => {
  console.log(`Example server listening on port http://localhost:${PORT}`);
});
