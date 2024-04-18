# Simple Authentication with Node.js, Express.js, Prisma ORM, and MySQL
This project demonstrates a simple authentication system built using Node.js, Express.js, Prisma ORM, MySQL, and JWT Token. It provides a solid foundation for building secure and scalable RESTful APIs.



```bash
Resgister

curl --location 'http://localhost:8000/api/auth/register' \
--header 'Content-Type: application/json' \
--data-raw '{
"email" : "email@gmail.com",
"password" : "password1122@",
"userName" : "user-name"
}'
```

## Login User

curl --location 'http://localhost:8000/api/auth/login' \
--header 'Content-Type: application/json' \
--data-raw '{
"email" : "email@gmail.com",
"password" : "user-name"
}'

## Get All User

curl --location 'http://localhost:8000/api/user' \
--header 'Authorization: Bearer Token'

## Delete All User

curl --location --request DELETE 'http://localhost:8000/api/user/all' \
--header 'Authorization: Bearer Token'
