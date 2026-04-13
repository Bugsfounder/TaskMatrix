"use client";

import React from "react";
import { useKanbanStore } from "@/store/useTaskStore";
import { 
  CheckCircle2, 
  Clock, 
  Calendar, 
  Zap, 
  MessageSquare, 
  ChevronRight, 
  Flame 
} from "lucide-react";

export default function SprintPage() {
  const { tasks } = useKanbanStore();
  const allTasks = Object.values(tasks);
  
  const sprintTasks = allTasks.filter(t => t.status === "in-progress" || t.priority === "high").slice(0, 5);
  const completedCount = allTasks.filter(t => t.status === "done").length;
  const progressPercent = Math.min(100, Math.round((completedCount / (allTasks.length || 1)) * 100));

  return (
    <div className="flex flex-col gap-8 pb-8 h-full">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="flex items-center gap-2 mb-1">
             <span className="flex items-center gap-1.5 rounded-full bg-amber-50 border border-amber-100 px-2 py-0.5 text-[10px] font-bold text-amber-700 uppercase tracking-wider">
               <Zap className="h-3 w-3" />
               Current Sprint
             </span>
             <span className="text-muted-foreground text-xs">•</span>
             <span className="text-muted-foreground text-xs font-medium">Sprint 12 (Apr 1 - Apr 14)</span>
          </div>
          <h2 className="text-3xl font-bold tracking-tight text-foreground">
            Feature Sprint
          </h2>
        </div>
        
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-secondary/50 border border-border text-xs font-bold text-foreground">
            <Clock className="h-4 w-4 text-amber-500" />
            8 Days Remaining
          </div>
          <button className="flex h-11 items-center gap-2 rounded-xl bg-emerald-600 px-4 text-sm font-bold text-white hover:opacity-90 transition-all shadow-glow active:scale-95">
            Complete Sprint
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        {/* Left Column: Progress & Stats */}
        <div className="lg:col-span-1 space-y-6">
           <div className="rounded-2xl border border-border bg-card p-6 shadow-soft">
              <h3 className="text-sm font-bold text-foreground mb-4 flex items-center justify-between">
                Sprint Progress
                <span className="text-emerald-500">{progressPercent}%</span>
              </h3>
              <div className="h-3 w-full rounded-full bg-secondary overflow-hidden mb-6">
                <div 
                  className="h-full bg-emerald-500 rounded-full transition-all duration-1000 shadow-[0_0_10px_rgba(16,185,129,0.3)]" 
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                 <div className="p-3 rounded-xl bg-secondary/30">
                    <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider mb-1">Scope</p>
                    <p className="text-lg font-bold text-foreground">{allTasks.length} Issues</p>
                 </div>
                 <div className="p-3 rounded-xl bg-secondary/30">
                    <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider mb-1">Velocity</p>
                    <p className="text-lg font-bold text-foreground">12 pts</p>
                 </div>
              </div>
           </div>

           <div className="rounded-2xl border border-border bg-card p-6 shadow-soft">
              <h3 className="text-sm font-bold text-foreground mb-4">Sprint Goal</h3>
              <p className="text-xs text-muted-foreground leading-loose">
                Launch the new task persistence engine and overhaul the global navigation system to ensure maximum usability and data reliability.
              </p>
           </div>
        </div>

        {/* Right Column: Focus List */}
        <div className="lg:col-span-2 space-y-4">
           <div className="flex items-center justify-between px-2">
              <h3 className="text-sm font-bold text-foreground flex items-center gap-2">
                 <Flame className="h-4 w-4 text-rose-500" />
                 High Priority Focus
              </h3>
              <button className="text-xs font-bold text-primary hover:underline">View All</button>
           </div>

           <div className="flex flex-col gap-3">
              {sprintTasks.length > 0 ? (
                sprintTasks.map((task) => (
                  <div key={task.id} className="group flex items-center justify-between p-4 rounded-2xl border border-border bg-card shadow-soft hover:shadow-card hover:border-primary/20 transition-all cursor-pointer">
                    <div className="flex items-center gap-4 min-w-0">
                      <div className="h-10 w-10 flex items-center justify-center rounded-xl bg-secondary text-primary/40 font-bold text-xs ring-1 ring-border group-hover:bg-primary group-hover:text-white transition-all">
                         {task.title.substring(0, 2).toUpperCase()}
                      </div>
                      <div className="min-w-0">
                         <h4 className="text-sm font-bold text-foreground truncate group-hover:text-primary transition-colors">{task.title}</h4>
                         <div className="flex items-center gap-3 mt-1">
                            <span className="flex items-center gap-1.5 text-[10px] font-bold text-muted-foreground lowercase">
                               <Clock className="h-3 w-3" />
                               {task.status.replace('-', ' ')}
                            </span>
                            <span className="text-muted-foreground text-xs opacity-30">•</span>
                            <span className="flex items-center gap-1.5 text-[10px] font-bold text-muted-foreground">
                               <MessageSquare className="h-3 w-3" />
                               3 Comments
                            </span>
                         </div>
                      </div>
                    </div>
                    <ChevronRight className="h-4 w-4 text-muted-foreground opacity-20 group-hover:opacity-100 group-hover:text-primary transition-all" />
                  </div>
                ))
              ) : (
                <div className="flex h-64 flex-col items-center justify-center text-muted-foreground border-2 border-dashed border-border rounded-2xl bg-secondary/5 px-8 text-center transition-all">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-secondary text-primary/30 mb-4">
                     <Zap className="h-6 w-6" />
                  </div>
                  <p className="text-sm font-bold text-foreground">No active sprint issues</p>
                  <p className="text-xs mt-1 text-neutral-muted">Add some high-priority tasks to see them here.</p>
                </div>
              )}
           </div>
        </div>
      </div>
    </div>
  );
}
