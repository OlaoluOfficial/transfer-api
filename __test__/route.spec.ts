import supertest from 'supertest';
import app from '../src/app';

describe('GET /balance/:accountNumber', () => {
  it('should return a 200 response', async () => {
    const response = await supertest(app).get('/balance/715498694418');
    expect(response.status).toBe(200);
  });
});
