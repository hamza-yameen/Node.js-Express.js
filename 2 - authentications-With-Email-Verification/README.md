# Simple Authentication with Node.js, Express.js, Prisma ORM, and MySQL

With this repo, you'll be able to see how the node.js/express.js project should be structured. This is a very basic authentication method using a JWT token. How to handle error messages.

## Installation

1. Clone this repository.
2. Navigate to the project directory

```bash
cd your-project-name
```

3. Install the required dependencies

```bash
npm install
```

## Environment Variables

Create a file named .env in the project root directory.
Add the following environment variables to the .env file, replacing the placeholders with your actual values

```bash
DATABASE_URL=mysql://user:password@host:port/database_name
```

```bash
JWT_SECRET=JWT_SECRET_KEY
```

## Connecting to the Database

The code uses Prisma to establish a connection to your MySQL database.
In your terminal, run the following command to apply initial migrations

```bash
npx prisma migrate dev --name init
```

## Running the Application

```bash
npm start
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

- Login User

```bash
curl --location 'http://localhost:8000/api/auth/login' \
--header 'Content-Type: application/json' \
--data-raw '{
"email" : "email@gmail.com",
"password" : "user-name"
}'
```

- User Activation
**Note:** You got the email of the verification code after signup the process, I'd like to remind you that the code has expired after one hour.
```bash
curl --location 'http://localhost:8000/api/auth/verification?code=45672' \
--header 'Authorization: Bearer Token'
```

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
