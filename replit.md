# Overview

Hala Care is a modern, multilingual medical center web application built with React and Express. The system provides comprehensive healthcare services including appointment booking, contact management, health articles, and complaint handling. It features a bilingual interface (English/Arabic) with RTL support, dark/light theme switching, and a responsive design using shadcn/ui components.

# User Preferences

Preferred communication style: Simple, everyday language.

# System Architecture

## Frontend Architecture
- **Framework**: React 18 with TypeScript using Vite as the build tool
- **Routing**: Wouter for client-side routing with pages for home, services, booking, articles, contact, and complaints
- **State Management**: React Context for theme and language state, TanStack Query for server state management
- **UI Components**: shadcn/ui component library with Radix UI primitives and Tailwind CSS for styling
- **Form Handling**: Formik with Yup validation schemas for form management and validation
- **Internationalization**: Custom context-based solution supporting English and Arabic with RTL layout support

## Backend Architecture
- **Runtime**: Node.js with Express.js framework
- **API Design**: RESTful API endpoints for appointments, contacts, and articles
- **Data Storage**: In-memory storage implementation with interfaces for future database integration
- **Development**: Hot module replacement with Vite integration in development mode
- **Error Handling**: Centralized error handling middleware with structured JSON responses

## Database Layer
- **ORM**: Drizzle ORM configured for PostgreSQL with schema definitions
- **Schema**: Defines tables for users, appointments, contacts, and articles with multilingual content support
- **Migrations**: Automated database migrations using Drizzle Kit
- **Connection**: Neon Database serverless PostgreSQL connection

## External Dependencies

- **Database**: Neon Database (serverless PostgreSQL) via `@neondatabase/serverless`
- **UI Framework**: shadcn/ui with Radix UI primitives for accessible components
- **Styling**: Tailwind CSS with custom design tokens and CSS variables
- **Icons**: Lucide React for consistent iconography
- **Fonts**: Google Fonts integration (Inter, Cairo, Tajawal) for multilingual typography
- **Development**: Replit-specific tooling for cloud development environment
- **Form Validation**: Yup for schema-based validation
- **Date Handling**: date-fns for date manipulation and formatting