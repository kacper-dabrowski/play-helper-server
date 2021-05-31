import supertest from 'supertest';
import app from '../app';
import { SolutionDto } from '../models/Solution';

export const createUser = async (identifier: number): Promise<string> => {
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

    return response.body.userId;
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

export const solutionTestHelpers = {
    addSolutionAsLoggedUser: async (
        userToken: string,
        isPublic: boolean
    ): Promise<{ body: { message: string }; statusCode: number }> => {
        return supertest(app)
            .put('/solutions')
            .set({ Authorization: `Bearer ${userToken}` })
            .send({
                title: 'Title1',
                description: 'Description2',
                content: 'Content3',
                isPublic,
            });
    },

    getSolutionsAsUser: (userToken: string): Promise<{ body: SolutionDto[] }> => {
        return supertest(app)
            .get('/solutions')
            .set({ Authorization: `Bearer ${userToken}` });
    },

    editSolutionAsLoggedUser: async (
        userToken: string,
        update: { title?: string; description?: string; content?: string; isPublic?: boolean },
        solutionId?: string
    ): Promise<{ body: { message: string }; statusCode: number }> => {
        return supertest(app)
            .post('/solutions/' + solutionId)
            .set({ Authorization: `Bearer ${userToken}` })
            .send(update);
    },

    deleteSolutionAsLoggedUser: async (
        userToken: string,
        solutionId?: string
    ): Promise<{ body: { message: string }; statusCode: number }> => {
        return supertest(app)
            .delete('/solutions/' + solutionId)
            .set({ Authorization: `Bearer ${userToken}` });
    },
};
