import supertest from 'supertest';
import app from '../app';

export const createUser = async (identifier: number): Promise<void> => {
    const response = await supertest(app)
        .post('/signup')
        .send({
            username: 'Test' + identifier,
            password: 'Testing' + identifier,
            fullName: 'Testing Testing' + identifier,
        });

    if (response.statusCode !== 201) {
        throw new Error('Unable to create user, details:' + JSON.stringify(response?.body));
    }
};

export const loginDummyUser = async (identifier: number): Promise<string> => {
    const response = await supertest(app)
        .post('/login')
        .send({
            username: 'Test' + identifier,
            password: 'Testing' + identifier,
        });

    return response?.body?.token;
};
