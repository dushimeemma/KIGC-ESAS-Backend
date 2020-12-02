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
- Create Role `/api/role/create`
- Assign Role `/api/role/assign`
- View Profile `/api/user/profile`
- Student `/api/student`
- Finance `/api/finance`
- Attendance `/api/attendance`
- Course `/api/course`
- Seat `/api/seat`

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

- Assign Role

```
{
    "role":"DUMMY",
    "email":"email@email.com"
}
```

- Register Student

```
{
    "regNo":"Dummy",
    "name":"Dummy",
    "department":"Dummy",
    "level":"3"
}
```

- Record Financial Status Of Student

```
{
    "amount":"60000",
}
```

- Record Attendance Status Of Student

```
{
    "percentage":"90",
}
```

- Record Course and Assign it To Student

```
{
    "name":"JavaScript",
}
```

- View Seat

```
{
    "reg":"REG/No",
}
```
