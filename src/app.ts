import bodyParser from "body-parser";
import express from "express";
import supportRequestRouter from "./routers/srq";

require("./db/mongoose");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

app.use(supportRequestRouter);

app.listen(PORT, () => {
  console.log("App is running on " + PORT);
});
