import { JwtVerificator } from './jwtVerificator';
import jwt from 'jsonwebtoken';

jest.mock('jsonwebtoken');

describe('auth - verificator - jwtVerificator', () => {
    let verificator: JwtVerificator;

    beforeEach(() => {
        verificator = new JwtVerificator(123, 'token-secret');
    });

    afterEach(() => {
        jest.resetAllMocks();
    });

    it('should throw, if jwt key is not defined', () => {
        try {
            new JwtVerificator(123);
        } catch (error) {
            if (error instanceof Error) {
                expect(error.message).toEqual('No jwt key was passed to JWT verificator');
            }
        }

        expect.assertions(1);
    });

    it('should throw if token is not provided to verification', () => {
        try {
            verificator.verify('');
        } catch (error) {
            if (error instanceof Error) {
                expect(error.message).toEqual('Authentication failed, details: No token provided');
            }
        }

        expect.assertions(1);
    });

    it('should data from decoded token', () => {
        givenUserDataSavedInToken();

        const result = verificator.verify('token');

        expect(result).toEqual({ userId: '1234', fullName: 'tester test' });
        expect(jwt.verify).toHaveBeenCalledWith('token', 'token-secret');
    });

    it('should return data with signed token', () => {
        givenSigningTokenReturns();

        const result = verificator.sign({ userId: '1234', fullName: 'tester test' });

        expect(result).toEqual({ expiresIn: 123, token: 'secret-auth-token' });
        expect(jwt.sign).toHaveBeenCalledWith({ fullName: 'tester test', userId: '1234' }, 'token-secret', {
            expiresIn: 123,
        });
    });

    function givenUserDataSavedInToken() {
        (jwt.verify as jest.Mock).mockReturnValue({ userId: '1234', fullName: 'tester test' });
    }

    function givenSigningTokenReturns() {
        (jwt.sign as jest.Mock).mockReturnValue('secret-auth-token');
    }
});
