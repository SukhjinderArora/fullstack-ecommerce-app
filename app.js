const app = require("express")();

app.get("/", (req, res) => {
  return res.send("Hello world");
});

module.exports = app;
