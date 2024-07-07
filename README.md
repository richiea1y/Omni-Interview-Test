# Omni Backend Test

This project is a backend API implementation for user authentication and management.

## Setup

1. Clone the repository
2. Install dependencies: `npm install`
3. Create a `.env` file in the root directory with the following content:

```
PORT=3000
MONGODB_URI=mongodb://localhost:27017/omni-backend-test
JWT_SECRET=your_jwt_secret
REFRESH_TOKEN_SECRET=your_refresh_token_secret
```

4. Run the development server: `npm run dev`

## Available Scripts

- `npm run dev`: Starts the development server
- `npm run build`: Builds the TypeScript files
- `npm start`: Starts the production server

## API Endpoints

- POST /api/register: Register a new user
- POST /api/login: Login a user
- POST /api/change-password: Change user password (requires authentication)
- POST /api/validate-refresh-token: Validate refresh token and issue new JWT
- GET /api/dummy-data: Get dummy data (requires authentication)

## Technologies Used

- Node.js
- Express.js
- TypeScript
- MongoDB with Mongoose
- JSON Web Tokens (JWT)
