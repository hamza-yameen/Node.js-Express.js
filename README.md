# Backend/API with Node.js, Express.js, Prisma ORM, and MySQL

The goal of this tutorial is to help you get a better understanding of Express.js. You can use it to build secure and scalable APIs.
It comes without structure so developers face many difficulties and are confused about what folder structure they should use. My best practice and experience made it simple for you.

**Note:** Let me know if you've found any other best practices that are better than mine. It's my goal to make it easier to use for everyone.

## Key Features

1. User Authentication And Authorization
2. Error Handling
3. Folder Structure
4. Email Verifications with Twilio SendGrid

## What you'll learn:

1. ### Understanding Node.js and Express.js:
   This project teaches you how to build APIs with Node.js and Express.js. Creating routes, controllers, handling HTTP requests, and managing middleware will be covered.

2. ### Prisma ORM with MySQL:
   With Prisma, you'll learn how to interact with databases. With Prisma, you can define data models and perform CRUD operations quickly.

3. ### JWT Authentication:
   Implementing JWT-based authentication will give you a common authentication mechanism for API endpoints. User sessions and authorization can be managed securely with JWTs.

4. ### Error Handling Best Practices:
   Make sure you catch and handle errors gracefully. It prevents crashes and gives users meaningful feedback.

5. ### Email Verifications with Twilio SendGrid:
   Implementation of Twilio SendGrid in node application, Sending Activation Emails, and User Activation Management


## Installation

1. Clone this repository.
2. Navigate to the projects directory

```bash
cd your-project-name
```

3. Install the required dependencies

```bash
npm install
```

## Environment Variables

Create a file named .env in the project root directory.
Add the following environment variables to the .env file, replacing the placeholders with your actual values.

## Connecting to the Database

The code uses Prisma to establish a connection to your MySQL database.
In your terminal, run the following command to apply initial migrations

```bash
npx prisma migrate dev --name init
```

## Run Seed Command

Open your terminal and navigate to the project directory.
```bash
npm run seed
```

## Running the Application

```bash
npm start
```
