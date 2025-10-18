<style>
/* Font styling */
body {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  line-height: 1.6;
  color: #333;
}

h1 {
  font-size: 28px;
  font-weight: 700;
  color: #1a1a1a;
  margin-bottom: 20px;
  border-bottom: 3px solid #0066cc;
  padding-bottom: 10px;
}

h2 {
  font-size: 22px;
  font-weight: 600;
  color: #2c3e50;
  margin-top: 30px;
  margin-bottom: 15px;
}

p, li {
  font-size: 11pt;
  color: #444;
}

strong {
  font-weight: 600;
  color: #000;
}

/* Table styling */
table {
  border-collapse: collapse;
  width: 100%;
  margin: 20px 0;
  font-size: 10pt;
}

table, th, td {
  border: 1px solid #ddd;
}

th {
  padding: 12px 10px;
  text-align: left;
  background-color: #f8f9fa;
  font-weight: 600;
  color: #2c3e50;
  font-size: 10pt;
}

td {
  padding: 10px;
  text-align: left;
  font-size: 10pt;
  color: #444;
}

tr:nth-child(even) {
  background-color: #fafafa;
}

tr:hover {
  background-color: #f5f5f5;
}

/* Links */
a {
  color: #0066cc;
  text-decoration: none;
}

a:hover {
  text-decoration: underline;
}

/* Code and preformatted text */
code {
  font-family: 'Courier New', Courier, monospace;
  background-color: #f4f4f4;
  padding: 2px 6px;
  border-radius: 3px;
  font-size: 9pt;
}

/* Horizontal rule */
hr {
  border: none;
  border-top: 1px solid #e0e0e0;
  margin: 20px 0;
}
</style>

# TodoList Application Report

**Author:** Đoàn Văn Đạt  
**Deployed at:** [https://todo.hidat.site](https://todo.hidat.site)  
**Swagger/API documentation:** [https://todo-api.hidat.site](https://todo-api.hidat.site)  
**GitHub:** [https://github.com/dat-dv/TodoList](https://github.com/dat-dv/TodoList)  
**Build Document:** [https://github.com/dat-dv/todolist/blob/master/readme.md](https://github.com/dat-dv/todolist/blob/master/readme.md)  
**BE Document:** [https://github.com/dat-dv/todolist/blob/master/api/readme.md](https://github.com/dat-dv/todolist/blob/master/api/readme.md)  
**FE Document:** [https://github.com/dat-dv/todolist/blob/master/ui/readme.md](https://github.com/dat-dv/todolist/blob/master/ui/readme.md)

## 1. Project Overview

TodoList is a fullstack web app for managing personal todos, letting users create, organize, and track tasks easily with a clean interface and RESTful API.

**Technology Stack**

- **Backend:** .NET 9 Web API, Entity Framework Core, MySQL
- **Frontend:** React 18, TypeScript, TailwindCSS, React Hook Form, Zod
- **Deployment:** Docker Compose

## 2. Core Features Implemented

| No. | Feature                    | Status | Description                                     |
| --- | -------------------------- | ------ | ----------------------------------------------- |
| 1   | Create Todo                | Done   | Add new tasks with validation (max 255 chars)   |
| 2   | Read Todos                 | Done   | Display all tasks with pagination               |
| 3   | Update Todo                | Done   | Inline edit with auto-resize textarea           |
| 4   | Delete Todo                | Done   | Remove task with confirmation modal             |
| 5   | Toggle Status              | Done   | Mark tasks as complete/incomplete               |
| 6   | User Registration & Login  | Done   | JWT authentication, password hashed with BCrypt |
| 7   | Protected Routes           | Done   | Authorization middleware for API endpoints      |
| 8   | Form Validation (Frontend) | Done   | React Hook Form + Zod schema validation         |
| 9   | Form Validation (Backend)  | Done   | FluentValidation for API request validation     |
| 10  | Responsive Design          | Done   | Mobile/Tablet/Desktop optimized                 |

<div style="page-break-after: always;"></div>

## 3. Additional Features & Pages

| No. | Feature/Page                         | Status | Description                                                                                        |
| --- | ------------------------------------ | ------ | -------------------------------------------------------------------------------------------------- |
| 1   | Login Screen                         | Done   | Simple login form with username & password fields; successful login redirects to To-Do List screen |
| 2   | To-Do List Screen                    | Done   | Displays tasks with checkbox, title, and actions to add, edit, delete tasks                        |
| 3   | Search, Filter & Sort                | Done   | Allows filtering by status and sorting by creation date                                            |
| 4   | Pagination                           | Done   | Customizable page size (5/10/20/50 items)                                                          |
| 5   | Real-time Character Counter          | Done   | Shows current input length for task titles with visual feedback                                    |
| 6   | Toast Notifications & Loading States | Done   | Provides feedback for async operations                                                             |
| 7   | Inline Editing                       | Done   | Auto-resizing textarea for editing tasks                                                           |
| 8   | RESTful API                          | Done   | Full CRUD API for third-party integration, documented via Swagger                                  |
| 9   | SWR Caching                          | Done   | Client-side data caching with automatic revalidation and optimistic updates                        |
| 10  | React Helmet                         | Done   | Dynamic meta tags and page titles for SEO optimization                                             |
| 11  | Error Handling (Frontend)            | Done   | Error boundaries and graceful error display                                                        |
| 12  | Error Handling (Backend)             | Done   | Global exception middleware with proper HTTP status codes                                          |

## 4. Planned / Unimplemented Features

| No. | Feature            | Priority | Description                                                                                     |
| --- | ------------------ | -------- | ----------------------------------------------------------------------------------------------- |
| 1   | Refresh Token      | High     | Currently only access tokens are implemented; refresh token rotation needed for better security |
| 2   | Admin Dashboard    | Medium   | Only view tasks as admin; full management panel not yet implemented                             |
| 3   | Email Verification | Medium   | Users cannot verify email addresses during registration                                         |
| 4   | Password Reset     | Medium   | "Forgot Password" functionality not yet implemented                                             |

<div style="page-break-after: always;"></div>

## Contact

- **Name:** Đoàn Văn Đạt
- **Email:** datdoan.dev@gmail.com
- **GitHub:** @dat-dv
