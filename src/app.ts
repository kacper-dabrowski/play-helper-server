import bodyParser from "body-parser";
import express from "express";
import supportRequestRouter from "./routers/srq";
import authRouter from "./routers/auth";

require("./db/mongoose");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(authRouter);
app.use(supportRequestRouter);

app.listen(PORT, () => {
  console.log("App is running on " + PORT);
});
