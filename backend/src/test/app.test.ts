import app from '../app';
import request from 'supertest';

describe('App Launch', () => {
  it('Health Check API', async () => {
    const res = await request(app).get('/status');
    expect(res.statusCode).toBe(200);
    expect(res.body).toMatchObject({ code: 200, message: 'System is running' });
  });
});
