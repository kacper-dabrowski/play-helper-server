import jwt from 'jsonwebtoken';
import { User } from '../../models/User';
import Errors from '../../modules/errors';

const verifyToken = (token?: string): User => {
    try {
        if (!token || !process.env.JWT_KEY) {
            throw new Errors.BadRequestError('Authentication failed');
        }

        const decodedToken = jwt.verify(token, process.env.JWT_KEY) as User;

        if (!decodedToken) {
            throw new Errors.NoGrantsError();
        }

        return decodedToken;
    } catch (error) {
        throw new Errors.BadRequestError('Authentication failed');
    }
};

export default verifyToken;
