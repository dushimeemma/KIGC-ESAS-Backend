[![Build Status](https://travis-ci.com/dushimeemma/KIGC-ESAS-Backend.svg?branch=main)](https://travis-ci.com/dushimeemma/KIGC-ESAS-Backend) [![Coverage Status](https://coveralls.io/repos/github/dushimeemma/KIGC-ESAS-Backend/badge.svg?branch=main)](https://coveralls.io/github/dushimeemma/KIGC-ESAS-Backend?branch=main)

# Exam Seats Arrangement System

# Vision

Web application used to allocate student into examination room

# Getting started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

## Prerequisites

Here are the environment prerequisites for the web app

```
- NodeJS
```

# Installing

- Clone the repo `git clone https://github.com/dushimeemma/KIGC-ESAS-Backend`
- Install `npm install`
- Run `npm run dev`

# Endpoints

- SignUp `/api/auth/signup`
- Login `/api/auth/login`
- Logout `/api/auth/logout`

# Testing Models

- SignUp

```
{
    "name":"FirstName LastName",
    "email":"email@email.com",
    "password":"Password2019"
}
```

- Login

```
{
    "email":"email@email.com",
    "password":"Password2019"
}
```
