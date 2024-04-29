# Simple Authentication with Node.js, Express.js, Prisma ORM, and MySQL

With this repo, you'll be able to see how the node.js/express.js project should be structured. This is the authentication system using JWT tokens and Twilio SendGrid.

## What you'll learn:

1. ### Error Handling:
   Learn robust techniques for managing errors and providing informative messages to the user

2. ### Response Management:
   Discover methods for crafting clear and consistent API responses, potentially using a generic method for efficient code.

3. ### JWT Authentication:
   Implementing JWT-based authentication will give you a common authentication mechanism for API endpoints. User sessions and authorization 
   can be managed securely with JWTs.

4. ### User Activation System with Database:
   Implement a secure user activation system that leverages a database to store user information and activation status.

5. ### Email Verifications with Twilio SendGrid:
   Explore techniques for sending activation emails or other notifications using a service like Twilio SendGrid (consider adding this 
   detail if sending emails is a core feature)


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

```bash
curl --location 'http://localhost:8000/api/auth/verification?code=45672' \
--header 'Authorization: Bearer Token'
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
