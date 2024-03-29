import { MiddlewareFn } from './Middleware';

export const routeWrapper =
    (fn: MiddlewareFn): MiddlewareFn =>
    async (req, res, next) => {
        Promise.resolve(fn(req, res, next)).catch(next);
    };
