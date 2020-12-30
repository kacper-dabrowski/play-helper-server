import { ErrorRequestHandler } from "express";
import { AppError, SERVER_ERROR } from "./errorTypes";

const errorHandler: ErrorRequestHandler = (error: AppError, req, res, next) => {
  switch (error) {
    case "USER_EXISTS":
      return res.status(400).send({
        message:
          "User with this login already exists. Try with different one or sign in",
      });
    case "CREDENTIALS_INVALID":
      return res.status(400).send({
        message: "Credentials were invalid. Try again",
      });
    default:
      return res
        .status(500)
        .send({ message: "Something went wrong on our side, try again later" });
  }
};

export default errorHandler;
