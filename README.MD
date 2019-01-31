# SPOTLESS - MOVIE RENTAL APP
## What is Spotless?
  *Spotless* is a RESTful API for an imaginary movie rental store. It is created based on __[Mosh Hamedani's Node.js Guide](https://www.udemy.com/nodejs-master-class/)__ with a simple interface using *Pug* view engine and *Bulma* CSS framework.
## What is it built upon?
  *Spotless* is built upon __[Node.js](https://nodejs.org/en/)__ technology, using __[Express.js](express.js) framework__ and __MongoDB database__, plus with the help of the following __NPM__ packages:
  #### Database Interaction
    * mongoose        5.3.13
  #### Production
    * compression     1.7.3
    * helmet helmet   3.13.0
  #### Authentication
    * jsonwebtoken    8.4.0
  #### Input validation
    * joi             14.3.1
    * joi-objectid    2.0.0
  #### Configuration
    * config          3.0.0
  #### Transaction
    * fawn            2.1.5
  #### Logging
    * winston         3.1.0
    * winston-mongodb 3.0.2
  #### Testing
    * jest            23.6.0
    * supertest       3.3.0
  #### Templating (view) /disabled
    * pug             2.0.3
  #### Others
    * lodash          4.17.11
    * moment          2.23.0
## What does it do?
  It facilitates certain duties done in movie rental stores by helping the staff (users) manage data about their customers, movies in stock, and keep records of rented movies, make price calculation, apply special discounts for Gold customers etc.
## How does it do it?
  For now, it is only a back-end service which allows basic __CRUD__ *(Create, Read, Update, Delete)* functions using the following end-points:
#### Target end-points and requests
    * api/            GET
    * api/auth        POST user credentials, copy the token sent in response body to use in protected routes.
    * api/customers   GET, GET/:id, POST customer details, PUT/:id + customer details to be updated, DELETE/:id to delete customer
    * api/genres      GET all genres, GET/:id to get genres by id, POST genre name to create genre, PUT/:id to update genre name, DELETE/:id to delete genre 
    * api/movies      GET all movies, GET/:id to get movies by id, POST movie details to create new movie, PUT/:id to update movie details, DELETE/:id to delete movie
    * api/rentals     GET all rented movies, GET/:id to get rentals by id, POST a new rental with movie and customer details
    * api/returns     POST a return with details of a current rental
    * api/users       GET/me to get the current user, POST user credentials to create a new user
    
    *looks complicated but will be edited soon*
#### How can I test it?
  Use [__Postman__](https://www.getpostman.com/) to test all end-points and functions.
  #### For authentication:
  Authentication is ensured by the __JWT (Json Web Token)__. Tokens are stored in response headers and sent in response bodies after creating new users. Simply copy this token stored in *'x-auth-token'* parameter of the response header and paste it to the same header but this time in the header of your request to be sent to a protected route.
## What is missing?
  The view folder has been disabled. Fully rendered version of the app will be published in/deployed to [Heroku repository](https://spotless-rental.herokuapp.com/). Thus, this version in GitHub only includes the naked API.
## Who are you?
  I am just a learner. Feel free to contact me [here](mustafa.kursun@yandex.com) or on [Twitter](https://twitter.com/KursunMedust) to give any kind of polite advice knowing that I am just a learner :octocat: