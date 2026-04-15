"use client";

import React from "react";
import { useKanbanStore } from "@/store/useTaskStore";
import { 
  MoreHorizontal, 
  ArrowUp, 
  ArrowDown, 
  Minus, 
  Search, 
  Plus 
} from "lucide-react";

export default function BacklogPage() {
  const { tasks } = useKanbanStore();
  const allTasks = Object.values(tasks);

  const priorityIcons = {
    high: { icon: ArrowUp, color: "text-rose-500", label: "High" },
    medium: { icon: Minus, color: "text-amber-500", label: "Medium" },
    low: { icon: ArrowDown, color: "text-blue-500", label: "Low" },
  };

  const statusColors = {
    todo: "bg-blue-50 text-blue-700 border-blue-100",
    "in-progress": "bg-amber-50 text-amber-700 border-amber-100",
    done: "bg-emerald-50 text-emerald-700 border-emerald-100",
  };

  return (
    <div className="flex flex-col gap-8 pb-8 h-full">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-foreground">
            Backlog
          </h2>
          <p className="text-sm text-muted-foreground mt-1 text-neutral-muted">
            Prioritize and manage your product backlog in a dense list view.
          </p>
        </div>
        <button className="flex h-11 items-center gap-2 rounded-xl bg-primary px-4 text-sm font-bold text-primary-foreground hover:opacity-90 transition-all shadow-elevated active:scale-95">
          <Plus className="h-5 w-5" />
          Create Task
        </button>
      </div>

      {/* Toolbar */}
      <div className="flex items-center gap-4 bg-card border border-border rounded-2xl p-4 shadow-soft">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input 
            type="text" 
            placeholder="Search backlog..." 
            className="w-full h-10 rounded-xl bg-secondary/50 border-none pl-10 pr-4 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
          />
        </div>
        <div className="h-6 w-[1px] bg-border mx-2" />
        <button className="text-xs font-bold text-muted-foreground hover:text-foreground px-2 py-1 rounded hover:bg-secondary transition-colors">
          Show Done
        </button>
      </div>

      {/* Table Container */}
      <div className="relative overflow-x-auto rounded-2xl border border-border bg-card shadow-soft">
        <table className="w-full text-left text-sm">
          <thead className="bg-secondary/40 border-b border-border text-[10px] uppercase font-bold text-muted-foreground tracking-wider">
            <tr>
              <th className="px-6 py-4">Title</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4">Priority</th>
              <th className="px-6 py-4">Assignee</th>
              <th className="px-6 py-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {allTasks.length > 0 ? (
              allTasks.map((task) => (
                <tr key={task.id} className="hover:bg-secondary/30 transition-colors group">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="h-2 w-2 rounded-full bg-primary/30" />
                      <div>
                        <p className="font-bold text-foreground group-hover:text-primary transition-colors">{task.title}</p>
                        <p className="text-[10px] text-neutral-muted truncate max-w-[300px]">{task.description}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center rounded-lg border px-2 py-0.5 text-[10px] font-bold capitalize ${statusColors[task.status]}`}>
                      {task.status.replace('-', ' ')}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    {task.priority && priorityIcons[task.priority] && (
                      <div className="flex items-center gap-2">
                        <div className={priorityIcons[task.priority].color}>
                           {React.createElement(priorityIcons[task.priority].icon, { size: 14 })}
                        </div>
                        <span className="text-[10px] font-bold text-foreground">{priorityIcons[task.priority].label}</span>
                      </div>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <div className="h-6 w-6 rounded-lg bg-secondary flex items-center justify-center text-[8px] font-bold ring-1 ring-border shadow-sm">
                        {task.assignedTo ? task.assignedTo.substring(0, 2).toUpperCase() : "AR"}
                      </div>
                      <span className="text-[10px] font-medium text-foreground">{task.assignedTo || "Alex Rivera"}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button className="h-8 w-8 rounded-lg text-muted-foreground hover:bg-secondary inline-flex items-center justify-center transition-colors">
                      <MoreHorizontal size={16} />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className="px-6 py-12 text-center text-muted-foreground">
                   <div className="flex flex-col items-center gap-2">
                      <div className="h-12 w-12 rounded-full bg-secondary flex items-center justify-center mb-2">
                         <Search className="h-6 w-6 opacity-20" />
                      </div>
                      <p className="font-bold text-foreground">Backlog is empty</p>
                      <p className="text-xs">Congratulations! You've triaged all pending work.</p>
                   </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
