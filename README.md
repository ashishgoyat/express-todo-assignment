# Express Todo API

A simple Todo API built using Node.js, Express, and JSON file storage.  
This project demonstrates basic CRUD operations without using a database.

## Features
- Create, read, update, and delete todos
- Persistent storage using todos.json
- Automatically creates the file if it does not exist
- Handles empty or invalid JSON safely

## Run the Project
npm install express  
node index.js

Server runs at:  
http://localhost:3000

## API Endpoints
GET / → Get all todos  
POST /?a=Task → Add a todo  
PUT /?id=1&task=NewTask → Update a todo  
DELETE /?id=1 → Delete a todo

## Author
Ashish Goyat
