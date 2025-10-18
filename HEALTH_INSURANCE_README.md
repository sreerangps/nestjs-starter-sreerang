# Health Insurance Portal - Backend API

A comprehensive NestJS-based backend for managing health insurance policies, applications, and rules.

## Features

### 🔐 User Authentication
- User registration with Aadhaar validation
- Basic login system (ready for JWT/Aadhaar integration)
- Role-based access (Customer/Admin)

### 📋 Policy Management
- List all active policies with associated rules
- Admin CRUD operations for policies
- Policy details include premium, coverage, and duration

### ⚙️ Policy Rules
- Configurable eligibility and configuration rules
- Rules linked to specific policies
- Support for custom criteria (age limits, family size, etc.)

### 📝 Applications
- Users can apply for policies using Aadhaar
- Application status tracking (pending/approved/rejected)
- Filter applications by user

### 📚 API Documentation
- Interactive Swagger UI at `/api`
- Complete API documentation with examples
- Try-it-out functionality for all endpoints

## Tech Stack

- **Framework**: NestJS 11.x
- **Database**: TypeORM with SQLite (dev)
- **Validation**: class-validator & class-transformer
- **Documentation**: Swagger/OpenAPI
- **Authentication**: bcrypt for password hashing

## Getting Started

### Prerequisites

- Node.js >= 20.0.0
- npm >= 10.0.0

### Installation

```bash
npm install
```

### Database Setup

The database is automatically created and seeded with sample data on first run. Sample data includes:

- 4 pre-configured health insurance policies
- 8 associated rules (eligibility and configuration)

### Running the Application

```bash
# Development mode with hot-reload
npm run start:dev

# Production mode
npm run build
npm run start:prod
```

The application will be available at:
- **API**: http://localhost:3000
- **Swagger Documentation**: http://localhost:3000/api

## API Overview

### Users (`/users`)
- `POST /users/register` - Register a new user
- `POST /users/login` - Login user

### Policies (`/policies`)
- `GET /policies` - List all active policies
- `GET /policies/:id` - Get policy details
- `POST /policies` - Create policy (Admin)
- `PATCH /policies/:id` - Update policy (Admin)
- `DELETE /policies/:id` - Delete policy (Admin)

### Rules (`/rules`)
- `GET /rules` - List all rules (optional filter by policyId)
- `GET /rules/:id` - Get rule details
- `POST /rules` - Create rule (Admin)
- `PATCH /rules/:id` - Update rule (Admin)
- `DELETE /rules/:id` - Delete rule (Admin)

### Applications (`/applications`)
- `GET /applications` - List applications (optional filter by userId)
- `GET /applications/:id` - Get application details
- `POST /applications` - Submit policy application
- `PATCH /applications/:id` - Update application status (Admin)
- `DELETE /applications/:id` - Delete application (Admin)

## Sample Data

The system comes pre-seeded with the following policies:

1. **Basic Health Cover** - ₹5,000/year premium, ₹5L coverage
2. **Family Health Plan** - ₹12,000/year premium, ₹10L coverage
3. **Senior Citizen Health Shield** - ₹8,000/year premium, ₹7.5L coverage
4. **Critical Illness Cover** - ₹15,000/year premium, ₹20L coverage

Each policy has associated eligibility and configuration rules.

## Testing

```bash
# Unit tests
npm run test

# E2E tests
npm run test:e2e

# Test coverage
npm run test:cov
```

## Code Quality

```bash
# Linting
npm run lint

# Format code
npm run format
```

## Development

The application is modular and follows NestJS best practices:

```
src/
├── applications/     # Policy applications module
├── database/         # Database config and seeder
├── policies/         # Policies module
├── rules/            # Policy rules module
└── users/            # User authentication module
```

## Future Enhancements

This foundation is ready for:

- ✅ JWT-based authentication
- ✅ Aadhaar API integration
- ✅ Advanced rule engine
- ✅ Claims processing module
- ✅ Microservices architecture
- ✅ Payment gateway integration
- ✅ Notification system

## Database

The SQLite database (`health-insurance.db`) is created automatically. In production, you can easily switch to PostgreSQL/MySQL by updating the TypeORM configuration in `src/database/database.module.ts`.

## License

MIT
