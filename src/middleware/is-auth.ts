import verifyToken from '../modules/auth/verifyToken';
import { MiddlewareFn } from './Middleware';
import { routeWrapper } from './routeWrapper';

const isAuth: MiddlewareFn = routeWrapper((req, res, next) => {
    try {
        const token = req.get('Authorization')?.split(' ')[1];

        const decodedToken = verifyToken(token);
        req.userId = decodedToken.userId;

        next();
    } catch (error) {
        next(error);
    }
});

export default isAuth;
