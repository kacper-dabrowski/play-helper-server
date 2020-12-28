import bodyParser from "body-parser";
import express from "express";
import supportRequestRouter from "./routers/srq";
import authRouter from "./routers/auth";
import cors from "cors";
import errorHandler from "./controllers/errorController";
import { NotFoundController } from "./controllers/notFound";

require("./db/mongoose");

const app = express();
const corsWithOptions = cors({});

const PORT = process.env.PORT || 3000;

app.use(corsWithOptions);
app.use(bodyParser.json());
app.use(authRouter);
app.use(supportRequestRouter);
app.use(NotFoundController);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log("App is running on " + PORT);
});
