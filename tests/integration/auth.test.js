/* Test requirements */
const request = require('supertest');
/* Classes, objects, functions */
const {User} = require('../../models/user');
const {Genre} = require('../../models/genre');

describe('auth middleware', () => {
  let server;
  
  beforeEach(() => { server = require('../../index'); })
  afterEach(async () => {
    await server.close();
    await Genre.remove({});
  });

  let token;

  const testRequest = () => {
    return request(server).post('/api/genres').set('x-auth-token', token).send( {name: 'genre1'} );
  }; /* this doesn't need to be /genres */

  beforeEach(() => {
    token = new User().generateAuthToken();
  });

  it('should return 401 if no token provided', async () => {
    token = ''; /* null doesn't work as it is parsed to string during execution */
    
    const res = await testRequest();

    expect(res.status).toBe(401);
  });

  it('should return 401 if no token provided', async () => {
    token = ''; /* null doesn't work as it is parsed to string during execution */
    
    const res = await testRequest();

    expect(res.status).toBe(401);
  });

  it('should return 400 if token is invalid', async () => {
    token = 'a'; /* invalid token */
    
    const res = await testRequest();

    expect(res.status).toBe(400);
  });

  it('should return 200 if token is valid', async () => {

    const res = await testRequest();

    expect(res.status).toBe(200);
  });
});
