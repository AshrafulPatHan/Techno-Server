# TechnoBloger-Server

This is the **server-side** application for the **TechnoBloger Website**, a platform for tech enthusiasts to explore, create, and manage blog posts. The backend is built with **Node.js** and **Express.js**, offering robust API endpoints to handle blog management, user authentication, and data storage.

---

## Features

- **RESTful API**:
  - CRUD operations for blog posts (Create, Read, Update, Delete).
  - User authentication and authorization (JWT-based).
  - Search and filter blog posts by category, author, or keywords.

- **Database**:
  - Uses **MongoDB** for scalable and flexible data storage.

- **Error Handling**:
  - Comprehensive error handling for smoother user experiences.

- **Secure Authentication**:
  - JSON Web Tokens (JWT) for secure user authentication and session management.

---

## Live Server

The live backend server is hosted and accessible at the following link:
Live Link: https://techno-server.up.railway.app
<br/>
[Live Tech Blog Server](https://techno-server.up.railway.app)

Use this URL to interact with the API in production.

---

## Technology Stack

- **Framework**: Node.js with Express.js
- **Database**: MongoDB (via Mongoose)
- **Authentication**: JWT (JSON Web Tokens)
- **Environment Variables**: dotenv
- **Validation**: Joi for input validation

---



## Installation

Follow these steps to run the server locally:

### 1. Clone the repository

```bash
git clone https://github.com/yourusername/tech-blog-server.git
cd tech-blog-server
