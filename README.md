# AI-Powered Mock Interview Platform

An AI-powered mock interview platform designed to help users prepare for technical and behavioral interviews through realistic interview simulations, AI-generated questions, and instant feedback.

## Features

* Secure user authentication with Clerk
* AI-generated interview questions using Google Gemini AI
* Technical and behavioral  interview simulations
* Voice-based interaction support
* Interview history and performance tracking
* Responsive and modern user interface
* PostgreSQL database integration using Neon
* Scalable backend architecture with Next.js
* Real-time feedback generation
* Cloud deployment support with  Vercel
* ## Tech Stack

### Frontend

* Next.js 15
* React
* TypeScript
* Tailwind CSS
* Shadcn UI

### Backend

* Next.js Server Actions
* Drizzle ORM
* PostgreSQL (Neon)



### Authentication

* Clerk Authentication

### AI Integration

* Google Gemini AI

### Deployment

* Vercel

## Project Architecture

The application follows a modern full-stack architecture where the frontend and backend are integrated within the Next.js framework. Authentication is handled through Clerk, data persistence is managed using PostgreSQL and Drizzle ORM, and AI-powered interview generation is provided through Google Gemini.

## Core Functionalities

1. User Registration and Authentication
2. Interview Creation and Management
3. AI-Powered Question Generation
4. Interview Session Tracking
5. Feedback and Performance Analysis
6. Dashboard for Interview History
7. Voice Interaction Support

## Installation

```bash
git clone <repository-url>
cd AI-Powered-QandA
npm install
npm run dev
```

## Environment Variables

Create a `.env.local` file and configure:

```env
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=
DATABASE_URL=
NEXT_PUBLIC_GEMINI_API_KEY=
```

## Future Enhancements

* Advanced analytics dashboard
* Multiple interview difficulty levels
* Resume analysis integration
* Multi-language support
* AI-generated improvement recommendations

## Live Demo

Experience the application live:

**Demo URL:** https://ai-powered-qand-a-delta.vercel.app/

## Screenshots

Add screenshots of:

* Home Page
* Interview Creation Page
* AI Interview Session
* Feedback Dashboard
* User Profile

## Deployment

The application is deployed on Vercel and is accessible through the live demo URL above.

## Production Status

✅ Production Deployed

✅ Authentication Enabled

✅ Database Connected

✅ AI Integration Active

✅ Responsive Design

