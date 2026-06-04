# SkillBridge Frontend 

**Role-Based Tutor Booking Platform UI**

## Project Overview

SkillBridge Frontend is the client-side application for the SkillBridge tutor booking platform.
It provides a role-based dashboard experience for **students, tutors, and admins**, along with public pages for browsing tutors and viewing profiles.

The frontend handles:

* User authentication & email verification
* Role-based navigation
* Protected routes
* Tutor browsing and booking UI
* Admin management dashboards

---

## Tech Stack

* **Next.js**
* **React**
* **TypeScript**
* **Tailwind CSS**
* **Shadcn/ui**
* **Lucide Icons**
* **REST API integration with backend**

---

## User Roles

The frontend supports three user roles:

| Role    | Description                                       |
| ------- | ------------------------------------------------- |
| Student | Books tutoring sessions and manages bookings      |
| Tutor   | Manages profile, availability, and sessions       |
| Admin   | Manages platform users, categories, and analytics |

Each role sees a **different dashboard and navigation menu**.

---

## Public Routes

| Route            | Description        |
| ---------------- | ------------------ |
| /                | Home page          |
| /tutors          | Browse tutors      |
| /tutors/:tutorId | Tutor details page |
| /login           | Login              |
| /register        | Registration       |
| /verify-email    | Email verification |

---

## Student Dashboard Routes

Accessible only when logged in as **Student**:

| Route               | Description       |
| ------------------- | ----------------- |
| /dashboard          | Student dashboard |
| /dashboard/profile  | Manage profile    |
| /dashboard/bookings | View bookings     |

---

## Tutor Dashboard Routes

Accessible only when logged in as **Tutor**:

| Route               | Description              |
| ------------------- | ------------------------ |
| /tutor/dashboard    | Tutor dashboard          |
| /tutor/profile      | Tutor profile management |
| /tutor/availability | Availability management  |

---

## Admin Dashboard Routes

Accessible only when logged in as **Admin**:

| Route             | Description                   |
| ----------------- | ----------------------------- |
| /admin/analytics  | Platform analytics            |
| /admin/users      | User management               |
| /admin/bookings   | All bookings                  |
| /admin/categories | Category & subject management |
| /admin/featured   | Featured tutors               |

---

## Authentication & Authorization

### Authentication

* Email & password login
* Session-based authentication
* Email verification required before accessing dashboards

### Authorization

* Role-based access control implemented on frontend
* Users are redirected if they try to access unauthorized routes

Example:

* Student cannot access `/admin/*`
* Tutor cannot access `/dashboard/*`
* Admin cannot access student or tutor dashboards

---

## Role-Based Navigation

Navigation menus are rendered dynamically based on role.

### Student Navigation

* Dashboard
* My Profile
* My Bookings

### Tutor Navigation

* Dashboard
* Profile
* Availability

### Admin Navigation

* Analytics
* User Management
* All Bookings
* Categories & Subjects
* Featured Tutors

---

## Features

### Public

* View tutors
* Search and filter tutors
* View tutor profiles

### Student

* Book sessions
* View booking history
* Manage profile
* Leave reviews

### Tutor

* Create and update profile
* Manage availability
* View sessions and reviews

### Admin

* Manage users
* Manage categories & subjects
* View platform analytics
* Feature tutors

---

## UI Behavior

* Responsive layout
* Role-based sidebar navigation
* Protected routes
* Server-side session validation
* Clean dashboard layout for all roles

---

## Installation & Setup

```bash
git clone <your-frontend-repo-url>
cd skillbridge-frontend
npm install
```

Create `.env.local`:

```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

Run development server:

```bash
npm run dev
```

App will run on:

```
http://localhost:3000
```

---

##  Application Flow

### Student Flow

1. Register and verify email
2. Browse tutors
3. View tutor profile
4. Book session
5. Manage bookings
6. Leave review

### Tutor Flow

1. Register and verify email
2. Create tutor profile
3. Set availability
4. View sessions
5. Manage subjects

### Admin Flow

1. Login as admin
2. Manage users
3. Manage categories
4. Monitor bookings
5. Feature tutors


---

## 👨‍💻 Author

**Ahsanul Haque**
Full Stack Developer
`www.ahsanul.dev`

---
