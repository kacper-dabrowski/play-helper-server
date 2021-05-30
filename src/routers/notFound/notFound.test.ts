import supertest from 'supertest';
import app from '../../app';

describe('Not found router', () => {
    it('should respond with out of middlewares text, when no valid route is reached', async () => {
        const response = await supertest(app).get('/some-weird-path');

        expect(response.body).toEqual({ message: 'Ran out of middlewares!' });
    });
});
