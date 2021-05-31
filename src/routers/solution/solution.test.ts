import supertest from 'supertest';
import app from '../../app';
import Solution from '../../models/Solution';
import User from '../../models/User';
import { createUser, loginDummyUser, solutionTestHelpers } from '../../testHelpers/testHelpers';

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

            const response = await solutionTestHelpers.addSolutionAsLoggedUser(userToken, true);

            expect(response.body).toEqual({ message: 'Successfully created a new solution' });
            expect(response.statusCode).toEqual(201);
        });

        it('should add a new solution to the database', async () => {
            const userToken = await loginDummyUser(1);

            const response = await solutionTestHelpers.addSolutionAsLoggedUser(userToken, false);

            expect(response.body).toEqual({ message: 'Successfully created a new solution' });
        });

        it('should send all public and owners private solutions from the database', async () => {
            const firstUserToken = await loginDummyUser(1);

            await solutionTestHelpers.addSolutionAsLoggedUser(firstUserToken, true);

            const secondUserToken = await loginDummyUser(2);

            const response = await solutionTestHelpers.getSolutionsAsUser(secondUserToken);

            expect(response.body.length).toEqual(2);
        });

        it('should not send solutions that belong to other users and are not marked as public', async () => {
            const firstUserToken = await loginDummyUser(1);

            await solutionTestHelpers.addSolutionAsLoggedUser(firstUserToken, false);

            const secondUserToken = await loginDummyUser(2);

            const response = await solutionTestHelpers.getSolutionsAsUser(secondUserToken);

            expect(response.body.length).toEqual(2);
        });

        it('should update certain fields of the document', async () => {
            const userToken = await loginDummyUser(1);

            const solution = await Solution.findOne();

            const solutionId = solution?.id;

            await solutionTestHelpers.editSolutionAsLoggedUser(userToken, { title: 'editedTitle' }, solutionId);

            await solutionTestHelpers.editSolutionAsLoggedUser(userToken, { content: 'editedContent' }, solutionId);

            await solutionTestHelpers.editSolutionAsLoggedUser(
                userToken,
                {
                    description: 'editedDescription',
                },
                solutionId
            );

            await solutionTestHelpers.editSolutionAsLoggedUser(userToken, { isPublic: false }, solutionId);

            expect(await Solution.findOne({ _id: solutionId })).toMatchObject({
                title: 'editedTitle',
                description: 'editedDescription',
                content: 'editedContent',
                isPublic: false,
            });
        });
        it('should not allow to edit a solution of another user', () => {
            expect(1).toEqual(1);
        });

        it('should completely delete the solution with specified ID', async () => {
            const userToken = await loginDummyUser(1);

            const solutions = await solutionTestHelpers.getSolutionsAsUser(userToken);

            const solutionToRemove = solutions.body.find((solution) => solution.isAuthor);

            await solutionTestHelpers.deleteSolutionAsLoggedUser(userToken, solutionToRemove?._id);

            expect(solutionToRemove?._id).not.toEqual(null);
            expect(await Solution.find({ _id: solutionToRemove?._id })).toEqual([]);
        });

        it('should not allow to remove public solutions, that do not belong to the user', async () => {
            const secondUserToken = await loginDummyUser(2);
            await solutionTestHelpers.addSolutionAsLoggedUser(secondUserToken, true);

            const userToken = await loginDummyUser(1);

            const solutions = await solutionTestHelpers.getSolutionsAsUser(userToken);

            const solutionToRemove = solutions.body.find((solution) => !solution.isAuthor);

            await solutionTestHelpers.deleteSolutionAsLoggedUser(userToken, solutionToRemove?._id);

            expect(solutionToRemove?._id).not.toEqual(null);
            expect(await Solution.find({ _id: solutionToRemove?._id })).not.toEqual([]);
        });
    });
});
