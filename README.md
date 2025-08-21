# UNI E‑Commerce

A modular e‑commerce scaffold for learning and building online stores. Includes a Node.js + MongoDB backend, a modern frontend, and tooling to run locally or in containers.

## Features

- Product catalog with categories, search and filtering
- Shopping cart and checkout flow
- User authentication (signup / login) with JWT
- Admin area for product and order management
- RESTful API for frontend-backend integration
- Dev tooling: seed/reset endpoints, linting, and basic tests
- Optional Docker support for local development

## Technologies

- Backend: Node.js, Express, Mongoose (MongoDB)
- Frontend: Reactjs, optional TypeScript, CSS framework (Tailwind)
- Auth: JWT, optional 2FA (TOTP)
- Persistence: MongoDB (local or hosted)
- Tooling: pnpm
- Payment integration along with Stripe (test mode)

## Requirements

- Node.js 16+ (recommended)
- npm or yarn or pnpm
- MongoDB

## Installation

Clone repositories

```bash
git clone git@github.com:Hammamjs/E-Commerce.git
cd /E-Commerce
```

Install dependencies

```bash
# Backend
git clone git@github.com:Hammamjs/E-Commerce-Backend.git
cd /E-Commerce-backend

# Frontend
cd ../E-Commerce
npm install
```

# Backend

cd ../E-Commerce-Backend
npm install

```

Create environment files

- backend/development.env (example)

```

--example

MONGO_URI="mongodb://localhost:27017/ecommerce"
JWT_SECRET="your_jwt_secret"
PORT=5000
NODE_ENV=development
ENABLE_2FA=false
OPTIMISTIC_UI=true
DEV_RESET_SECRET="dev-reset-secret"

````

- frontend/.env (example)
- when we using **Vite**
- create .env at the root of project
```
VITE_PUBLIC_STRIPE_KEY=djhdjhdjh (example) get you'r own public key from stripe
**Stripe** https://dashboard.stripe.com/

````

## Run locally

Start backend (development)

```bash
cd backend
npm run dev    # or npm start depending on scripts
```

Start E-Commerce

```bash
cd E-Commerce
npm start
```

## Usage examples

Frontend:

- Open the app at http://localhost:5173 (default)

API:

- Base API (example): http://localhost:3500/api/v1/
- Static API (example): http://localhost:3500 [to serve-image]

List products

```bash
curl http://localhost:3500/api/v1/products
```

Register user

```bash
curl -X POST http://localhost:3500/api/v1/auth \
  -H "Content-Type: application/json" \
  -d '{"name":"Test","email":"test@example.com","password":"password"}'
```

Development reset (dev-only, protected)

```bash
curl -X POST http://localhost:5000/api/dev/reset \
  -H "x-dev-secret: dev-reset-secret"
```

Note: The reset endpoint must be gated to NODE_ENV !== 'production' and require a secret header or token.

## Techniques & Recommendations (MongoDB + Node.js)

- Use Mongoose schemas and validation; keep controllers thin and services focused.
- Use connection retries and graceful shutdown for DB connections.
- Employ indexes and pagination for product lists; use projection to limit payloads.
- Use transactions (replica set) for multi-document operations (orders, inventory).
- Seed and reset scripts should be idempotent and gated to dev environments.

## Optimistic UI (frontend) [TODO]

- Apply optimistic updates for cart and wishlist operations to improve perceived performance.
- Mark items as "pending" until server confirms; rollback reliably on failure.
- Use local temporary IDs for pending operations to reconcile responses.

Suggested env toggle:

```
OPTIMISTIC_UI=true
```

## Enable 2FA (experimental) [TODO]

- 2FA (TOTP) is optional and disabled by default. Enable with:

```
ENABLE_2FA=true
TOTP_ISSUER="UNI E-Commerce"
```

- Flow: generate TOTP secret + QR during enrollment, confirm code, store encrypted/hashed secret and recovery codes, require TOTP after password on login if enabled.
- Security: store secrets encrypted, rate-limit verification, provide recover codes, and audit/log 2FA actions.

## Contributing

- Fork -> feature branch (feature/your-change) -> open PR.
- Follow existing code style and linting rules.
- Add tests for new logic where applicable.
- Keep commits focused and include a clear PR description.

## Testing & Linting

## Project structure (example)

- /backend — API, controllers, services, models, seed scripts
- /frontend — UI, components, state management
- /config — environment & deployment configs
- /scripts — helper and seed scripts
- /tests — unit / integration tests

## TODO (short, actionable)

- [ ] Implement /api/dev/reset (dev-only) with strict gating and seed scripts.
- [ ] Add unit and integration tests for auth, reset, and payment flows.
- [ ] Implement optimistic UI patterns for cart and wishlist (frontend work).
- [ ] Add frontend enrollment and verification UI for 2FA (TOTP).
- [ ] Store 2FA secrets securely and add recovery code flow.
- [ ] Add DB migrations or versioned seed scripts for reproducible dev/staging.
- [ ] Harden production settings: disable reset endpoints, enforce strong secrets, and audit 2FA before enabling in production.

## License

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction...

- Hammam Hussein
  -20/08/2025
