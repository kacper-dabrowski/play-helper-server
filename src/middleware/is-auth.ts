import { auth } from '../modules/auth/auth';
import Errors from '../modules/errors';
import { MiddlewareFn } from './Middleware';
import { routeWrapper } from './routeWrapper';

const isAuth: MiddlewareFn = routeWrapper((req, res, next) => {
    try {
        const token = req.get('Authorization')?.split(' ')[1];

        const userId = auth.getUserIdFromToken(token);

        if (!userId) {
            throw new Errors.NotAuthorizedError();
        }

        req.userId = userId;

        next();
    } catch (error) {
        next(error);
    }
});

export default isAuth;
