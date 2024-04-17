## Resgister User

curl --location 'http://localhost:8000/api/auth/register' \
--header 'Content-Type: application/json' \
--data-raw '{
"email" : "email@gmail.com",
"password" : "password1122@",
"userName" : "user-name"
}'

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
