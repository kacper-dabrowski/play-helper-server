import { NextFunction, Request, Response } from "express";

declare global {
  namespace Express {
    interface Request {
      [key: string]: any;
    }
  }
}
export type MiddlewareFn = (
  req: Request,
  res: Response,
  next: NextFunction
) => void;
