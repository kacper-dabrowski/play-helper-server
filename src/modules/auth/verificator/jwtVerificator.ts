import { Verificator, UserDataToSign } from './verificator';
import jwt from 'jsonwebtoken';
import Errors from '../../errors';

export class JwtVerificator implements Verificator {
    private jwtSecret: string;

    constructor(private expiresIn: number, jwtKey?: string) {
        if (!jwtKey) {
            throw new Error('No jwt key was passed to JWT verificator');
        }

        this.jwtSecret = jwtKey;
    }

    verify(token: string): UserDataToSign | undefined {
        try {
            if (!token || !this.jwtSecret) {
                throw new Error('No token provided');
            }

            const decodedToken = jwt.verify(token, this.jwtSecret) as UserDataToSign | undefined;

            return decodedToken;
        } catch (error) {
            if (error instanceof Error) {
                throw new Errors.BadRequestError('Authentication failed, details: ' + error.message);
            } else {
                throw new Error('Unkown error, details: ' + JSON.stringify(error));
            }
        }
    }

    sign(userDataToSign: UserDataToSign): { expiresIn: number; token: string } {
        const token = jwt.sign(userDataToSign, this.jwtSecret, {
            expiresIn: this.expiresIn,
        });

        return { token, expiresIn: this.expiresIn };
    }
}
