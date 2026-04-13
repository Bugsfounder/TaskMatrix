export type Task = {
  id: string;
  title: string;
  description?: string;
  status: "todo" | "in-progress" | "done";
  priority?: "low" | "medium" | "high";
  assignedTo?: string;
  dueDate?: string;
  createdAt: string;
};

export type Column = {
  id: "todo" | "in-progress" | "done";
  title: string;
  taskIds: string[];
};

export type User = {
  id: string;
  name: string;
};