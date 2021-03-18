import { MiddlewareFn } from '../middleware/Middleware';

export const getHealthCheck: MiddlewareFn = (req, res) => {
    return res.status(200).send();
};
