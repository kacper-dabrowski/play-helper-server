import jwt from 'jsonwebtoken';
import { User } from '../models/User';
import { MiddlewareFn } from './Middleware';
import { routeWrapper } from './routeWrapper';
import Errors from '../modules/errors';

const isAuth: MiddlewareFn = routeWrapper((req, res, next) => {
    try {
        const token = req.get('Authorization')?.split(' ')[1];
        if (!token || !process.env.JWT_KEY) {
            throw new Errors.BadRequestError('Authentication failed');
        }
        const decodedToken = jwt.verify(token, process.env.JWT_KEY) as User;
        if (!decodedToken) {
            Errors.NoGrantsError();
        }
        req.userId = decodedToken.userId;
        next();
    } catch (error) {
        next(error);
    }
});

export default isAuth;
