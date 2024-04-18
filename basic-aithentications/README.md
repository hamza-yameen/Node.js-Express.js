# Simple Authentication with Node.js, Express.js, Prisma ORM, and MySQL
With this repo, you'll be able to see how the node.js/express.js project should be structured. This is a very basic authentication method using a JWT token. How to handle error messages.


## Register User

```bash
curl --location 'http://localhost:8000/api/auth/register' \
--header 'Content-Type: application/json' \
--data-raw '{
"email" : "email@gmail.com",
"password" : "password1122@",
"userName" : "user-name"
}'
```

## Login User

```bash
curl --location 'http://localhost:8000/api/auth/login' \
--header 'Content-Type: application/json' \
--data-raw '{
"email" : "email@gmail.com",
"password" : "user-name"
}'
```

## Get All User

```bash
curl --location 'http://localhost:8000/api/user' \
--header 'Authorization: Bearer Token'
```

## Delete All User
```bash
curl --location --request DELETE 'http://localhost:8000/api/user/all' \
--header 'Authorization: Bearer Token'
```
