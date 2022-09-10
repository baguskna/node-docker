const express = require("express");
const mongoose = require("mongoose");
const postRouter = require("./routes/postRoutes");
const userRouter = require("./routes/userRoutes");

const app = express();

mongoose
  .connect(`mongodb://database-mongo:123456@mongo-db:27017/?authSource=admin`)
  .then(() => {
    console.log("Database connected!");
  })
  .catch((err) => {
    console.log(err);
  });

app.use(express.json());

app.get("/", (req, res) => {
  console.log("yuhu");
  res.send("<h1>hi from bagus prod</h1>");
});

app.get("/me", (req, res) => {
  console.log("hi from me");
  res.send("<h1>okayyyy</h1>");
});

app.use("/api/v1/post", postRouter);
app.use("/api/v1/users", userRouter);

const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`listening on port ${port}`));
