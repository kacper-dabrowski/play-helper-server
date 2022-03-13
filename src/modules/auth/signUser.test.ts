import jwt from 'jsonwebtoken';
import signUser from './signUser';

describe('signUser', () => {
    const OLD_ENV = process.env;
    const fullName = 'Test Testing';
    const fakeId = '1234';

    beforeEach(() => {
        jest.clearAllMocks();
        jest.resetModules();
        process.env = { ...OLD_ENV };
    });

    it('should throw if there is a problem with JWT', () => {
        withoutJwtKey();

        expect(() => signUser(fakeId, fullName)).toThrow('No JWT_KEY env is present!');
    });

    it('should correctly sign the user in if JWT_KEY is passed as env', () => {
        withJwtKey();
        const jwtSpy = jest.spyOn(jwt, 'sign').mockImplementation(() => 'some-jwt');

        const result = signUser(fakeId, fullName);

        expect(jwtSpy).toHaveBeenCalledWith({ expiresIn: 36000, fullName: 'Test Testing', userId: '1234' }, '1234', {
            expiresIn: 36000,
        });
        expect(result).toEqual('some-jwt');
    });
});

function withJwtKey() {
    process.env.JWT_KEY = '1234';
}

function withoutJwtKey() {
    process.env.JWT_KEY = undefined;
}
