import supertest from 'supertest';
import app from '../app';
import { SolutionDto } from '../models/Solution';
import { SupportRequestDto } from '../models/SupportRequest';
import { User, UserSettings } from '../models/User';

export const createUser = async (identifier: number): Promise<string> => {
    const response = await supertest(app)
        .post('/signup')
        .send({
            username: `Test${identifier}`,
            password: `Testing${identifier}`,
            fullName: `Testing Testing${identifier}`,
            repeatPassword: `Testing${identifier}`,
        });

    if (response.statusCode !== 201) {
        throw new Error(`Unable to create user, details:${JSON.stringify(response?.body)}`);
    }

    return response.body.userId;
};

export const loginDummyUser = async (identifier: number): Promise<{ token: string; userId: string }> => {
    const response = await supertest(app)
        .post('/login')
        .send({
            username: `Test${identifier}`,
            password: `Testing${identifier}`,
        });

    return { token: response?.body?.token, userId: response?.body?.userId };
};

export const solutionTestHelpers = {
    addSolutionAsLoggedUser: async (
        userToken: string,
        isPublic: boolean
    ): Promise<{ body: { message: string }; statusCode: number }> =>
        supertest(app)
            .put('/solutions')
            .set({ Authorization: `Bearer ${userToken}` })
            .send({
                title: 'Title1',
                description: 'Description2',
                content: 'Content3',
                isPublic,
            }),

    getSolutionsAsUser: (userToken: string): Promise<{ body: SolutionDto[] }> =>
        supertest(app)
            .get('/solutions')
            .set({ Authorization: `Bearer ${userToken}` }),

    editSolutionAsLoggedUser: async (
        userToken: string,
        update: { title?: string; description?: string; content?: string; isPublic?: boolean },
        solutionId?: string
    ): Promise<{ body: { message: string }; statusCode: number }> =>
        supertest(app)
            .post(`/solutions/${solutionId}`)
            .set({ Authorization: `Bearer ${userToken}` })
            .send(update),

    deleteSolutionAsLoggedUser: async (
        userToken: string,
        solutionId?: string
    ): Promise<{ body: { message: string }; statusCode: number }> =>
        supertest(app)
            .delete(`/solutions/${solutionId}`)
            .set({ Authorization: `Bearer ${userToken}` }),
};
export const srqTestHelpers = {
    addSrqAsLoggedUser: async (userToken: string): Promise<{ body: { message: string }; statusCode: number }> =>
        supertest(app)
            .put('/srq')
            .set({ Authorization: `Bearer ${userToken}` })
            .send({
                title: 'Title1',
                description: 'Description2',
                department: 'Department3',
                content: 'Content4',
            }),
    getSrqsAsUser: (userToken: string): Promise<{ body: SupportRequestDto }> =>
        supertest(app)
            .get('/srq')
            .set({ Authorization: `Bearer ${userToken}` }),

    editSrqAsLoggedInUser: async (
        userToken: string,
        update: { title?: string; description?: string; content?: string; department?: string },
        srqId?: string
    ): Promise<{ body: { message: string }; statusCode: number }> =>
        supertest(app)
            .post(`/srq/${srqId}`)
            .set({ Authorization: `Bearer ${userToken}` })
            .send(update),
    deleteSrqAsLoggedUser: async (
        userToken: string,
        srqId?: string
    ): Promise<{ body: { message: string }; statusCode: number }> =>
        supertest(app)
            .delete(`/srq/${srqId}`)
            .set({ Authorization: `Bearer ${userToken}` }),
};

export const settingsTestHelpers = {
    editSettingsAsLoggedUser: async (
        userToken: string,
        updateSettings: { settings?: UserSettings }
    ): Promise<{ body: { message: string } }> =>
        supertest(app)
            .post('/user/settings')
            .set({
                Authorization: `Bearer ${userToken}`,
            })
            .send(updateSettings),
    getUserData: async (userToken: string): Promise<{ body?: User }> =>
        supertest(app)
            .get('/user/settings')
            .set({ Authorization: `Bearer ${userToken}` })
            .send(),
};
