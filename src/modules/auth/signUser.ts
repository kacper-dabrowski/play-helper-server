import { User } from '../../models/User';
import config from '../../config';
import jwt from 'jsonwebtoken';

const signUser = (user: User): string => {
    if (!process.env.JWT_KEY) {
        throw new Error('There was some error with JWT');
    }

    const { _id, fullName } = user;

    const token = jwt.sign({ userId: _id, fullName, expiresIn: config.EXPIRES_IN }, process.env.JWT_KEY, {
        expiresIn: config.EXPIRES_IN,
    });

    return token;
};

export default signUser;
