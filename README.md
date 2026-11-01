# Productivity Tool – Full Auth Flask Backend

## Project Overview

The Productivity Tool is a full-stack task management application built with Flask and React. It allows users to create accounts, log in securely, and manage their personal tasks.

The backend uses JWT authentication to protect routes and ensure that users can only access and manage their own tasks.

## Technologies Used

### Backend
- Python
- Flask
- Flask-SQLAlchemy
- Flask-Migrate
- Flask-JWT-Extended
- Flask-Bcrypt
- SQLite

### Frontend
- React
- JavaScript
- Fetch API
- Browser Local Storage

## Features

- User registration and login
- Secure password hashing using Flask-Bcrypt
- JWT-based authentication
- Protected API endpoints
- Retrieve the currently authenticated user
- Create, read, update, and delete tasks
- Mark tasks as completed
- Task ownership and access control
- Pagination when retrieving tasks

## Project Structure

```text
flask-c10-summative-lab-sessions-and-jwt-clients/
│
├── server/
│   ├── app.py
│   ├── config.py
│   ├── extension.py
│   ├── models.py
│   ├── seed.py
│   ├── migrations/
│   ├── Pipfile
│   └── Pipfile.lock
│
└── client-with-jwt/
    └── src/
        ├── App.js
        ├── components/
        └── ...
```

## Database Models

### User

The User model stores registered users.

Fields:
- `id`: Primary key
- `username`: Unique username
- `password_hash`: Hashed user password

A user can have multiple tasks through a one-to-many relationship.

### Task

The Task model stores user tasks.

Fields:
- `id`: Primary key
- `title`: Task title
- `description`: Task description
- `completed`: Completion status
- `user_id`: Foreign key referencing the user who owns the task

## Authentication

The application uses JSON Web Tokens (JWT) for authentication.

- Users register through `/signup`.
- Users log in through `/login`.
- Successful authentication returns a JWT.
- Protected routes require a valid token in the Authorization header.
- The `/me` endpoint returns the currently authenticated user's information.

Include the token in protected requests:

```http
Authorization: Bearer YOUR_ACCESS_TOKEN
```

Passwords are hashed using Flask-Bcrypt before being stored in the database.

## API Endpoints

| Method | Endpoint | Description | Authentication |
|---|---|---|---|
| POST | `/signup` | Register a user | No |
| POST | `/login` | Log in a user | No |
| GET | `/me` | Get current user | Yes |
| GET | `/tasks` | Get all user's tasks | Yes |
| POST | `/tasks` | Create a task | Yes |
| GET | `/tasks/<id>` | Get one task | Yes |
| PATCH | `/tasks/<id>` | Update a task | Yes |
| DELETE | `/tasks/<id>` | Delete a task | Yes |

## Pagination

The tasks endpoint supports pagination using query parameters.

Example:

```http
GET /tasks?page=1&per_page=10
```

The response includes:
- `tasks`: Tasks on the requested page
- `total`: Total number of tasks
- `pages`: Total number of pages
- `current_page`: Current page number

## Backend Setup

### 1. Clone the repository

```bash
git clone https://github.com/josephinenjuguna-ship-it/flask-c10-summative-lab-sessions-and-jwt-clients.git
cd flask-c10-summative-lab-sessions-and-jwt-clients
```

### 2. Navigate to the server directory

```bash
cd server
```

### 3. Install dependencies

```bash
pipenv install
```

### 4. Set the JWT secret key

For local development:

```bash
export JWT_SECRET_KEY="my-development-secret-key-change-this"
```

### 5. Initialize and migrate the database

If migrations have already been created and committed, run:

```bash
pipenv run flask --app app db upgrade
```

### 6. Seed the database

```bash
pipenv run python seed.py
```

The seed file creates sample users and tasks for development.

### 7. Start the Flask server

```bash
pipenv run flask --app app run --debug --port 5555
```

The backend runs at:

`http://127.0.0.1:5555`

## Frontend Setup

Open a second terminal:

```bash
cd client-with-jwt
```

Install frontend dependencies:

```bash
npm install
```

Start the React application:

```bash
npm start
```

The frontend runs at:

`http://localhost:4000`

## Sample Seed Accounts

| Username | Password |
|---|---|
| josephine | password123 |
| john | password456 |

These accounts are for local development and testing only.

## Testing

The backend API can be tested using Thunder Client or another API testing tool.

Test the following:
- User registration
- User login
- Accessing `/me` with a valid JWT
- Creating tasks
- Retrieving tasks
- Updating tasks
- Marking tasks as completed
- Deleting tasks
- Pagination
- Accessing protected routes without a token
- Ensuring users cannot access another user's tasks

## Security

- Passwords are stored as hashes rather than plain-text values.
- JWT authentication protects private endpoints.
- Task queries are filtered by the authenticated user's ID.
- Users cannot manage tasks belonging to other users.
