# Card Number Validation API

A RESTful API built with Node.js, Express, and TypeScript that validates credit and debit card numbers using the Luhn algorithm and card pattern detection.

---

## Tech Stack

- **Node.js** — Runtime environment
- **Express.js** — HTTP framework
- **TypeScript** — Strict type safety (`strict: true`)
- **Zod** — Input validation and schema parsing
- **express-rate-limit** — Rate limiting middleware
- **Jest + Supertest** — Unit and integration testing

---

## Project Structure

```
credit-card-validator/
├── src/
│   ├── constants/
│   │   └── cardPatterns.ts        # Card regex patterns and length rules
│   ├── controllers/
│   │   └── card.controller.ts     # Handles request and response
│   ├── middleware/
│   │   ├── errorHandler.ts        # Global error handler
│   │   └── rateLimiter.ts         # Rate limiting (10 req/min)
│   ├── routes/
│   │   └── card.routes.ts         # POST /api/v1/cards/validate
│   ├── services/
│   │   └── card.service.ts        # Luhn algorithm + card type detection
│   ├── types/
│   │   └── card.types.ts          # TypeScript interfaces and types
│   ├── validators/
│   │   └── card.validator.ts      # Zod input schema
│   ├── app.ts                     # Express app configuration
│   └── server.ts                  # Server entry point
├── tests/
│   ├── card.service.test.ts       # Unit tests
│   └── card.controller.test.ts    # Integration tests
├── .env.example
├── jest.config.js
├── tsconfig.json
└── package.json
```

---

## Getting Started

### Prerequisites

- Node.js v18 or higher
- npm v8 or higher

### Installation

**1. Clone the repository:**
```bash
git clone https://github.com/yourusername/card-validator.git
cd card-validator
```

**2. Install dependencies:**
```bash
npm install
```

**3. Set up environment variables:**
```bash
cp .env.example .env
```

Your `.env` file should contain:
```
PORT=3000
```

**4. Run the development server:**
```bash
npm run dev
```

You should see:
```
Server running on port 3000
```

---

## API Reference

### Validate a Card Number

**Endpoint:**
```
POST /api/v1/cards/validate
```

**Request Body:**
```json
{
  "cardNumber": "4111111111111111"
}
```

**Success Response (200):**
```json
{
  "valid": true,
  "cardType": "Visa",
  "message": "Card number is valid"
}
```

**Invalid Card Response (200):**
```json
{
  "valid": false,
  "cardType": "Visa",
  "message": "Card number is invalid"
}
```

**Bad Input Response (400):**
```json
{
  "valid": false,
  "cardType": "Unknown",
  "message": "Card number is required"
}
```

**Rate Limit Response (429):**
```json
{
  "valid": false,
  "cardType": "Unknown",
  "message": "Too many requests, please try again later"
}
```

---

## Supported Card Types

| Card Type  | Starts With               | Length     |
|------------|---------------------------|------------|
| Verve      | 5061, 6500, 6220, 6304    | 16, 18, 19 |
| Visa       | 4                         | 13, 16     |
| Mastercard | 51–55 or 22–27            | 16         |

> Card types not matching the above patterns will return `cardType: "Unknown"` but will still be validated against the Luhn algorithm.

---

## Validation Logic

The endpoint runs the following checks in order, failing fast at each step:

1. **Schema validation** — Zod checks the request body has a `cardNumber` string
2. **Sanitization** — Strips spaces and dashes from the input
3. **Digit check** — Rejects any non-numeric characters
4. **Card type detection** — Matches the number against known card patterns and lengths
5. **Luhn algorithm** — Runs the mathematical checksum to verify the number is valid

---

## Running Tests

```bash
npm test
```

Tests cover:
- Valid Visa and Mastercard numbers
- Invalid card numbers
- Missing and empty input
- Non-numeric characters
- Card numbers with spaces and dashes

---

## Available Scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Start development server with hot reload |
| `npm run build` | Compile TypeScript to JavaScript |
| `npm start` | Run compiled production build |
| `npm test` | Run all tests |

---

## Design Decisions

**Why Express over NestJS?**

**Why separate `app.ts` and `server.ts`?**
Separating the Express app configuration from the server startup means tests can import `app` directly without opening a real network port. This is the standard pattern for testable Express applications.

**Why focus on Verve, Visa and Mastercard?**
These are the three most widely used card networks in Nigeria. Focusing on the most relevant market context produces a cleaner, more purposeful implementation than including every card network globally.

**Why the Luhn algorithm?**
The Luhn algorithm is the industry standard checksum used by every major card network in the world. It provides a fast, offline, mathematical way to eliminate invalid card numbers without making any network calls. Pattern matching alone is not sufficient — a number can match the Visa pattern but still be invalid if it fails the Luhn checksum.

---

## Rate Limiting

The API is rate limited to **10 requests per 60 seconds** per IP address to prevent brute force enumeration of card numbers.

---

## Security Considerations

- Card numbers are never logged or stored
- Raw error messages are never exposed to the client
- All input is sanitized before processing
- HTTPS should be enforced in production
