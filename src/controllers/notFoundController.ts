import { MiddlewareFn } from '../middleware/Middleware';

export const NotFoundController: MiddlewareFn = (req, res) => {
    res.status(404).send({ message: 'Ran out of middlewares!' });
};
