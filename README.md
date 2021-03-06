<h1 align="center">MicroserviceApis</h1>

<p align="center">
  <i>Microservices for Content & User Services</i>
  <br>
</p>

<p align="center">
  <a href="https://serviceapis.herokuapp.com/"><strong>serviceapis.herokuapp.com</strong></a>
  <br>
</p>

<p align="center">
    <img src="https://img.shields.io/badge/npm-v8.1.0-blue?logo=npm"/>
     &nbsp;
    <img src="https://img.shields.io/badge/docker-compose-blue?logo=docker"/>
     &nbsp;
    <img src="https://img.shields.io/badge/graphql-v15.8.0-red?logo=graphql&logoColor=red&label=graphql" />
     &nbsp;
    <img src="https://img.shields.io/badge/heroku-deployed-blue?logo=heroku"/>
</p>

<hr>

## Documentation

### User Services

1. getUser(): Get users details

2. signup(): Signup new user
   - Requires: fname, lname, username, password, confirmPassword, email, phone 
   - Validation: Unique username
   - Returns: token, user details

3. signin(): Signin existing user
    - Requires: username, password
    - Validation: User should exist
    - Returns: token, user details

4. deleteUser(): Delete user
    - Requires: userId
    - Headers: Authorization: Bearer 'token_value'
    - Validation: User should exist
    - Extra: Delete User likes and reads from books

5. updateProfile(): Update user profile
    - Requires: userId, fname, lname, email, phone
    - Headers: Authorization: Bearer 'token_value'
    - Validation: User should exist

### Content Services

1. newBooks(): Get all books sorted by date

2. topBooks(): Get top books sorted on the basis of number of interactions, likes and reads.

3. createBook(): Create new book
    - Requires: title, story
    - Headers: Authorization: Bearer 'token_value'
    - Validation: Unique title

4. updateBook(): Update book
    - Requires: bookId, title, story
    - Headers: Authorization: Bearer 'token_value'
    - Validation: Book should exist
         
5. deleteBook(): Delete book
    - Requires: bookId
    - Headers: Authorization: Bearer 'token_value'
    - Validation: Book should exist

### User Interaction Services

1. readBook(): Mark book as read
    - Requires: bookId
    - Headers: Authorization: Bearer 'token_value'
    - Validation: Book should exist, user should exist

2. likeBook(): Mark book as liked
    - Requires: bookId
    - Headers: Authorization: Bearer 'token_value'
    - Validation: Book should exist, user should exist


## Tech Stack

- ExpressJS
- NodeJS
- MangoDB 
- JWT

## API's Postman Collections

[Postman Documentation](https://documenter.getpostman.com/view/13401788/UVXqDsY5)

[![Run in Postman](https://run.pstmn.io/button.svg)](https://app.getpostman.com/run-collection/1534f77f183ec0251709?action=collection%2Fimport)


## Getting setup

#### Method - 1:  Docker Compose Setup

#### Prerequisites

- Install [Docker](https://www.docker.com/)

Download the project

```
$ git clone https://github.com/gdeepak884/microservices.git
```

To start the server

```
$ cd microservices
$ docker compose up
```

to play with APIs, navigate to the below address in
your preferred browser.

`127.0.0.1:80/`

To stop the server

```
$ docker compose down
```

<hr>

#### Method - 2:  Node Server Setup

#### Prerequisites

- Install [Node.js](https://nodejs.org/en/)

Download the project

```
$ git clone https://github.com/gdeepak884/microservices.git
```

To start the server

```
$ cd microservices
$ npm install
$ npm run dev/prod
```
* dev for development mode
* prod for production mode

to play with APIs, navigate to the below address in
your preferred browser.

`127.0.0.1:80/`

## Data Ingestion

- Set Dataset File Path in the `ingestion/index.js` 
- Set Token value of any user in `ingestion/index.js`, then

> Note: In the dataset please take care that the title values should need to be unique or for the testing purpose, i have attached a CSV dataset of unique title in `/data` dir.
```
$ npm run ingestion
```
or

[![Run in Postman](https://run.pstmn.io/button.svg)](https://app.getpostman.com/run-collection/a9e3524fb76919145520?action=collection%2Fimport)`[including doc]`

## License

MIT
