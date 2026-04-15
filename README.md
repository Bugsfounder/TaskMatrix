# TaskMatrix

TaskMatrix is a web-based project management application designed to help teams organize, track, and manage development workflows through an intuitive and interactive interface.

[Visit TaskMatrix Live](https://task-matrix-rho.vercel.app/)

**_Concept:_** A Jira/Asana clone for software teams.

- **Track:** Frontend
- **Tech Stack:** Next.js, Tailwind

## Core Features

1.  Kanban boards
2.  task assignment
3.  due dates
4.  priority tags
5.  team member roles
6.  real-time activity feed

## The UI Wireframes (Figma)

[Figma Design](https://www.figma.com/design/A2itwVql8JRmie0SOqiVGr/Untitled?node-id=0-1&t=CZE8OzSmh0NZHx9i-1)

### High-level structure:

```
store/
├── auth
├── user
├── projects
├── tasks
├── ui
├── filters
├── notifications
```

## Full State Tree (Detailed)

```
rootStore
│
├── auth
│   ├── isAuthenticated: boolean
│   ├── token: string | null
│   ├── loading: boolean
│
├── user
│   ├── id: string
│   ├── name: string
│   ├── email: string
│   ├── avatar: string
│
├── projects
│   ├── list: Project[]
│   ├── selectedProjectId: string | null
│   ├── loading: boolean
│
├── tasks
│   ├── byId: { [taskId]: Task }
│   ├── allIds: string[]
│   ├── loading: boolean
│
├── filters
│   ├── status: "todo" | "in_progress" | "done" | null
│   ├── priority: "low" | "medium" | "high" | null
│   ├── assignee: string | null
│   ├── searchQuery: string
│
├── ui
│   ├── sidebarOpen: boolean
│   ├── activeModal: "createTask" | "editTask" | null
│   ├── selectedTaskId: string | null
│
├── notifications
│   ├── list: Notification[]
│   ├── unreadCount: number
```

# 2. Example Type Definitions

```
Project {
  id: string
  name: string
  description: string
  createdAt: string
}

Task {
  id: string
  title: string
  description: string
  status: "todo" | "in_progress" | "done"
  priority: "low" | "medium" | "high"
  assigneeId: string
  projectId: string
  dueDate?: string
}
```

### Auth APIs

```
POST   /api/auth/login
POST   /api/auth/logout
GET    /api/auth/me
```

### User APIs

```
GET    /api/users/me
GET    /api/users/:id
```

### Project APIs

```
GET    /api/projects
POST   /api/projects
GET    /api/projects/:id
PUT    /api/projects/:id
DELETE /api/projects/:id
```

### Task APIs

```
GET    /api/tasks?projectId=123
POST   /api/tasks
PUT    /api/tasks/:id
DELETE /api/tasks/:id
PATCH  /api/tasks/:id/status
```

### Filter/Search APIs (optional mock)

```
GET /api/tasks/search?q=login
GET /api/tasks/filter?status=todo&priority=high
```

# Zustand

Split stores:

```
useAuthStore
useProjectStore
useTaskStore
useUIStore
```

Don’t create one giant store.
