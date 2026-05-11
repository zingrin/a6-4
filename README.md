# SkillBridge Frontend

**Role-Based Tutor Booking Platform**

SkillBridge Frontend is a modern tutor booking platform built with **Next.js**, designed to provide a seamless experience for **students, tutors, and admins** through dedicated dashboards and protected role-based features.

The platform allows users to browse tutors, manage tutoring sessions, handle bookings, and monitor platform activities with a clean and responsive UI.

---

# Features

## Public Features

- Browse available tutors
- Search & filter tutors by category or subject
- View tutor profiles and details
- User registration & login
- Email verification system

---

## Student Features

- Book tutoring sessions
- View booking history
- Manage personal profile
- Leave tutor reviews
- Access student dashboard

---

## Tutor Features

- Create and update tutor profile
- Manage teaching availability
- View booked sessions
- Manage subjects and expertise
- Access tutor dashboard

---

## Admin Features

- Manage platform users
- Manage tutor categories & subjects
- Monitor all bookings
- Feature top tutors
- View platform analytics

---

# Tech Stack

- **Next.js**
- **React**
- **TypeScript**
- **Tailwind CSS**
- **Shadcn/ui**
- **Lucide React**
- **REST API Integration**

---

# User Roles

| Role    | Description                                                |
| ------- | ---------------------------------------------------------- |
| Student | Books tutors and manages sessions                          |
| Tutor   | Manages profile, availability, and tutoring sessions       |
| Admin   | Controls users, analytics, bookings, and platform settings |

Each role has its own protected dashboard and navigation system.

---

# Routes

## Public Routes

| Route           | Description        |
| --------------- | ------------------ |
| `/`             | Home page          |
| `/tutors`       | Browse tutors      |
| `/tutors/[id]`  | Tutor details      |
| `/login`        | Login page         |
| `/register`     | Registration page  |
| `/verify-email` | Email verification |

---

## Student Dashboard

| Route                 | Description        |
| --------------------- | ------------------ |
| `/dashboard`          | Student dashboard  |
| `/dashboard/profile`  | Student profile    |
| `/dashboard/bookings` | Booking management |

---

## Tutor Dashboard

| Route                 | Description             |
| --------------------- | ----------------------- |
| `/tutor/dashboard`    | Tutor dashboard         |
| `/tutor/profile`      | Tutor profile           |
| `/tutor/availability` | Availability management |

---

## Admin Dashboard

| Route               | Description           |
| ------------------- | --------------------- |
| `/admin/analytics`  | Platform analytics    |
| `/admin/users`      | User management       |
| `/admin/bookings`   | Booking management    |
| `/admin/categories` | Categories & subjects |
| `/admin/featured`   | Featured tutors       |

---

# Authentication & Authorization

## Authentication

- Email & password authentication
- Session-based login system
- Email verification before dashboard access

## Authorization

Role-based route protection ensures users only access permitted pages.

### Examples

- Students cannot access admin routes
- Tutors cannot access student dashboard routes
- Admins cannot access tutor/student dashboards

---

# Role-Based Navigation

Navigation menus are dynamically rendered based on authenticated user roles.

## Student Navigation

- Dashboard
- My Profile
- My Bookings

## Tutor Navigation

- Dashboard
- Profile
- Availability

## Admin Navigation

- Analytics
- Users
- Bookings
- Categories
- Featured Tutors

---

# UI & UX

- Fully responsive design
- Clean dashboard layouts
- Dynamic sidebar navigation
- Protected routes
- Modern UI using Shadcn/ui
- Mobile-friendly experience

---

# Installation & Setup

Clone the repository:

```bash
git clone <your-frontend-repo-url>
```

Navigate to the project:

```bash
cd skillbridge-frontend
```

Install dependencies:

```bash
npm install
```

Create a `.env.local` file:

```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

Run the development server:

```bash
npm run dev
```

Application URL:

```bash
http://localhost:3000
```

---

# Application Flow

## Student Workflow

1. Register account
2. Verify email
3. Browse tutors
4. View tutor details
5. Book tutoring sessions
6. Manage bookings
7. Leave reviews

---

## Tutor Workflow

1. Register account
2. Verify email
3. Create tutor profile
4. Set availability
5. Manage tutoring sessions
6. Update subjects & expertise

---

## Admin Workflow

1. Login as admin
2. Manage users
3. Manage categories & subjects
4. Monitor platform bookings
5. Feature tutors
6. Analyze platform activity

---

# Project Goals

- Build a scalable role-based learning platform
- Provide secure authentication and authorization
- Create a responsive and user-friendly dashboard experience
- Improve tutor discovery and booking management

---

# Developer

## Zingrin Moi Bawm

Full Stack Developer
Focused on building scalable and user-friendly web applications.
