import { MiddlewareFn } from '../middleware/Middleware';

export const getHealthCheck: MiddlewareFn = (req, res) => res.status(200).send();
