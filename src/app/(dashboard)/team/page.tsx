"use client";

import React from "react";
import { 
  Mail, 
  MessageSquare, 
  MoreHorizontal, 
  Phone, 
  UserPlus, 
  Search, 
  Clock, 
  CheckCircle2 
} from "lucide-react";

export default function TeamPage() {
  const members = [
    { 
      id: 1, 
      name: "Alex Rivera", 
      role: "Lead Developer", 
      email: "alex@taskmatrix.io", 
      tasks: 12, 
      completed: 45, 
      avatar: "AR",
      status: "online" 
    },
    { 
      id: 2, 
      name: "Sarah Chen", 
      role: "Senior UX Designer", 
      email: "sarah@taskmatrix.io", 
      tasks: 8, 
      completed: 32, 
      avatar: "SC",
      status: "online" 
    },
    { 
      id: 3, 
      name: "Marcus Thorne", 
      role: "Backend Architect", 
      email: "marcus@taskmatrix.io", 
      tasks: 5, 
      completed: 88, 
      avatar: "MT",
      status: "busy" 
    },
    { 
      id: 4, 
      name: "Elena Vance", 
      role: "Project Manager", 
      email: "elena@taskmatrix.io", 
      tasks: 2, 
      completed: 120, 
      avatar: "EV",
      status: "offline" 
    },
  ];

  return (
    <div className="flex flex-col gap-8 pb-8 h-full">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-foreground">
            Team Members
          </h2>
          <p className="text-sm text-muted-foreground mt-1 text-neutral-muted">
            Manage your project team and view their current resource allocation.
          </p>
        </div>
        <button className="flex h-11 items-center gap-2 rounded-xl bg-primary px-4 text-sm font-bold text-primary-foreground hover:opacity-90 transition-all shadow-elevated active:scale-95">
          <UserPlus className="h-5 w-5" />
          Invite Member
        </button>
      </div>

      {/* Toolbar */}
      <div className="flex items-center gap-4 bg-card border border-border rounded-2xl p-4 shadow-soft">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input 
            type="text" 
            placeholder="Search members..." 
            className="w-full h-10 rounded-xl bg-secondary/50 border-none pl-10 pr-4 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
          />
        </div>
      </div>

      {/* Member Grid */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4">
        {members.map((member) => (
          <div key={member.id} className="group relative flex flex-col rounded-2xl border border-border bg-card p-6 shadow-soft hover:shadow-card hover:border-primary/20 transition-all cursor-pointer">
            <button className="absolute right-4 top-4 h-8 w-8 rounded-lg text-muted-foreground hover:bg-secondary inline-flex items-center justify-center transition-colors">
              <MoreHorizontal size={16} />
            </button>

            <div className="flex flex-col items-center text-center">
              <div className="relative">
                <div className="h-20 w-20 rounded-full bg-secondary flex items-center justify-center text-xl font-bold tracking-tighter shadow-inner ring-4 ring-background overflow-hidden relative">
                   {member.avatar}
                </div>
                <div className={`absolute bottom-1 right-1 h-4 w-4 rounded-full border-2 border-card ${
                  member.status === 'online' ? 'bg-emerald-500' : 
                  member.status === 'busy' ? 'bg-rose-500' : 'bg-neutral-300'
                }`} />
              </div>

              <h4 className="mt-4 text-base font-bold text-foreground group-hover:text-primary transition-colors">{member.name}</h4>
              <p className="text-xs font-medium text-muted-foreground">{member.role}</p>

              <div className="mt-6 flex items-center gap-6 w-full justify-center border-y border-border py-4">
                <div className="text-center">
                  <p className="text-lg font-bold text-foreground flex items-center gap-1.5 justify-center">
                     <Clock className="h-4 w-4 text-amber-500" />
                     {member.tasks}
                  </p>
                  <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Active</p>
                </div>
                <div className="h-8 w-[1px] bg-border" />
                <div className="text-center">
                  <p className="text-lg font-bold text-foreground flex items-center gap-1.5 justify-center">
                     <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                     {member.completed}
                  </p>
                  <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Closed</p>
                </div>
              </div>

              <div className="mt-6 flex items-center gap-2 w-full">
                 <button className="flex-1 h-9 rounded-xl bg-primary/10 text-primary hover:bg-primary hover:text-white transition-all text-xs font-bold flex items-center justify-center gap-2">
                    <MessageSquare className="h-3.5 w-3.5" />
                    Chat
                 </button>
                 <button className="h-9 w-9 rounded-xl bg-secondary text-muted-foreground hover:bg-accent hover:text-foreground transition-all flex items-center justify-center">
                    <Mail className="h-4 w-4" />
                 </button>
                 <button className="h-9 w-9 rounded-xl bg-secondary text-muted-foreground hover:bg-accent hover:text-foreground transition-all flex items-center justify-center">
                    <Phone className="h-4 w-4" />
                 </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
