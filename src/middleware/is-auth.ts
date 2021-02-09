import jwt from 'jsonwebtoken';
import { User } from '../models/User';
import { MiddlewareFn } from './Middleware';

const isAuth: MiddlewareFn = (req, res, next) => {
    try {
        const token = req.get('Authorization')?.split(' ')[1];
        if (!token || !process.env.JWT_KEY) {
            throw new Error('Authentication credentials were not provided');
        }
        const decodedToken = jwt.verify(token, process.env.JWT_KEY) as User;
        if (!decodedToken) {
            throw new Error('');
        }
        req.userId = decodedToken.userId;
    } catch (error) {
        return res.status(401).send({ message: 'Could not authenticate', details: error.message });
    }
    next();
};

export default isAuth;
