import { NextFunction, Request, Response } from 'express';

interface AppRequest extends Request {
    userId?: string;
}

export type MiddlewareFn = (req: AppRequest, res: Response, next: NextFunction) => void;
