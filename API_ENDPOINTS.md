# Health Insurance Portal API Endpoints

## Base URL
```
http://localhost:3000
```

## Swagger Documentation
```
http://localhost:3000/api
```

---

## 🔐 Authentication Endpoints

### Register User
**POST** `/users/register`

Register a new user with Aadhaar validation.

**Request Body:**
```json
{
  "email": "john@example.com",
  "password": "password123",
  "name": "John Doe",
  "aadhaar": "123456789012",
  "role": "customer"
}
```

**Response:** `201 Created`
```json
{
  "id": 1,
  "email": "john@example.com",
  "name": "John Doe",
  "aadhaar": "123456789012",
  "role": "customer",
  "createdAt": "2025-10-18T12:00:00.000Z",
  "updatedAt": "2025-10-18T12:00:00.000Z"
}
```

### Login User
**POST** `/users/login`

Authenticate user and get user details.

**Request Body:**
```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

**Response:** `200 OK`
```json
{
  "id": 1,
  "email": "john@example.com",
  "name": "John Doe",
  "aadhaar": "123456789012",
  "role": "customer"
}
```

---

## 📋 Policy Endpoints

### List All Policies
**GET** `/policies`

Get all active policies with their rules.

**Response:** `200 OK`
```json
[
  {
    "id": 1,
    "name": "Basic Health Cover",
    "description": "Comprehensive health insurance for individuals",
    "premium": 5000,
    "coverageAmount": 500000,
    "durationMonths": 12,
    "isActive": true,
    "rules": [...],
    "createdAt": "2025-10-18T12:00:00.000Z",
    "updatedAt": "2025-10-18T12:00:00.000Z"
  }
]
```

### Get Policy by ID
**GET** `/policies/:id`

Get detailed information about a specific policy.

**Response:** `200 OK`

### Create Policy (Admin)
**POST** `/policies`

Create a new insurance policy.

**Request Body:**
```json
{
  "name": "Basic Health Cover",
  "description": "Comprehensive health insurance",
  "premium": 5000,
  "coverageAmount": 500000,
  "durationMonths": 12,
  "isActive": true
}
```

**Response:** `201 Created`

### Update Policy (Admin)
**PATCH** `/policies/:id`

Update an existing policy.

**Response:** `200 OK`

### Delete Policy (Admin)
**DELETE** `/policies/:id`

Delete a policy.

**Response:** `200 OK`

---

## ⚙️ Rules Endpoints

### List All Rules
**GET** `/rules`

Get all policy rules.

**Query Parameters:**
- `policyId` (optional): Filter rules by policy ID

**Response:** `200 OK`
```json
[
  {
    "id": 1,
    "policyId": 1,
    "type": "eligibility",
    "name": "Age Limit",
    "description": "Applicant must be between 18 and 65",
    "criteria": {
      "minAge": 18,
      "maxAge": 65
    }
  }
]
```

### Get Rule by ID
**GET** `/rules/:id`

Get detailed information about a specific rule.

**Response:** `200 OK`

### Create Rule (Admin)
**POST** `/rules`

Create a new policy rule.

**Request Body:**
```json
{
  "policyId": 1,
  "type": "eligibility",
  "name": "Age Limit",
  "description": "Applicant must be between 18 and 65",
  "criteria": {
    "minAge": 18,
    "maxAge": 65
  }
}
```

**Response:** `201 Created`

### Update Rule (Admin)
**PATCH** `/rules/:id`

Update an existing rule.

**Response:** `200 OK`

### Delete Rule (Admin)
**DELETE** `/rules/:id`

Delete a rule.

**Response:** `200 OK`

---

## 📝 Application Endpoints

### List Applications
**GET** `/applications`

Get all policy applications.

**Query Parameters:**
- `userId` (optional): Filter applications by user ID

**Response:** `200 OK`
```json
[
  {
    "id": 1,
    "userId": 1,
    "policyId": 1,
    "aadhaar": "123456789012",
    "status": "pending",
    "notes": null,
    "user": {...},
    "policy": {...},
    "createdAt": "2025-10-18T12:00:00.000Z",
    "updatedAt": "2025-10-18T12:00:00.000Z"
  }
]
```

### Get Application by ID
**GET** `/applications/:id`

Get detailed information about a specific application.

**Response:** `200 OK`

### Submit Application
**POST** `/applications`

Submit a new policy application.

**Request Body:**
```json
{
  "userId": 1,
  "policyId": 1,
  "aadhaar": "123456789012"
}
```

**Response:** `201 Created`

### Update Application (Admin)
**PATCH** `/applications/:id`

Update application status.

**Request Body:**
```json
{
  "status": "approved",
  "notes": "Application approved after verification"
}
```

**Response:** `200 OK`

### Delete Application (Admin)
**DELETE** `/applications/:id`

Delete an application.

**Response:** `200 OK`

---

## 📊 Response Codes

- `200` - OK: Successful request
- `201` - Created: Resource successfully created
- `400` - Bad Request: Invalid input data
- `401` - Unauthorized: Invalid credentials
- `404` - Not Found: Resource not found
- `409` - Conflict: Resource already exists
- `500` - Internal Server Error: Server error

---

## 🔍 Sample Data

The system comes pre-seeded with:

### Policies
1. **Basic Health Cover** - ₹5,000/year, ₹5L coverage
2. **Family Health Plan** - ₹12,000/year, ₹10L coverage
3. **Senior Citizen Health Shield** - ₹8,000/year, ₹7.5L coverage
4. **Critical Illness Cover** - ₹15,000/year, ₹20L coverage

### Rules (8 total)
- Age limits
- Family size restrictions
- Claim limits
- Waiting periods
- Pre-existing conditions coverage

---

## 🛠️ Testing with cURL

### Register a user
```bash
curl -X POST http://localhost:3000/users/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "password123",
    "name": "Test User",
    "aadhaar": "123456789012"
  }'
```

### Get all policies
```bash
curl http://localhost:3000/policies
```

### Submit an application
```bash
curl -X POST http://localhost:3000/applications \
  -H "Content-Type: application/json" \
  -d '{
    "userId": 1,
    "policyId": 1,
    "aadhaar": "123456789012"
  }'
```

---

For interactive testing, visit the Swagger UI at http://localhost:3000/api
