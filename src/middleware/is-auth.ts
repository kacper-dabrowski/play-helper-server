import jwt from 'jsonwebtoken';
import { User } from '../models/User';
import { MiddlewareFn } from './Middleware';
import { routeWrapper } from './routeWrapper';
import Errors from '../utils/errors';

const isAuth: MiddlewareFn = routeWrapper((req, res, next) => {
    const token = req.get('Authorization')?.split(' ')[1];
    if (!token || !process.env.JWT_KEY) {
        throw new Errors.BadRequestError();
    }
    const decodedToken = jwt.verify(token, process.env.JWT_KEY) as User;
    if (!decodedToken) {
        Errors.NoGrantsError();
    }
    req.userId = decodedToken.userId;

    next();
});

export default isAuth;
