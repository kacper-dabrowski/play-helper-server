import { MiddlewareFn } from "../middleware/Middleware";

export const NotFoundController: MiddlewareFn = (req, res, next) => {
  res.status(404).send({ message: "Ran out of middlewares!" });
};
