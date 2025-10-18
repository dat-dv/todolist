# 🚀 Todo List UI

A modern, responsive Todo List frontend built with React, TypeScript and Vite.  
Connects to a .NET Core backend API for user authentication and task management.

---

## ✨ Features

- ✅ Full CRUD for todos
- 🔐 JWT-protected routes (login / register)
- ✏️ Inline editing & task status toggles
- 📱 Mobile-first responsive design
- 🎨 Styled with Tailwind CSS
- 🚀 Vite for instant HMR & fast builds

---

## 📚 Project Structure

ui/
├── public/ # index.html, favicon, static assets
├── src/
│ ├── api/ # Axios & service functions
│ ├── assets/ # images, icons
│ ├── components/ # reusable UI components
│ ├── contexts/ # React Contexts (Auth, Toast)
│ ├── hooks/ # custom hooks
│ ├── layouts/ # layout components
│ ├── pages/ # route pages (Login, Tasks)
│ ├── routes/ # route definitions & guards
│ ├── types/ # TS types/interfaces
│ ├── utils/ # helpers
│ └── main.tsx # app entry
├── .env.example # sample env file
├── package.json
├── vite.config.ts
└── tailwind.config.js

---

## 🛠️ Tech Stack

- React 18 + TypeScript
- Vite (ESM)
- Tailwind CSS
- React Router v6
- React Hook Form + Zod
- SWR for data fetching
- Axios HTTP client
- React Toastify notifications

---

## 📋 Prerequisites

- Node.js ≥18, npm or yarn
- Backend API running and accessible
- Ports free: 5173 (dev), 80 or custom (prod)
