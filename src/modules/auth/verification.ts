import jwt from 'jsonwebtoken';
import Errors from '../errors';

export interface Verificator {
    sign(userData: UserDataToSign): { expiresIn: number; token: string };
    verify(token: string): UserDataToSign | undefined;
}

export interface UserDataToSign {
    fullName: string;
    userId: string;
}

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
            if (!token || !process.env.JWT_KEY) {
                throw new Error('No token provided');
            }

            const decodedToken = jwt.verify(token, process.env.JWT_KEY) as UserDataToSign | undefined;

            return decodedToken;
        } catch (error) {
            if (error instanceof Error) {
                throw new Errors.BadRequestError('Authentication failed, details ', error.message);
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

export class FakeVerificator implements Verificator {
    constructor(verificatorConfig?: Verificator) {
        Object.assign(this, { ...verificatorConfig });
    }

    sign(userData: UserDataToSign): { expiresIn: number; token: string } {
        return {
            expiresIn: 123,
            token: `${userData.userId}token`,
        };
    }

    verify(token: string): UserDataToSign {
        return { userId: 'some-userId', fullName: `test-test-from${token}` };
    }
}
