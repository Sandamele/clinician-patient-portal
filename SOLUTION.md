## Design Description

The Clinician & Patient Portal is designed to provide a clean and intuitive user experience while supporting different user roles. The focus is on clarity, ease of use, and role-based navigation. Below is a breakdown of the main design elements and how they work together.

---

### 1. Authentication Flow

- **User Registration**  
  Users can register using **Email/Password** or **Google**.  
  During registration, the user chooses an account type:
  - **Patient**
  - **Clinician**

- **User Login**  
  Users can log in with the same methods (Email or Google).  
  Once logged in, the system checks their role and redirects them to the appropriate dashboard.

- **Role Switching**  
  Even though users register with one role, the **navigation bar allows switching between patient and clinician** if the account has access to both roles. This makes it easier for users like clinician-patients to use the platform without signing in twice.

---

### 2. Dashboard Layout

- **Patient Dashboard**  
  When logged in as a patient, the dashboard displays:
  - **Biometric Stats Cards**: Key health data such as heart rate, steps, or sleep.
  - **Line Chart**: A time-series chart showing biometric data trends over a selected time range (7, 14, or 30 days).
  - A clean and minimal interface helps users focus on their personal health metrics.

- **Clinician Dashboard**  
  When logged in as a clinician, the dashboard displays a simple header:

This is intentionally minimal in the MVP, leaving room for future expansion (e.g., patient summaries, upcoming appointments, or clinical alerts).

---

### 3. Navigation

- A **top navigation bar** is always visible.
- It includes:
- The user’s current role (Patient or Clinician)
- A role switcher to toggle between dashboards
- Links to other pages like AI Assistant, Patient Lookup (clinicians only), and Profile
- A sign-out option

This structure keeps the navigation consistent across roles while restricting access to certain pages based on permissions.

---

### 4. AI Assistant

- The **AI Assistant page** provides a chat-like interface where the user can ask questions.
- Responses are **mocked** and randomly generated from a set of predefined replies.
- This feature showcases the UI flow for future integration with a real AI service.

---

### 5. Patient Lookup

- This page is **only accessible to clinicians**.

---

### 6. Visual & Interaction Design

- **Cards & Charts**
- Cards are used to display quick data at a glance.
- Charts provide a clear visual of biometric trends, making it easier for patients to track progress.

- **Colors & Typography**
- A calm, clinical color palette (blue, gray, white) for trust and clarity.
- Clean sans-serif typography for readability.

- **Responsiveness**
- Works seamlessly on desktop and mobile.
- Navigation collapses on smaller screens while keeping essential functions accessible.

---

### 7. User Experience Principles

- **Role-based Personalization**  
  Different dashboards and page visibility depending on user role.

- **Clarity over Complexity**  
  The design favors a simple, structured layout so users can find what they need quickly.

- **Secure Access**  
  Patient Lookup and clinician-specific features are restricted to prevent unauthorized access.

- **Future-Friendly**  
  The AI Assistant and clinician dashboard are designed with expansion in mind, allowing for future integration with real data and workflows.

## Trade Off

- **Unit Testing** for
  Focus was placed on core feature stability rather than full test coverage. This speeds up development but increases the chance of regressions. More tests can be added as the project grows.

- **Limited SEO for Protected Pages**  
  Since most content is behind authentication, SEO wasn’t prioritized. This simplifies rendering but means protected routes won’t benefit from indexing or advanced server-side optimizations.

- **Simple UI Instead of Fully Custom Components**  
  A clean, minimal interface was chosen to accelerate development and keep maintenance low. This sacrifices some advanced UI patterns and deep customization options.

- **Limited Permission Logic**  
  Roles are managed mostly on the frontend and secured with Firestore rules. This works for basic access control but makes fine-grained permissions harder to enforce without a dedicated backend.

- **No Caching Layer**  
  Real-time data is read directly from Firestore without an extra caching layer. This simplifies the architecture and keeps data fresh but can increase read costs and slightly impact performance at scale.

- **Using npm Instead of pnpm**  
  npm was chosen as the package manager because it’s more widely used among developers. This makes onboarding easier but sacrifices some of pnpm’s advantages like faster installs and better disk space usage.
