```markdown
# Next.js Auth System with PostgreSQL (Neon), Prisma, and API Token

A secure authentication system built with Next.js, PostgreSQL (Neon serverless database), Prisma ORM, and JWT-based API token authentication.

## Features

- User registration (name, email, password)
- Secure password hashing (bcrypt)
- JWT-based authentication
- API token system for protected endpoints
- PostgreSQL database integration via Prisma
- Ready-to-use API routes

## Project Structure

```
/
├── app/
│   └── api/
│       ├── auth/
│       │   ├── signup/route.js
│       │   └── login/route.js
│       └── protected/route.js
├── prisma/
│   └── schema.prisma
├── .env
└── package.json
```

## Prerequisites

- Node.js v18+
- npm/yarn
- Neon PostgreSQL database account
- Basic understanding of Next.js and Prisma

## Setup Instructions

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/your-repo.git
   cd your-repo
   ```

2. **Install dependencies**
   ```bash
   npm install
   npm install prisma @prisma/client bcrypt jsonwebtoken
   ```

3. **Environment Variables (.env)**
   ```env
   DATABASE_URL="postgresql://user:password@neon-hostname:port/dbname"
   JWT_SECRET="your_jwt_secret_key_here"
   API_TOKEN_SECRET="your_api_token_secret_here"
   ```

4. **Initialize Prisma**
   ```bash
   npx prisma generate
   npx prisma migrate dev --name init
   ```

## Database Schema (Prisma)

```prisma
// prisma/schema.prisma
model User {
  id        Int     @id @default(autoincrement())
  name      String
  email     String  @unique
  password  String
  apiToken  String? @unique
}
```

## API Endpoints

### 1. Signup
- **POST** `/api/auth/signup`
- Request Body:
  ```json
  {
    "name": "John Doe",
    "email": "john@example.com",
    "password": "securePassword123"
  }
  ```

### 2. Login
- **POST** `/api/auth/login`
- Request Body:
  ```json
  {
    "email": "john@example.com",
    "password": "securePassword123"
  }
  ```
- Returns JWT token and API token

### 3. Protected Endpoint
- **GET** `/api/protected`
- Headers:
  ```
  Authorization: Bearer <JWT_TOKEN>
  API-Token: <API_TOKEN>
  ```

## Authentication Flow

1. **Signup**:
   - Creates user with hashed password
   - Generates unique API token
   - Returns JWT and API token

2. **Login**:
   - Verifies credentials
   - Returns new JWT and existing API token

3. **Protected Routes**:
   - Requires valid JWT in Authorization header
   - Requires valid API token in `API-Token` header

## Testing the API

1. **Signup**:
```bash
curl -X POST http://localhost:3000/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{"name":"Test User", "email":"test@example.com", "password":"password123"}'
```

2. **Login**:
```bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com", "password":"password123"}'
```

3. **Access Protected Route**:
```bash
curl http://localhost:3000/api/protected \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -H "API-Token: YOUR_API_TOKEN"
```

## Security Considerations

- Always use HTTPS in production
- Store sensitive data in environment variables
- Use strong JWT secrets
- Implement rate limiting
- Consider adding email verification
- Regularly rotate API tokens

## Deployment

1. Set up production database on Neon
2. Configure environment variables in deployment platform
3. Build and deploy:
   ```bash
   npm run build
   npm start
   ```

## Troubleshooting

- Ensure database connection string is correct
- Verify JWT and API token secrets match
- Check Prisma migrations are applied
- Validate CORS settings if accessing from different domains

## License

MIT License - see [LICENSE](LICENSE) for details

```

This README provides comprehensive documentation for your authentication system. Make sure to:

1. Replace placeholder values (database URL, secrets) with actual values
2. Implement proper error handling in your API routes
3. Add input validation for email/password fields
4. Consider adding rate limiting and CORS protection
5. Include proper password complexity requirements in production
