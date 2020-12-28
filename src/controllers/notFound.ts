import { MiddlewareFn } from "./Middleware";
import ControllerError from "../utils/ControllerError";
import createError from "../utils/createError";
export const NotFoundController: MiddlewareFn = (req, res, next) => {
  next(createError("Ran out of middlewares", 404));
};
