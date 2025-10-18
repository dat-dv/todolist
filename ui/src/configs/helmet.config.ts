export const CONFIG_HELMET = {
  LOGIN: {
    TITLE: "Login - Todo List App",
    META: [
      {
        name: "description",
        content:
          "Sign in to manage your tasks and boost productivity with Todo List App.",
      },
      {
        name: "keywords",
        content: "login, sign in, todo list, task management",
      },
    ],
  },
  REGISTER: {
    TITLE: "Register - Todo List App",
    META: [
      {
        name: "description",
        content:
          "Create a free account to start organizing your tasks efficiently.",
      },
      {
        name: "keywords",
        content: "register, sign up, create account, todo list",
      },
    ],
  },
  HOME: {
    TITLE: "My Tasks - Todo List App",
    META: [
      {
        name: "description",
        content: "Organize, track, and complete your daily tasks with ease.",
      },
      {
        name: "keywords",
        content: "todo list, task manager, productivity, organize tasks",
      },
    ],
  },
  NOT_FOUND: {
    TITLE: "404 - Page Not Found",
    META: [
      {
        name: "description",
        content: "The page you are looking for does not exist.",
      },
      { name: "keywords", content: "404, page not found, error" },
    ],
  },
} as const;
