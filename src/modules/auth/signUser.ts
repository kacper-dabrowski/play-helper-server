import jwt from 'jsonwebtoken';
import config from '../../config';

const signUser = (_id: string, fullName: string): string => {
    if (!process.env.JWT_KEY) {
        throw new Error('No JWT_KEY env is present!');
    }

    const token = jwt.sign({ userId: _id, fullName, expiresIn: config.EXPIRES_IN }, process.env.JWT_KEY, {
        expiresIn: config.EXPIRES_IN,
    });

    return token;
};

export default signUser;
