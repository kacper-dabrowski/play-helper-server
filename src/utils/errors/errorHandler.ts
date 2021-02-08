import { ErrorRequestHandler } from "express";
import errorTypes from "./errorTypes";

const errorHandler: ErrorRequestHandler = (error: string, req, res, next) => {
  console.log(error);

  switch (error) {
    case errorTypes.UNAUTHORIZED:
      return res.status(403).send({
        message: "You don't have permissions to perform this operation",
      });
    case errorTypes.BAD_REQUEST:
      return res.status(400).send({
        message: "Could not create an entity, invalid data was passed",
      });
    case errorTypes.USER_EXISTS:
      return res.status(400).send({
        message:
          "User with this login already exists. Try with different one or sign in",
      });
    case errorTypes.CREDENTIALS_INVALID:
      return res.status(400).send({
        message: "Credentials were invalid. Try again",
      });
    case errorTypes.RESOURCE_NOT_FOUND:
      return res
        .status(404)
        .send({ message: "Requested resource could not be found" });
    default:
      return res
        .status(500)
        .send({ message: "Something went wrong on our side, try again later" });
  }
};

export default errorHandler;
