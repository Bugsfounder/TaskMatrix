"use client";

import React, { useState, useEffect } from "react";
import { useKanbanStore, Task } from "@/store/useTaskStore";
import { useAuthStore } from "@/store/useAuthStore";
import { TaskModal } from "@/components/task/TaskModal";
import { 
  CheckCircle2, 
  Clock, 
  Calendar, 
  Zap, 
  MessageSquare, 
  ChevronRight, 
  Flame,
  Plus,
  Target
} from "lucide-react";

import { useSprintStore } from "@/store/useSprintStore";
import { useProjectStore } from "@/store/useProjectStore";
import { StartSprintModal } from "@/components/sprint/StartSprintModal";

export default function SprintPage() {
  const { tasks, fetchTasks, editTask } = useKanbanStore();
  const { user } = useAuthStore();
  const { sprints, activeSprintId, startSprint, fetchSprints } = useSprintStore();
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isStartSprintModalOpen, setIsStartSprintModalOpen] = useState(false);
  const [activeEditTask, setActiveEditTask] = useState<Task | null>(null);

  useEffect(() => {
    if (user?.uid) {
      fetchTasks();
      fetchSprints();
    }
  }, [fetchTasks, fetchSprints, user?.uid]);

  const activeSprint = activeSprintId ? sprints.find(s => s.id === activeSprintId) : null;
  const allTasks = Object.values(tasks);
  
  // Filter tasks for the active sprint
  const sprintTasks = activeSprintId 
    ? allTasks.filter(t => t.sprintId === activeSprintId && t.status !== "done")
    : allTasks.filter(t => t.status !== "done" && (t.status === "in-progress" || t.priority === "high")).slice(0, 5);
  
  const activeSprintTasksTotal = activeSprintId ? allTasks.filter(t => t.sprintId === activeSprintId) : allTasks;
  const completedCount = activeSprintId 
    ? allTasks.filter(t => t.sprintId === activeSprintId && t.status === "done").length
    : allTasks.filter(t => t.status === "done").length;
    
  const progressPercent = activeSprintTasksTotal.length > 0 
    ? Math.round((completedCount / activeSprintTasksTotal.length) * 100) 
    : 0;

  const handleEditTask = (task: Task) => {
    setActiveEditTask(task);
    setIsModalOpen(true);
  };

  const handleSaveTask = (data: {
    title: string;
    description?: string;
    priority?: "low" | "medium" | "high";
    dueDate?: string;
  }) => {
    if (activeEditTask) {
      editTask(activeEditTask.id, data);
    }
  };

  const calculateDaysRemaining = (endDate: string) => {
    const end = new Date(endDate);
    const now = new Date();
    const diffTime = end.getTime() - now.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays > 0 ? diffDays : 0;
  };

  if (!activeSprint) {
    return (
      <div className="flex flex-col items-center justify-center h-[calc(100vh-10rem)] gap-6 animate-in fade-in zoom-in-95">
        <div className="h-20 w-20 rounded-3xl bg-amber-500/10 flex items-center justify-center text-amber-500 mb-2">
           <Zap className="h-10 w-10" />
        </div>
        <div className="text-center space-y-2">
           <h2 className="text-3xl font-bold tracking-tight">No Active Sprint</h2>
           <p className="text-muted-foreground text-sm max-w-sm mx-auto">
             You haven't started a sprint yet. Start one to focus your team and track velocity.
           </p>
        </div>
        <button 
           onClick={() => setIsStartSprintModalOpen(true)}
           className="flex h-12 items-center gap-2 rounded-2xl bg-primary px-6 text-sm font-bold text-primary-foreground hover:opacity-90 transition-all shadow-elevated active:scale-95 mt-4"
        >
          <Plus className="h-5 w-5" />
          Start New Sprint
        </button>

        <StartSprintModal 
          open={isStartSprintModalOpen}
          onOpenChange={setIsStartSprintModalOpen}
          onStart={startSprint}
        />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-8 pb-8 h-full animate-in fade-in slide-in-from-bottom-2">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="flex items-center gap-2 mb-1">
             <span className="flex items-center gap-1.5 rounded-full bg-amber-50 border border-amber-100 px-2 py-0.5 text-[10px] font-bold text-amber-700 uppercase tracking-wider">
               <Zap className="h-3 w-3" />
               Current Sprint
             </span>
             <span className="text-muted-foreground text-xs">•</span>
             <span className="text-muted-foreground text-xs font-medium">
                {new Date(activeSprint.startDate).toLocaleDateString()} - {new Date(activeSprint.endDate).toLocaleDateString()}
             </span>
          </div>
          <h2 className="text-3xl font-bold tracking-tight text-foreground">
            {activeSprint.name}
          </h2>
        </div>
        
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-secondary/50 border border-border text-xs font-bold text-foreground">
            <Clock className="h-4 w-4 text-amber-500" />
            {calculateDaysRemaining(activeSprint.endDate)} Days Remaining
          </div>
          <button 
             onClick={async () => {
               if (window.confirm("Complete the current sprint? All 'Done' tasks will be archived.")) {
                 useProjectStore.getState().fetchProjects();
                 useSprintStore.getState().fetchSprints();
                 await useKanbanStore.getState().completeSprint();
                 alert("Sprint Successfully Completed!");
               }
             }}
             className="flex h-11 items-center gap-2 rounded-xl bg-emerald-600 px-4 text-sm font-bold text-white hover:opacity-90 transition-all shadow-glow active:scale-95"
          >
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
                    <p className="text-lg font-bold text-foreground">{activeSprintTasksTotal.length} Issues</p>
                 </div>
                 <div className="p-3 rounded-xl bg-secondary/30">
                    <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider mb-1">Velocity</p>
                    <p className="text-lg font-bold text-foreground">{(activeSprintTasksTotal.length * 4.5).toFixed(0)} pts</p>
                 </div>
              </div>
           </div>

           <div className="rounded-2xl border border-border bg-card p-6 shadow-soft">
              <h3 className="text-sm font-bold text-foreground mb-4 font-bold flex items-center gap-2">
                 <Target className="h-4 w-4 text-primary" />
                 Sprint Goal
              </h3>
              <p className="text-xs text-muted-foreground leading-loose">
                {activeSprint.goal || "No goal defined for this sprint."}
              </p>
           </div>
        </div>

        {/* Right Column: Focus List */}
        <div className="lg:col-span-2 space-y-4">
           <div className="flex items-center justify-between px-2">
              <h3 className="text-sm font-bold text-foreground flex items-center gap-2">
                 <Flame className="h-4 w-4 text-rose-500" />
                 Active Tasks
              </h3>
              <button className="text-xs font-bold text-primary hover:underline transition-opacity filter hover:brightness-125">View All</button>
           </div>

           <div className="flex flex-col gap-3">
              {sprintTasks.length > 0 ? (
                sprintTasks.map((task) => (
                  <div 
                    key={task.id} 
                    onClick={() => handleEditTask(task)}
                    className="group flex items-center justify-between p-4 rounded-2xl border border-border bg-card shadow-soft hover:shadow-card hover:border-primary/20 transition-all cursor-pointer"
                  >
                    <div className="flex items-center gap-4 min-w-0">
                      <div className="h-10 w-10 flex items-center justify-center rounded-xl bg-secondary text-primary/60 font-bold text-xs ring-1 ring-border group-hover:bg-primary group-hover:text-white transition-all flex-shrink-0">
                         {task.title.substring(0, 2).toUpperCase()}
                      </div>
                      <div className="min-w-0">
                         <h4 className="text-sm font-bold text-foreground truncate group-hover:text-primary transition-colors">{task.title}</h4>
                         <div className="flex items-center gap-3 mt-1">
                            <span className={`flex items-center gap-1.5 text-[10px] font-bold lowercase ${task.priority === 'high' ? 'text-rose-500' : 'text-muted-foreground'}`}>
                               <Flame className="h-3 w-3" />
                               {task.priority || 'medium'} priority
                            </span>
                            <span className="text-muted-foreground text-xs opacity-30">•</span>
                            <span className="flex items-center gap-1.5 text-[10px] font-bold text-muted-foreground lowercase">
                               <Clock className="h-3 w-3" />
                               {task.status.replace('-', ' ')}
                            </span>
                         </div>
                      </div>
                    </div>
                    <ChevronRight className="h-4 w-4 text-muted-foreground opacity-20 group-hover:opacity-100 group-hover:text-primary transition-all flex-shrink-0" />
                  </div>
                ))
              ) : (
                <div className="flex h-64 flex-col items-center justify-center text-muted-foreground border-2 border-dashed border-border rounded-2xl bg-secondary/5 px-8 text-center transition-all">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-secondary text-primary/30 mb-4">
                     <Zap className="h-6 w-6" />
                  </div>
                  <p className="text-sm font-bold text-foreground">No active tasks in sprint</p>
                  <p className="text-xs mt-1 text-neutral-muted">Add tasks to this project to see them here.</p>
                </div>
              )}
           </div>
        </div>
      </div>
      
      <TaskModal
        open={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setActiveEditTask(null);
        }}
        onSave={handleSaveTask}
        initialData={activeEditTask}
      />
    </div>
  );
}
