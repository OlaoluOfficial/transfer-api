import supertest from 'supertest';
import app from '../src/app';

import fs from 'fs/promises';
import path from 'path';

const balDB = path.join(__dirname, '../data/balancesDB.json');
const transDB = path.join(__dirname, '../data/transactionsDB.json');

const mockData = [
  {
    balance: 100000,
    accountNumber: '969817191197',
    createdAt: '2022-04-07T18:42:24.680Z',
  },
  {
    balance: 100000,
    accountNumber: '969817191198',
    createdAt: '2022-04-07T18:42:24.680Z',
  },
];
const transMockData = {
  senderAccountNumber: '989817191197',
  amount: 50,
  receiverAccountNumber: '969817191198',
  transferDescription: 'Money for abortion',
  reference: 'f5512d2c-e540-4847-82dd-65a47a3310be',
  createdAt: '2022-04-07T19:48:01.262Z',
};
beforeAll(async () => {
  await fs.writeFile(balDB, JSON.stringify([mockData]));
  await fs.writeFile(transDB, JSON.stringify([transMockData]));
});
afterAll(async () => {
  await fs.unlink(balDB);
  await fs.unlink(transDB);
});
describe('GET /balance', () => {
  it('should return 200 OK', async () => {
    const response = await supertest(app).get('/balance');
    expect(response.status).toBe(200);
  });
});
describe('GET /balance/:accountNumber', () => {
  it('should return 200 OK', async () => {
    const response = await supertest(app).get('/balance/969817191197');
    expect(response.status).toBe(200);
  });
});
describe('GET /transactions', () => {
  test('GET /transactions', () => {
    return supertest(app)
      .get('/transactions')
      .expect(200)
      .expect('Content-Type', /json/)
      .then((res) => {
        expect(res.body).toEqual([transMockData]);
      });
  });
});
describe('POST /transfer', () => {
  const message = { message: 'Something went wrong' };
  test('POST /transfer', () => {
    return supertest(app)
      .post('/transfer')
      .send({
        senderAccountNumber: '989817191197',
        amount: 50,
        receiverAccountNumber: '969817191198',
        transferDescription: 'Money for abortion',
        reference: 'f5512d2c-e540-4847-82dd-65a47a3310be',
      })
      .expect(400)
      .expect('Content-Type', /json/)
      .then((res) => {
        expect(res.body).toEqual(message);
      });
  });
});
describe('POST /', () => {
  it('should return 400 OK', async () => {
    const response = await supertest(app).post('/transfer').send(transMockData);
    expect(response.status).toBe(400);
  });
});
