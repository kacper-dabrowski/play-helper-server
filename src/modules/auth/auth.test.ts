import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../../models/User';
import Errors from '../errors';
import { AuthModule } from './auth';
import { FakeVerificator } from './verificator/fakeVerificator';

jest.mock('../../models/User');
jest.mock('bcryptjs');
jest.mock('jsonwebtoken');

const fakeUser = {
    username: 'fake-user',
    password: 'fake-password',
    fullName: 'faker fake',
};

describe('modules - auth', () => {
    let authModule: AuthModule;

    beforeEach(() => {
        const verify = jest.fn(() => ({ userId: 'user-id', fullName: 'full name' }));
        const sign = jest.fn(() => ({ expiresIn: 123, token: 'token' }));

        authModule = new AuthModule(new FakeVerificator({ sign, verify }));
    });

    afterEach(() => {
        jest.resetAllMocks();
    });

    describe('logging a user in', () => {
        [
            {
                when: 'user does not exist',
                expectedError: new Errors.BadRequestError('credentialsInvalid'),
                prepareTests: givenUserDoesNotExist,
            },
            {
                when: 'password is incorrect',
                expectedError: new Errors.BadRequestError('credentialsInvalid'),
                prepareTests: () => {
                    givenUserExists();
                    givenPasswordIncorrect();
                },
            },
        ].forEach(({ when, expectedError, prepareTests }) => {
            it(`should throw an error, when ${when}`, async () => {
                prepareTests();

                await expect(authModule.loginUser({ username: 'username', password: 'password' })).rejects.toEqual(
                    expectedError
                );
            });
        });

        it('should log in a user, if user exists and password is correct', async () => {
            givenUserExists();
            givenPasswordCorrect();
            givenToken();

            const { username, password } = fakeUser;

            const result = await authModule.loginUser({ username, password });

            expect(result).toEqual({
                success: true,
                data: {
                    token: 'token',
                    fullName: fakeUser.fullName,
                    expiresIn: 123,
                },
            });
        });
    });

    describe('registering a user', () => {
        const defaultPayload = {
            username: fakeUser.username,
            password: fakeUser.password,
            fullName: fakeUser.fullName,
            repeatPassword: fakeUser.password,
        };

        [
            {
                when: 'user exists',
                expectedError: new Errors.ExistentError(),
                prepareTests: givenUserExists,
                payload: defaultPayload,
            },
            {
                when: 'passwords do not match',
                expectedError: new Errors.BadRequestError(),
                payload: { ...defaultPayload, repeatPassword: 'no-match' },
                prepareTests: () => {
                    givenUserDoesNotExist();
                    givenPasswordIncorrect();
                },
            },
        ].forEach(({ when, expectedError, prepareTests, payload }) => {
            it(`should throw an error, when ${when}`, async () => {
                prepareTests();

                await expect(authModule.registerUser(payload)).rejects.toEqual(expectedError);
            });
        });

        it('should register a user, when it does not exist and passwords match', async () => {
            givenUserRegistered();
            givenToken();
            givenPasswordCorrect();

            const result = await authModule.registerUser(defaultPayload);

            expect(result).toEqual({
                success: true,
                data: {
                    token: 'token',
                    fullName: fakeUser.fullName,
                    expiresIn: 123,
                },
            });
        });
    });

    function givenUserExists() {
        (User.findOne as jest.Mock).mockResolvedValue(fakeUser);
    }

    function givenUserDoesNotExist() {
        (User.findOne as jest.Mock).mockResolvedValue(null);
    }

    function givenPasswordIncorrect() {
        (bcrypt.compare as jest.Mock).mockResolvedValue(false);
    }

    function givenPasswordCorrect() {
        (bcrypt.compare as jest.Mock).mockResolvedValue(true);
    }

    function givenToken() {
        (jwt.sign as jest.Mock).mockReturnValue('token');
    }

    function givenUserRegistered() {
        (User.findOne as jest.Mock).mockResolvedValueOnce(null).mockResolvedValueOnce(fakeUser);
    }
});
