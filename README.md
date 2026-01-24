# Placement Guidance Platform (Self‑Hosted)

A placement guidance and assessment platform designed to help colleges manage student placement readiness through quizzes, aptitude tests, analytics, and secure assessments.

The platform is fully self‑hosted and runs on institution‑owned servers, supporting role‑based access for Students, Training & Placement Officers (TPOs), and System Administrators.

---

## Project Objective

To provide colleges with a centralized system for:
- Conducting placement‑oriented assessments
- Tracking student performance and readiness
- Providing actionable analytics to TPOs
- Maintaining secure and auditable assessment records

The system is designed with scalability, security, and transparency as core principles.

---

## User Roles

### Student
- Login using college‑issued credentials
- Join assessments using unique access codes
- Attempt quizzes and aptitude tests
- View scores and attempt history

### Admin (TPO / Principal)
- Create and manage quizzes and aptitude tests
- Schedule assessments
- Monitor student participation
- View analytics and performance reports

### Super Admin
- Manage colleges and admins
- Monitor overall system usage
- Enforce system and data policies
- Access audit logs

---

## Key Features

- Placement‑oriented quiz and aptitude test engine
- College‑specific authentication
- Role‑based dashboards
- Unique access codes for assessments
- Performance analytics and reports
- Secure data handling and access control
- Optional monitored assessments

---

## High‑Level Architecture

Frontend (Next.js + React)  
→ Backend APIs (Node.js)  
→ PostgreSQL (Users, Quizzes, Results, Analytics)  
→ Local / Object Storage (Optional media)

---

## Technology Stack

### Frontend
- React (JavaScript)
- Next.js
- Tailwind CSS

### Backend
- Node.js
- Express / Next.js API routes

### Database
- PostgreSQL

### Storage (Optional)
- Local storage or self‑hosted object storage

---

## Analytics & Reporting

- Student‑wise performance tracking
- Quiz‑wise difficulty analysis
- Time‑based insights
- College‑level summaries
- Exportable reports for TPOs

---

## Security Model

- Role‑Based Access Control (RBAC)
- College‑level data isolation
- Secure authentication and authorization
- No public access to sensitive data
- Audit logging for admin actions

---

## Repository Structure

placement-guidance-platform/
├── frontend/
├── backend/
├── workers/
├── infra/
├── docs/
└── README.md

---

## Installation Guide

### Prerequisites
- Node.js v18+
- PostgreSQL v14+
- Git
- Docker (optional)

---

### Clone Repository

git clone https://github.com/your-org/placement-guidance-platform.git  
cd placement-guidance-platform

---

### Backend Setup

Create `backend/.env`:

PORT=5000  
DATABASE_URL=postgresql://user:password@localhost:5432/placement_guidance  
JWT_SECRET=your_secret_key  

Run backend:

cd backend  
npm install  
npm run dev  

Backend runs on http://localhost:5000

---

### Frontend Setup

Create `frontend/.env.local`:

NEXT_PUBLIC_API_BASE_URL=http://localhost:5000  

Run frontend:

cd frontend  
npm install  
npm run dev  

Frontend runs on http://localhost:3000

---

## Testing Checklist

- Student login and assessment attempt
- Admin quiz creation
- Result generation
- Analytics visibility
- Role‑based access validation

---

## Future Enhancements

- Coding assessments
- Resume management
- Company‑specific drives
- Interview scheduling
- Skill gap analysis
- Inter‑college benchmarking

---

## Final Note

This placement guidance platform is designed to be practical, scalable, and institution‑ready, focusing on real placement workflows and academic requirements.

---

## License

MIT License

---

## Contributors

Core Development Team  
Placement & Academic Domain Experts
