"use client";

import React, { useState } from "react";
import { useKanbanStore } from "@/store/useTaskStore";
import { 
  Search, 
  Filter, 
  Clock, 
  AlertCircle, 
  CheckCircle2, 
  Inbox, 
  Calendar 
} from "lucide-react";

export default function MyTasksPage() {
  const { tasks } = useKanbanStore();
  const [search, setSearch] = useState("");
  const [priorityFilter, setPriorityFilter] = useState<string | null>(null);

  const allTasks = Object.values(tasks);
  
  const filteredTasks = allTasks.filter(task => {
    const matchesSearch = task.title.toLowerCase().includes(search.toLowerCase()) ||
                        task.description?.toLowerCase().includes(search.toLowerCase());
    const matchesPriority = !priorityFilter || task.priority === priorityFilter;
    return matchesSearch && matchesPriority;
  });

  const priorityConfig = {
    low: { dot: "bg-blue-400", bg: "bg-blue-50 text-blue-700 border-blue-100" },
    medium: { dot: "bg-amber-400", bg: "bg-amber-50 text-amber-700 border-amber-100" },
    high: { dot: "bg-rose-400", bg: "bg-rose-50 text-rose-700 border-rose-100" },
  };

  return (
    <div className="flex flex-col gap-8 pb-8 h-full">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-foreground">
            My Tasks
          </h2>
          <p className="text-sm text-muted-foreground mt-1 text-neutral-muted">
            Manage your personal workload and track your active progress.
          </p>
        </div>
      </div>

      {/* Toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="relative flex-1 min-w-[300px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input 
            type="text" 
            placeholder="Search your tasks..." 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full h-11 rounded-xl border border-border bg-card pl-10 pr-4 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all shadow-soft"
          />
        </div>

        <div className="flex items-center gap-3">
          <select 
            value={priorityFilter || ""} 
            onChange={(e) => setPriorityFilter(e.target.value || null)}
            className="h-11 rounded-xl border border-border bg-card px-4 text-sm font-medium text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 shadow-soft cursor-pointer transition-all hover:bg-secondary"
          >
            <option value="">All Priorities</option>
            <option value="high">High Priority</option>
            <option value="medium">Medium Priority</option>
            <option value="low">Low Priority</option>
          </select>
          
          <button className="flex h-11 items-center gap-2 rounded-xl bg-secondary px-4 text-sm font-medium hover:bg-accent transition-all shadow-soft active:scale-95 text-foreground">
            <Filter className="h-4 w-4" />
            More Filters
          </button>
        </div>
      </div>

      {/* Task List */}
      <div className="flex flex-col gap-3">
        {filteredTasks.length > 0 ? (
          filteredTasks.map((task) => (
            <div 
              key={task.id} 
              className="group flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-2xl border border-border bg-card shadow-soft hover:shadow-card hover:border-primary/20 transition-all cursor-pointer"
            >
              <div className="flex items-center gap-4 flex-1 min-w-0">
                <div className={`h-11 w-11 shrink-0 rounded-xl flex items-center justify-center text-xs font-bold ring-1 ring-border shadow-sm group-hover:bg-primary/5 transition-colors bg-white`}>
                   {task.status === "done" ? <CheckCircle2 className="h-6 w-6 text-emerald-500" /> : <Inbox className="h-6 w-6 text-primary/40 group-hover:text-primary transition-colors" />}
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="text-sm font-bold text-foreground group-hover:text-primary transition-colors truncate">{task.title}</h4>
                  <div className="flex items-center gap-3 mt-1 overflow-x-hidden">
                    <span className="text-[10px] font-bold text-muted-foreground uppercase flex items-center gap-1.5 shrink-0">
                      <Clock className="h-3 w-3" />
                      {task.status.replace('-', ' ')}
                    </span>
                    {task.dueDate && (
                      <span className="text-[10px] font-bold text-muted-foreground flex items-center gap-1.5 shrink-0 hidden sm:flex">
                        <Calendar className="h-3 w-3" />
                        {new Date(task.dueDate).toLocaleDateString()}
                      </span>
                    )}
                    {task.description && (
                      <span className="text-[10px] text-neutral-muted truncate hidden lg:block">
                        • {task.description}
                      </span>
                    )}
                  </div>
                </div>
              </div>

              <div className="mt-4 sm:mt-0 flex items-center gap-4 justify-between sm:justify-end shrink-0">
                {task.priority && (
                  <div className={`flex items-center gap-1.5 rounded-lg border px-2.5 py-1 text-[10px] font-bold ${priorityConfig[task.priority].bg}`}>
                    <div className={`h-1.5 w-1.5 rounded-full ${priorityConfig[task.priority].dot}`} />
                    {task.priority.toUpperCase()}
                  </div>
                )}
                <div className="h-8 w-8 rounded-lg bg-secondary text-muted-foreground flex items-center justify-center hover:bg-accent transition-colors">
                  <AlertCircle className="h-4 w-4" />
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="flex h-64 flex-col items-center justify-center text-muted-foreground border-2 border-dashed border-border rounded-2xl bg-secondary/10 px-8 text-center transition-all hover:bg-secondary/20">
             <div className="flex h-16 w-16 items-center justify-center rounded-full bg-secondary text-primary/30 mb-4 animate-pulse">
                <Inbox className="h-8 w-8" />
             </div>
             <p className="text-sm font-bold text-foreground">No tasks found</p>
             <p className="text-xs mt-1 text-neutral-muted">Try adjusting your filters or create a new task on the Kanban board.</p>
          </div>
        )}
      </div>
    </div>
  );
}
