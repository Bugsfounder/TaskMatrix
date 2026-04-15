import React from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Calendar, MessageSquare, MoreHorizontal } from "lucide-react";

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

interface TaskCardProps {
  task: Task;
}

const priorityConfig = {
  low: { dot: "bg-blue-400", bg: "bg-blue-50 text-blue-700 border-blue-100" },
  medium: { dot: "bg-amber-400", bg: "bg-amber-50 text-amber-700 border-amber-100" },
  high: { dot: "bg-rose-400", bg: "bg-rose-50 text-rose-700 border-rose-100" },
};

export const TaskCard: React.FC<TaskCardProps> = ({ task }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: task.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const priorityStyle = task.priority ? priorityConfig[task.priority] : null;

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className={`group relative flex flex-col rounded-2xl border border-border bg-card p-4 shadow-soft transition-all hover:shadow-card hover:border-primary/20 ${
        isDragging ? "z-50 opacity-0" : "opacity-100 cursor-grab active:cursor-grabbing"
      }`}
    >
      <div className="flex items-start justify-between gap-3">
        <h3 className="text-sm font-bold tracking-tight text-foreground leading-snug group-hover:text-primary transition-colors">
          {task.title}
        </h3>
        <button className="h-6 w-6 flex items-center justify-center rounded-md text-muted-foreground opacity-0 group-hover:opacity-100 hover:bg-secondary transition-all">
          <MoreHorizontal className="h-4 w-4" />
        </button>
      </div>

      {task.description && (
        <p className="mt-2 line-clamp-2 text-xs font-medium text-muted-foreground leading-relaxed">
          {task.description}
        </p>
      )}

      <div className="mt-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="h-7 w-7 rounded-lg bg-secondary flex items-center justify-center text-[10px] font-bold ring-1 ring-border shadow-sm">
            {task.assignedTo ? task.assignedTo.substring(0, 2).toUpperCase() : "U"}
          </div>
          
          {task.priority && priorityStyle && (
             <div className={`flex items-center gap-1.5 rounded-lg border px-2 py-0.5 text-[10px] font-bold ${priorityStyle.bg}`}>
                <div className={`h-1.5 w-1.5 rounded-full ${priorityStyle.dot}`} />
                {task.priority.toUpperCase()}
             </div>
          )}
        </div>

        <div className="flex items-center gap-3 text-muted-foreground">
          <div className="flex items-center gap-1 text-[10px] font-medium">
            <MessageSquare className="h-3 w-3" />
            <span>2</span>
          </div>
          {task.dueDate && (
            <div className="flex items-center gap-1 text-[10px] font-medium">
               <Calendar className="h-3 w-3" />
               <span>{new Date(task.dueDate).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
