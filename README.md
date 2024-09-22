# Aesthetic Clinic Management System

This project is a **specialized management solution** designed for aesthetic clinics, emphasizing core functions such as **inventory management**, **client and supplier management**, **services**, **procedures**, and **purchases**. While it shares similarities with traditional ERP (Enterprise Resource Planning) systems, it is more accurately described as a **vertical solution** crafted specifically for the aesthetic industry, offering a streamlined and focused set of features.

## Tech Stack

### Frontend
- **React** with **TypeScript** for robust and scalable component-based development
- **Next.js 14** to leverage server-side rendering and static site generation
- **NextUI** for sleek, customizable UI components
- **React Hook Form** for efficient and flexible form handling
- **Zod** for schema-based data validation

### Backend
- **Next.js 14** (monolithic architecture) handling both frontend and backend responsibilities
- **Prisma ORM** for seamless database interactions and migrations
- **PostgreSQL** as the reliable relational database engine

### Architecture
- **Monolithic** approach with the possibility of transitioning to a microservices structure
- **Server Actions** for direct communication between frontend and backend operations
- **Layered Architecture** for maintainability and scalability:
  - **Actions**: Manages form submissions and user interactions
  - **Services**: Encapsulates business logic and workflow
  - **Repositories**: Handles data persistence using Prisma

## Features

- **Inventory Management** to monitor and manage products and supplies for procedures.
- **Client and Supplier Registration** for centralized management of all key contacts.
- **Service and Procedure Management** to create, organize, and track clinic services.
- **Purchase Management** to streamline procurement processes and stock control.

## Future Roadmap

The system is designed with scalability in mind, allowing for future expansions into areas such as **finance**, **human resources**, and **accounting**, evolving towards a full ERP system. Currently, it serves as a powerful, specialized tool that caters to the specific operational needs of aesthetic clinics, with potential for broader industry applications.
