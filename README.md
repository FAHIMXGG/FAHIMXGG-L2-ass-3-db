📚 Library Management System API
This project implements a RESTful API for a Library Management System, built with Express, TypeScript, and MongoDB (via Mongoose). It provides functionalities for managing books and handling borrowing records, incorporating robust data validation, business logic, and advanced database operations like aggregation.

🎯 Objective
The primary objective is to develop a backend API for a Library Management System, focusing on:

Efficient management of book inventory.

Tracking of borrowed books.

Enforcement of business rules (e.g., book availability).

Use of modern web development practices with TypeScript.

Demonstration of Mongoose features like schema validation, static/instance methods, and middleware.

Leveraging MongoDB's aggregation pipeline for reporting.

✨ Features
Book Management:

Create, retrieve (all, by ID), update, and delete books.

Filtering and sorting capabilities for book listings.

Borrowing System:

Record book borrowing transactions.

Business logic to ensure book availability before borrowing.

Automatic update of book availability status based on copies count.

Data Validation: Strict schema validation for all incoming data using Mongoose.

Business Logic Enforcement: Examples include available status updates and quantity checks during borrowing.

Mongoose Advanced Features:

Schema Validation: Defined directly in models (required, enum, min, unique).

Middleware (Pre-Save Hook): Automatically updates book available status before saving based on copies.

Instance Method: checkAndUpdateAvailability on the Book model to programmatically update availability.

Aggregation Pipeline: A dedicated endpoint to summarize borrowed books, demonstrating MongoDB's powerful aggregation framework.

Error Handling: Centralized global error handling for consistent and informative error responses (validation errors, duplicate keys, 404s, etc.).

🚀 Technology Stack
Backend Framework: Express.js

Language: TypeScript

Database: MongoDB

ODM (Object Data Modeling): Mongoose

Environment Variables: Dotenv

CORS: CORS middleware

📂 Project Structure
The project is organized into a modular and scalable structure:
```tree

├── src
│   ├── app.ts                 # Express application setup and middleware
│   ├── server.ts              # Entry point to start the server and connect to DB
│   ├── config
│   │   └── db.ts              # Database connection configuration
│   ├── controllers
│   │   ├── book.controller.ts # Handlers for book-related API logic
│   │   └── borrow.controller.ts # Handlers for borrow-related API logic
│   ├── middlewares
│   │   └── globalErrorHandler.ts # Centralized error handling middleware
│   ├── models
│   │   ├── Book.ts            # Mongoose schema and model for books
│   │   └── Borrow.ts          # Mongoose schema and model for borrowing
│   ├── routes
│   │   ├── book.routes.ts     # Express routes for book endpoints
│   │   ├── borrow.routes.ts   # Express routes for borrow endpoints
│   │   └── index.ts           # Centralizes all API route registrations
│   └── utils
│       ├── apiResponse.ts     # Utility for consistent API response formatting
│       └── catchAsync.ts      # Utility to wrap async controllers for error handling
├── .env                       # Environment variables (e.g., MongoDB URI, Port)
├── package.json               # Project dependencies and scripts
├── tsconfig.json              # TypeScript compiler configuration
├── .gitignore                 # Files and directories to ignore in Git
```

🛠️ Setup Instructions
Follow these steps to get the project up and running on your local machine:

1. Clone the Repository
git clone <your-repository-link>
cd <your-project-directory>

2. Install Dependencies
Install all required Node.js packages:

npm install

3. Environment Variables
Create a .env file in the root of your project directory and add the following environment variables:

MONGO_URI=mongodb://localhost:27017/libraryDB
PORT=3000

Replace mongodb://localhost:27017/libraryDB with your actual MongoDB connection string. If you're using MongoDB Atlas, copy your connection string from there.

You can change the PORT to your desired port number.

4. Run the Application
Development Mode (with hot-reloading)
npm run dev

