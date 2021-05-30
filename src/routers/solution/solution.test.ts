import supertest from 'supertest';
import app from '../../app';

describe('solution router', () => {
    beforeAll(() => {
        // Solution.deleteMany();
    });

    it('should not allow getting solutions if user is not authenticated', async () => {
        const response = await supertest(app).get('/solutions');

        expect(response.body).toEqual({ errorCode: 400, message: 'Authentication failed' });
    });
});
