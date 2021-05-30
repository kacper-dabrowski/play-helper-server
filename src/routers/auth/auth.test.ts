import supertest from 'supertest';
import app from '../../app';
import config from '../../config';
import User from '../../models/User';

const userCredentials = {
    username: 'newacc',
    password: 'testtest123',
    fullName: 'Test Testing',
};
describe('auth endpoints', () => {
    let userId: string | undefined;

    describe('registering a new user', () => {
        it('should register a valid user to the database', async () => {
            const response = await supertest(app).post('/signup').send(userCredentials);

            userId = response.body.userId;
            const savedUser = await User.findOne({ _id: userId });

            expect(response.body.message).toEqual('User created successfully');
            expect(response.statusCode).toEqual(201);
            expect(savedUser?.fullName).toEqual(userCredentials.fullName);
            expect(savedUser?.username).toEqual(userCredentials.username);
        });
    });
    describe('logging a user', () => {
        it('should return a valid jwt token, that will pass authentication middleware', async () => {
            const response = await supertest(app)
                .post('/login')
                .send({ username: userCredentials.username, password: userCredentials.password });

            const savedUser = await User.findOne({ _id: userId });

            expect(response.body).toMatchObject({
                fullName: userCredentials.fullName,
                expiresIn: config.EXPIRES_IN,
            });
            expect(response.body.userId).toEqual(savedUser?.id);
        });

        it('should not sign a user in if credentials are invalid', async () => {
            const responseAfterWrongPassword = await supertest(app)
                .post('/login')
                .send({ username: userCredentials.username, password: 'invalid' });

            const responseAfterWrongLogin = await supertest(app)
                .post('/login')
                .send({ username: 'nonExistentUser', password: userCredentials.password });

            expect(responseAfterWrongLogin.body.message).toEqual('Credentials were incorrect.');
            expect(responseAfterWrongLogin.statusCode).toEqual(400);
            expect(responseAfterWrongPassword.body.message).toEqual('Credentials were incorrect.');
            expect(responseAfterWrongPassword.statusCode).toEqual(400);
        });
    });
});
