import bodyParser from "body-parser";
import express from "express";
import supportRequestRouter from "./routers/srq";
import authRouter from "./routers/auth";
import cors from "cors";
import errorHandler from "./utils/errors/errorHandler";
import notFoundRouter from "./routers/notFound";

require("./db/mongoose");

const app = express();
const corsWithOptions = cors({});

const PORT = process.env.PORT || 3000;

app.use(corsWithOptions);
app.use(bodyParser.json());
app.use(authRouter);
app.use(supportRequestRouter);
app.use(errorHandler);
app.use("*", notFoundRouter);

app.listen(PORT, () => {
  console.log("App is running on " + PORT);
});