The server will start on the specified port (default: http://localhost:3000). ts-node-dev will automatically restart the server on code changes.

Production Build & Start
First, build the TypeScript project:

npm run build

Then, start the compiled JavaScript application:

npm start

🔌 API Endpoints
All API endpoints are prefixed with /api.

1. Create Book
URL: /api/books

Method: POST

Description: Creates a new book record.

Request Body (JSON):
```json
{
  "title": "The Theory of Everything",
  "author": "Stephen Hawking",
  "genre": "SCIENCE",
  "isbn": "9780553380163",
  "description": "An overview of cosmology and black holes.",
  "copies": 5,
  "available": true
}

Success Response (201 Created):

{
  "success": true,
  "message": "Book created successfully",
  "data": {
    "_id": "64f123abc4567890def12345",
    "title": "The Theory of Everything",
    "author": "Stephen Hawking",
    "genre": "SCIENCE",
    "isbn": "9780553380163",
    "description": "An overview of cosmology and black holes.",
    "copies": 5,
    "available": true,
    "createdAt": "2024-11-19T10:23:45.123Z",
    "updatedAt": "2024-11-19T10:23:45.123Z"
  }
}
```
2. Get All Books
URL: /api/books

Method: GET

Description: Retrieves a list of all books. Supports filtering, sorting, and limiting.

Query Parameters:

filter (optional): Filter by genre (e.g., FICTION, SCIENCE). Case-insensitive.

sortBy (optional): Field to sort by (e.g., createdAt, title).

sort (optional): Sort order (asc or desc). Defaults to desc for createdAt if no sortBy is specified.

limit (optional): Number of results to return (default: 10). Use a large number like limit=1000 to retrieve all available data.

Example Query: /api/books?filter=FANTASY&sortBy=createdAt&sort=desc&limit=5

Success Response (200 OK):
```json
{
  "success": true,
  "message": "Books retrieved successfully",
  "data": [
    {
      "_id": "64f123abc4567890def12345",
      "title": "The Theory of Everything",
      "author": "Stephen Hawking",
      "genre": "SCIENCE",
      "isbn": "9780553380163",
      "description": "An overview of cosmology and black holes.",
      "copies": 5,
      "available": true,
      "createdAt": "2024-11-19T10:23:45.123Z",
      "updatedAt": "2024-11-19T10:23:45.123Z"
    },
    { /* ... more book objects ... */ }
  ]
}
```
3. Get Book by ID
URL: /api/books/:bookId

Method: GET

Description: Retrieves a single book by its unique ID.

URL Parameters:

bookId (string): The MongoDB _id of the book.

Success Response (200 OK):
```json
{
  "success": true,
  "message": "Book retrieved successfully",
  "data": {
    "_id": "64f123abc4567890def12345",
    "title": "The Theory of Everything",
    "author": "Stephen Hawking",
    "genre": "SCIENCE",
    "isbn": "9780553380163",
    "description": "An overview of cosmology and black holes.",
    "copies": 5,
    "available": true,
    "createdAt": "2024-11-19T10:23:45.123Z",
    "updatedAt": "2024-11-19T10:23:45.123Z"
  }
}
```
Error Response (404 Not Found): If bookId is not found.

4. Update Book
URL: /api/books/:bookId

Method: PUT

Description: Updates an existing book record by its ID. Partial updates are supported.

URL Parameters:

bookId (string): The MongoDB _id of the book to update.

Request Body (JSON):

{
  "copies": 50
}

(You can update any valid field(s) here.)

Success Response (200 OK):
```json
{
  "success": true,
  "message": "Book updated successfully",
  "data": {
    "_id": "64f123abc4567890def12345",
    "title": "The Theory of Everything",
    "author": "Stephen Hawking",
    "genre": "SCIENCE",
    "isbn": "9780553380163",
    "description": "An overview of cosmology and black holes.",
    "copies": 50,
    "available": true,
    "createdAt": "2024-11-19T10:23:45.123Z",
    "updatedAt": "2024-11-20T08:30:00.000Z"
  }
}
```
Error Response (404 Not Found): If bookId is not found.

Error Response (400 Bad Request): If validation fails for updated fields.

5. Delete Book
URL: /api/books/:bookId

Method: DELETE

Description: Deletes a book record by its ID.

URL Parameters:

bookId (string): The MongoDB _id of the book to delete.

Success Response (200 OK):
```json
{
  "success": true,
  "message": "Book deleted successfully",
  "data": null
}
```
Error Response (404 Not Found): If bookId is not found.

6. Borrow a Book
URL: /api/borrow

Method: POST

Description: Records a book borrowing transaction. Includes business logic to check availability and deduct copies.

Business Logic:

Verifies the book exists and has enough available copies.

Deducts the requested quantity from the book’s copies.

If copies becomes 0, the book's available status is updated to false.

Saves the borrow record.

Request Body (JSON):
```json
{
  "book": "64ab3f9e2a4b5c6d7e8f9012",
  "quantity": 2,
  "dueDate": "2025-07-18T00:00:00.000Z"
}
```
Success Response (201 Created):
```json
{
  "success": true,
  "message": "Book borrowed successfully",
  "data": {
    "_id": "64bc4a0f9e1c2d3f4b5a6789",
    "book": "64ab3f9e2a4b5c6d7e8f9012",
    "quantity": 2,
    "dueDate": "2025-07-18T00:00:00.000Z",
    "createdAt": "2025-06-18T07:12:15.123Z",
    "updatedAt": "2025-06-18T07:12:15.123Z"
  }
}
```
Error Responses:

400 Bad Request: Invalid Book ID, quantity less than 1, or due date not in the future.

404 Not Found: Book with the provided ID does not exist.

400 Bad Request: Not enough copies available.

7. Borrowed Books Summary
URL: /api/borrow

Method: GET

Description: Returns a summary of borrowed books using a MongoDB aggregation pipeline.

Details:

Groups borrow records by book.

Calculates the total borrowed quantity per book.

Includes book details (title and isbn) from the Book collection.

Success Response (200 OK):
```json
{
  "success": true,
  "message": "Borrowed books summary retrieved successfully",
  "data": [
    {
      "book": {
        "title": "The Theory of Everything",
        "isbn": "9780553380163"
      },
      "totalQuantity": 5
    },
    {
      "book": {
        "title": "1984",
        "isbn": "9780451524935"
      },
      "totalQuantity": 3
    }
  ]
}
```
⚠️ Generic Error Response
For all error conditions, the API returns a consistent error structure:
```json
{
  "message": "A brief error message explaining what went wrong.",
  "success": false,
  "error": {
    "name": "ErrorType",
    "details": "Specific error details or message"
  }
}
```
Example: Validation Error
```json
{
  "message": "Validation failed",
  "success": false,
  "error": {
    "name": "ValidationError",
    "errors": {
      "copies": {
        "name": "ValidatorError",
        "message": "Copies must be a positive number",
        "properties": {
          "message": "Copies must be a positive number",
          "type": "min",
          "min": 0
        },
        "kind": "min"
      }
    }
  }
}
```
🌐 Deployment
This application is configured for easy deployment on Vercel.

Steps for Vercel Deployment:
vercel.json: Ensure you have a vercel.json file in your project root configured as described in the deployment instructions provided previously.

Environment Variables: Set your MONGO_URI as an environment variable in your Vercel project settings (Dashboard -> Project -> Settings -> Environment Variables).

Git Integration: Connect your GitHub/GitLab/Bitbucket repository to Vercel. Vercel will automatically detect your project setup and deploy it upon pushes to the configured branch.

Vercel CLI: Alternatively, use the Vercel CLI (vercel deploy) from your project root.

✅ Code Quality & Best Practices
Clean and Readable Code: Emphasizes meaningful variable/function names and clear logic.

Modular Structure: Separation of concerns (models, controllers, routes, middleware, utils) for maintainability.

Asynchronous Error Handling: catchAsync utility centralizes error catching for async route handlers.

Consistent API Responses: apiResponse utility ensures uniform success and error payloads.

TypeScript: Strong typing throughout the application for improved code quality and reduced runtime errors.