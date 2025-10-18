# Todo List UI

A modern, responsive Todo List application built with React, TypeScript, and Tailwind CSS.

## Features

- ✅ Create, read, update, and delete todos
- 🔐 User authentication (login/register)
- ✏️ Inline editing of tasks
- ✔️ Mark tasks as complete/incomplete
- 📱 Fully responsive design
- 🎨 Clean UI with Tailwind CSS
- 🔒 Protected routes with authentication guards

## Tech Stack

- **React 18** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool
- **Tailwind CSS** - Styling
- **React Router** - Navigation
- **React Hook Form** - Form handling
- **Zod** - Schema validation
- **SWR** - Data fetching
- **Axios** - HTTP client
- **React Toastify** - Notifications

## Getting Started

### Project Structure

```
src/
├── components/
│   ├── atoms/         # Small reusable components
│   ├── molecules/     # Composite components
│   ├── organisms/     # Complex components
│   ├── page/          # Page components
│   └── layouts/       # Layout components
├── configs/           # Configuration files
├── hooks/             # Custom React hooks
├── routes/            # Route definitions
├── types/             # TypeScript types
└── utils/             # Utility functions
```

### Prerequisites

- Node.js 18+
- npm or yarn

### Quick start

```bash
npm install
npm run build
npm run start
```

### Build and run with Docker

```bash
# Build image
docker-compose up -d
# Access app at http://localhost:3000
```
