import express from "express";

require("./db/mongoose");

const app = express();
const PORT = process.env.PORT || 3000;
app.use("/", (req, res, next) => {
  res.status(200).send({ message: "Connected!" });
});

app.listen(PORT, () => {
  console.log("App is running on " + PORT);
});
