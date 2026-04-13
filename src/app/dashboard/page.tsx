"use client";

import React from "react";
import { useKanbanStore } from "@/store/useTaskStore";
import { 
  CheckCircle2, 
  Clock, 
  AlertCircle, 
  BarChart3, 
  ArrowUpRight 
} from "lucide-react";

export default function DashboardPage() {
  const { tasks, columns } = useKanbanStore();
  
  const allTasks = Object.values(tasks);
  const totalTasks = allTasks.length;
  const completedTasks = allTasks.filter(t => t.status === "done").length;
  const inProgressTasks = allTasks.filter(t => t.status === "in-progress").length;
  const todoTasks = allTasks.filter(t => t.status === "todo").length;

  const highPriority = allTasks.filter(t => t.priority === "high").length;
  const mediumPriority = allTasks.filter(t => t.priority === "medium").length;
  const lowPriority = allTasks.filter(t => t.priority === "low").length;

  const recentTasks = [...allTasks]
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 5);

  const stats = [
    { 
      label: "Total Tasks", 
      value: totalTasks, 
      icon: BarChart3, 
      color: "text-blue-600", 
      bg: "bg-blue-50" 
    },
    { 
      label: "In Progress", 
      value: inProgressTasks, 
      icon: Clock, 
      color: "text-amber-600", 
      bg: "bg-amber-50" 
    },
    { 
      label: "Completed", 
      value: completedTasks, 
      icon: CheckCircle2, 
      color: "text-emerald-600", 
      bg: "bg-emerald-50" 
    },
    { 
      label: "High Priority", 
      value: highPriority, 
      icon: AlertCircle, 
      color: "text-rose-600", 
      bg: "bg-rose-50" 
    },
  ];

  return (
    <div className="flex flex-col gap-8 pb-8">
      <div>
        <h2 className="text-3xl font-bold tracking-tight text-foreground">
          Dashboard Overview
        </h2>
        <p className="text-sm text-muted-foreground mt-1 text-neutral-muted">
          Welcome back! Here's what's happening with your projects today.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <div key={stat.label} className="rounded-2xl border border-border bg-card p-6 shadow-soft hover:shadow-card transition-all">
            <div className="flex items-center justify-between">
              <div className={`rounded-xl p-2 ${stat.bg}`}>
                <stat.icon className={`h-6 w-6 ${stat.color}`} />
              </div>
              <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-lg flex items-center gap-1">
                <ArrowUpRight className="h-3 w-3" />
                12%
              </span>
            </div>
            <div className="mt-4">
              <p className="text-sm font-medium text-muted-foreground">{stat.label}</p>
              <p className="text-3xl font-bold tracking-tight text-foreground">{stat.value}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
        {/* Priority Breakdown */}
        <div className="rounded-2xl border border-border bg-card p-6 shadow-soft">
          <h3 className="text-lg font-bold text-foreground mb-6">Priority Distribution</h3>
          <div className="space-y-6">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-rose-600 uppercase">High Priority</span>
                <span className="text-xs font-bold text-foreground">{highPriority}</span>
              </div>
              <div className="h-2 w-full rounded-full bg-secondary overflow-hidden">
                <div 
                  className="h-full bg-rose-500 rounded-full transition-all duration-1000" 
                  style={{ width: `${(highPriority / (totalTasks || 1)) * 100}%` }}
                />
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-amber-600 uppercase">Medium Priority</span>
                <span className="text-xs font-bold text-foreground">{mediumPriority}</span>
              </div>
              <div className="h-2 w-full rounded-full bg-secondary overflow-hidden">
                <div 
                  className="h-full bg-amber-500 rounded-full transition-all duration-1000" 
                  style={{ width: `${(mediumPriority / (totalTasks || 1)) * 100}%` }}
                />
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-blue-600 uppercase">Low Priority</span>
                <span className="text-xs font-bold text-foreground">{lowPriority}</span>
              </div>
              <div className="h-2 w-full rounded-full bg-secondary overflow-hidden">
                <div 
                  className="h-full bg-blue-500 rounded-full transition-all duration-1000" 
                  style={{ width: `${(lowPriority / (totalTasks || 1)) * 100}%` }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="rounded-2xl border border-border bg-card p-6 shadow-soft">
          <h3 className="text-lg font-bold text-foreground mb-6">Recent Activity</h3>
          <div className="space-y-4">
            {recentTasks.length > 0 ? (
              recentTasks.map((task) => (
                <div key={task.id} className="flex items-start gap-4 p-3 rounded-xl hover:bg-secondary transition-colors cursor-pointer group">
                  <div className={`h-10 w-10 shrink-0 rounded-xl flex items-center justify-center text-xs font-bold ring-1 ring-border shadow-sm bg-white`}>
                    {task.status === "done" ? <CheckCircle2 className="h-5 w-5 text-emerald-500" /> : task.title.substring(0, 2).toUpperCase()}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-bold text-foreground truncate group-hover:text-primary transition-colors">{task.title}</p>
                    <p className="text-[10px] text-muted-foreground flex items-center gap-2">
                      <span className="capitalize">{task.status.replace(/-/g, ' ')}</span>
                      <span>•</span>
                      <span>{new Date(task.createdAt).toLocaleDateString()}</span>
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <div className="flex h-48 flex-col items-center justify-center text-muted-foreground border-2 border-dashed border-border rounded-xl">
                 <BarChart3 className="h-8 w-8 mb-2 opacity-20" />
                 <p className="text-xs font-medium">No recent activity</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
