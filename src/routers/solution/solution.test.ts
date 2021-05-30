import supertest from 'supertest';
import app from '../../app';

xdescribe('solution router', () => {
    beforeEach(() => {
        jest.restoreAllMocks();
    });
    it('should not allow getting solutions if user is not authenticated', async () => {
        const response = await supertest(app).get('/solutions');

        expect(response.body).toEqual({ errorCode: 400, message: 'Authentication failed' });
    });

    describe('Creating, reading editing and removing a solution', () => {
        it('should add a new solution to the database', async () => {
            const { body } = await supertest(app)
                .put('/solutions')
                .send({ Headers: { Authorization: 'Bearer 1234' } });

            expect(body).toEqual({});
        });
    });
});
