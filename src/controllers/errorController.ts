import { ErrorRequestHandler } from "express";
import ControllerError from "../utils/ControllerError";

const errorHandler: ErrorRequestHandler = (
  error: ControllerError,
  req,
  res,
  next
) => {
  return res
    .status(error.status)
    .send({ message: error.message, details: error.details });
};

export default errorHandler;
