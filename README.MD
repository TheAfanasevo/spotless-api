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
  #### Templating (view)
    * pug             2.0.3
  #### Others
    * lodash          4.17.11
    * moment          2.23.0
## What does it do?
  It facilitates certain duties done in movie rental stores by helping the staff (users) manage data about their customers, movies in stock, and keep records of rented movies, make price calculation, apply special discounts for Gold customers etc.
## How does it do it?
  For now, it is only a back-end service which allows basic __CRUD__ *(Create, Read, Update, Delete)* functions using the following end-points:
#### Target end-points
    * api/            Mainpage
    * api/auth        Authenticate users/admins
    * api/customers   CRUD for customer data
    * api/genres      CRUD for movie genres
    * api/movies      CRUD for movie data
    * api/rentals     Rented movies & Rental info
    * api/returns     Returned movies & Price calculation
    * api/users       Create user & Get current user
#### How can I test it?
  Use [__Postman__](https://www.getpostman.com/) to test all end-points and functions.
  #### For authentication:
  Authentication is ensured by the __JWT (Json Web Token)__. Tokens are stored in response headers after creating new users. Simply use the token stored in *'x-auth-token'* parameter of the response header to send requests to protected routes.
## What is missing?
  There is a basic view for the API which lacks in terms of functionality. The authentication in front-end is a complex topic and thus I didn't apply it in this project.
## Who are you?
  I am just a learner. Feel free to contact me [here](mustafa.kursun@yandex.com) or on [Twitter](https://twitter.com/KursunMust) to give any kind of polite advice knowing that I am just a learner :octocat: