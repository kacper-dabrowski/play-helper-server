import { MiddlewareFn } from "../middleware/Middleware";
import createError from "../utils/createError";

export const NotFoundController: MiddlewareFn = (req, res, next) => {
  next(createError("Ran out of middlewares", 404));
};
