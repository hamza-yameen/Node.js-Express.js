# Authentication and Authorization with Roles using Node.js, Express.js, Prisma ORM, Twilio SendGrid, and MySQL

With this repo, you'll be able to see how the node.js/express.js project should be structured. This is the authentication and authorization system using JWT tokens and Twilio SendGrid.

## What you'll learn:

1. ### Error Handling:
   Learn robust techniques for managing errors and providing informative messages to the user

2. ### Response Management:
   Discover methods for crafting clear and consistent API responses, potentially using a generic method for efficient code.

3. ### JWT Authentication & Authentication With Roles:
   Implementing JWT-based authentication will give you a common authentication mechanism for API endpoints. User sessions and authorization 
   can be managed securely with JWTs.

4. ### User Activation System with Database:
   Implement a secure user activation system that leverages a database to store user information and activation status.

5. ### Email Verifications with Twilio SendGrid:
   Explore techniques for sending activation emails or other notifications using a service like Twilio SendGrid (consider adding this 
   detail if sending emails is a core feature)

## Run Seed Command

Open your terminal and navigate to the project directory.
```bash
npm run seed
```

## Making API Requests with cURL

This section provides examples using the curl command-line tool to interact with the API endpoints defined in this project.

- Register User

```bash
curl --location 'http://localhost:8000/api/auth/register' \
--header 'Content-Type: application/json' \
--data-raw '{
"email" : "email@gmail.com",
"password" : "password1122@",
"userName" : "user-name"
}'
```

- User Activation

```bash
curl --location 'http://localhost:8000/api/auth/verification?code=45672' \
--header 'Authorization: Bearer Token'
```

- Login User

```bash
curl --location 'http://localhost:8000/api/auth/login' \
--header 'Content-Type: application/json' \
--data-raw '{
"email" : "email@gmail.com",
"password" : "user-name"
}'
```

**Note:** You got the email of the verification code after signup the process, I'd like to remind you that the code has expired after one hour.

- Get All User

```bash
curl --location 'http://localhost:8000/api/user' \
--header 'Authorization: Bearer Token'
```

- Delete All User

```bash
curl --location --request DELETE 'http://localhost:8000/api/user/all' \
--header 'Authorization: Bearer Token'
```

- Get all users with role id

```bash
curl --location 'http://localhost:8000/api/user/withrolesid?roldId=${rold_id}' \
--header 'Authorization: Bearer Token'
```

- Get all roles
```bash
curl --location 'http://localhost:8000/api/roles' \
--header 'Authorization: Bearer Token'
```










# Project Documentation
## Introduction
1. NestJS with TypeScript: A Node.js framework for building scalable applications using TypeScript.
2. PostgreSQL: Relational database used for data management.
3. Docker: Containerization for consistent development environments.
4. Prisma ORM: Simplifies database interactions with type-safe queries.
5. JWT Token: Used for authentication and authorization.

## Setup Instructions
Clone Repo:
```bash
git clone https://github.com/your-repo/project.git
```

Install Dependencies:
```bash
npm install
```

For Docker:
```bash
docker-compose up -d
```

Run Migrations:
```bash
npx prisma migrate dev
```

Run Project:
```bash
npm start dev
```
 
## Application Endpoints
The application consists of 5 main modules: User, Booking, Merchant, Review, and Payment. Each module contains several endpoints to manage various operations.

### 1. User Module
This module handles user registration, login, and profile management. Authentication is managed using JWT tokens.
* POST /user/register:    Register a new user.
* POST /user/login:       Authenticate and log in as a user.
* GET /user/profile:      Get the logged-in user's profile (requires authentication).

### 2. Booking Module
This module manages booking operations for users and merchants.
* POST /bookings/add:           Create a new booking.
* GET /bookings/all:            Get All bookings detail.
* GET /bookings/:id:            Get booking details by ID.
* PATCH /bookings/:id/status:   Update the status of a booking.

### 3. Merchant Module
This module manages merchants and their details.
* POST /merchant/add:       Register a new merchant.
* GET /merchant/find/:id:   Get merchant details by ID.
* GET /merchant:            Get all merchant details.
* Patch /merchant/:id:      Update merchant details.
* Delete /merchant/:id:     Delete merchant details.

### 4. Review Module
This module allows users to leave reviews for their bookings.
* POST /reviews/add:                   Submit a review for a booking.
* GET /reviews/user:                   Get reviews by user ID.
* GET /reviews/merchant/:merchantId:   Get reviews by merchant ID.

### 5. Payment Module
This module manages payments for bookings.
* POST /payment/scan:            Process a payment for a booking.
* GET /payments/bookingId:       Get payment details by booing ID.

