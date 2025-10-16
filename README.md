# Clinician & Patient Portal

## Requirements
- **Node.js** v22+
- **Next.js** 15 (App Router)
- **Firebase** (Authentication)
- **Firestore** (Database)
- npm

## Features
- 🔐 Secure authentication with Email/Password and Google login.
- 👩‍⚕️ Role-based access for clinicians and patients.
- 🗂️ Real-time data storage with Firestore.
- 🧭 Protected routes using middleware and authentication context.
- 🌐 Modern UI with responsive design.
- ⚡ Fast local development and deployment.

## Setup
### Step 1: Clone the project
```bash
  git clone gitlink
```

### Step 2: Navigate to the project directory
```bash
   cd clinician-patient-portal
```

### Step 3: create .env file
```bach 
    touch .env
```

### Step 4: Add environment variables
- Copy the keys from .env.example and paste them into your .env file, then fill in the values.

### Step 5: Set up Firebase Authentication
- Go to Firebase Console:
- Enable Email/Password and Google sign-in providers.
- Add your authorized domains under Authentication settings.
### Step 6: Set up Firestore
- Create a collection named users_role.
- Add the following fields:
    - email (string)
    - role (string)
    - createdAt (timestamp)

## Running the Project

### Development
```bash
    npm install # install dependecie
    npm run dev
```
### Production Build
```bash
    npm run build
    npm start
```

## Folder Structure
```bash
    clinician-patient-portal
    ├── .idea/
    ├── .next/
    ├── node_modules/
    ├── public/
    ├── src/
    │   ├── app/
    │   │   ├── (auth)/
    │   │   ├── (protected)/
    │   │   ├── api/
    │   │   ├── favicon.ico
    │   │   ├── globals.css
    │   │   ├── layout.tsx
    │   │   └── page.tsx
    │   ├── components/
    │   ├── context/
    │   ├── hooks/
    │   ├── lib/
    │   ├── schema/
    │   └── types/
    ├── .env
    ├── .env.example
    ├── .gitignore
    ├── .prettierrc
    ├── components.json
    ├── next.config.ts
    ├── next-env.d.ts
    ├── package.json
    ├── package-lock.json
    ├── postcss.config.mjs
    └── README.md
```