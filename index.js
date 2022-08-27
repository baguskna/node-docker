const express = require("express");

const app = express();

app.get("/", (req, res) => {
  console.log("yuhu");
  res.send("<h1>hi from root</h1>");
});

app.get("/me", (req, res) => {
  console.log("hi from me");
  res.send("<h1>okayyyy</h1>");
});

const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`listening on port ${port}`));
