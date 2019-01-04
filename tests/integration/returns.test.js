/* Test requirements */
const request = require('supertest');
/* Classes, objects, functions */
const {Rental} = require('../../models/rental');
const {User} = require('../../models/user');
const {Movie} = require('../../models/movie');
/* Dependencies */
const mongoose = require('mongoose');
/* Third-party packages */
const moment = require('moment');

describe('/api/returns', () => {
  let server;
  let customerId;
  let movieId;
  let rental;
  let token;
  let movie;

  const testRequest = () => {
    return request(server)
    .post('/api/returns/')
    .set('x-auth-token', token)
    .send({customerId, movieId});
  };
  
  beforeEach(async () => { 
    server = require('../../index'); 
    
    customerId = mongoose.Types.ObjectId();
    movieId = mongoose.Types.ObjectId();
    token = new User().generateAuthToken();

    movie = new Movie({
      _id: movieId,
      title: '12345',
      genre: { name: '12345' },
      dailyRentalRate: 2,
      numberInStock: 10
    });

    await movie.save();

    rental = new Rental({
      customer: {
        _id: customerId,
        name: '12345',
        phone: '12345'
      },
      movie: {
        _id: movieId,
        title: '12345',
        dailyRentalRate: 2
      }
    });

    await rental.save();
  });

  afterEach(async () => {
    await server.close();
    await Rental.remove({});
    await Movie.remove({});
  });

  it('should return 401 (unauthorized) if client is not logged in', async () => {
    token = '';
    
    const response = await testRequest();

    expect(response.status).toBe(401);
  });

  it('should return 400 (bad request) if customerId is not provided', async () => {
    customerId = '';

    const response = await testRequest();

    expect(response.status).toBe(400);
  });

  it('should return 400 (bad request) if movieId is not provided', async () => {
    movieId = '';

    const response = await testRequest();

    expect(response.status).toBe(400);
  });

  it('should return 404 (not found) if no rental found for this customer/movie', async () => {
    await Rental.remove({});

    const response = await testRequest();

    expect(response.status).toBe(404);
  });

  it('should return 400 if return already processed', async () => {
    rental.dateReturned = new Date();
    await rental.save();

    const response = await testRequest();

    expect(response.status).toBe(400);
  });

  it('should return 200 if the request is valid', async () => {
    const response = await testRequest();

    expect(response.status).toBe(200);
  });

  it('should set dateReturned if input is valid', async () => {
    await testRequest();

    const rentalInDb = await Rental.findById(rental._id);
    
    const diff = new Date() - rentalInDb.dateReturned;
    expect(diff).toBeLessThan(10 * 1000);
  });

  it('should set the rental fee if input is valid', async () => {
    rental.dateOut = moment().add(-7, 'days').toDate();
    await rental.save();

    await testRequest();

    const rentalInDb = await Rental.findById(rental._id);
    expect(rentalInDb.rentalFee).toBe(14);
  });

  it('should increase the movie stock if input is valid', async () => {
    await testRequest();

    const movieInDb = await Movie.findById(movieId);
    expect(movieInDb.numberInStock).toBe(movie.numberInStock +1);
  });

  it('should return the rental object if input is valid', async () => {
    const response = await testRequest();

    const rentalInDb = await Rental.findById(rental._id);
    
    expect(Object.keys(response.body)).toEqual(
      expect.arrayContaining(['dateOut', 'dateReturned', 'rentalFee', 'customer', 'movie'])
    );
  });
});