import supertest from 'supertest';
import app from '../../app';
import Solution from '../../models/Solution';
import User from '../../models/User';
import { createUser, loginDummyUser } from '../../testHelpers/testHelpers';

const addSolutionAsLoggedUser = async (userToken: string, isPublic: boolean) => {
    return supertest(app)
        .put('/solutions')
        .set({ Authorization: `Bearer ${userToken}` })
        .send({
            title: 'Title1',
            description: 'Description2',
            content: 'Content3',
            isPublic,
        });
};

const getSolutionsAsUser = (userToken: string) => {
    return supertest(app)
        .get('/solutions')
        .set({ Authorization: `Bearer ${userToken}` });
};

describe('solution router', () => {
    beforeAll(async () => {
        await Solution.deleteMany();
        await User.deleteMany();
        await createUser(1);
        await createUser(2);
    });
    beforeEach(() => {
        jest.restoreAllMocks();
    });

    it('should not allow getting solutions if user is not authenticated', async () => {
        const response = await supertest(app).get('/solutions');

        expect(response.body).toEqual({ errorCode: 400, message: 'Authentication failed' });
    });

    describe('Creating, reading editing and removing a solution', () => {
        it('should add a new solution to the database', async () => {
            const userToken = await loginDummyUser(1);

            const response = await addSolutionAsLoggedUser(userToken, true);

            expect(response.body).toEqual({ message: 'Successfully created a new solution' });
            expect(response.statusCode).toEqual(201);
        });

        it('should add a new solution to the database', async () => {
            const userToken = await loginDummyUser(1);

            const response = await addSolutionAsLoggedUser(userToken, false);

            expect(response.body).toEqual({ message: 'Successfully created a new solution' });
        });

        it('should send all public and owners private solutions from the database', async () => {
            const firstUserToken = await loginDummyUser(1);

            await addSolutionAsLoggedUser(firstUserToken, true);

            const secondUserToken = await loginDummyUser(2);

            const response = await getSolutionsAsUser(secondUserToken);

            expect(response.body.length).toEqual(2);
        });

        it('should not send solutions that belong to other users and are not marked as public', async () => {
            const firstUserToken = await loginDummyUser(1);

            await addSolutionAsLoggedUser(firstUserToken, false);

            const secondUserToken = await loginDummyUser(2);

            const response = await getSolutionsAsUser(secondUserToken);

            expect(response.body.length).toEqual(2);
        });
    });
});
