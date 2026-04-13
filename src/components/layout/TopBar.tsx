"use client";

import React from "react";
import { Search, Bell, ChevronDown, Plus } from "lucide-react";

export function TopBar() {
  return (
    <header className="fixed top-0 left-0 lg:left-64 right-0 z-10 h-16 border-b border-border bg-background px-6 flex items-center justify-between">
      <div className="flex items-center gap-6">
        <div className="flex items-center gap-2 cursor-pointer hover:bg-secondary rounded-lg px-2 py-1 transition-colors">
          <span className="text-sm font-semibold text-foreground italic px-1 bg-primary/10 text-primary rounded">TM</span>
          <span className="text-sm font-bold text-foreground">Project Alpha</span>
          <ChevronDown className="h-4 w-4 text-muted-foreground" />
        </div>
        
        <div className="hidden md:flex relative w-96 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground transition-colors group-hover:text-foreground" />
          <input
            type="text"
            placeholder="Search tasks, docs..."
            className="w-full rounded-2xl bg-secondary/70 border-none px-10 py-1.5 text-sm transition-all focus:bg-background focus:ring-2 focus:ring-primary/20 focus:outline-none"
          />
        </div>
      </div>

      <div className="flex items-center gap-4">
        <button className="hidden sm:flex h-8 w-8 items-center justify-center rounded-full hover:bg-secondary transition-colors relative">
          <Bell className="h-5 w-5 text-muted-foreground" />
          <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full border-2 border-background bg-destructive"></span>
        </button>
        
        <div className="h-4 w-[1px] bg-border mx-2" />

        <div className="flex items-center gap-3">
          <div className="text-right hidden sm:block">
            <p className="text-xs font-semibold text-foreground leading-none">Alex Rivera</p>
            <p className="text-[10px] text-muted-foreground">Product Designer</p>
          </div>
          <div className="h-9 w-9 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary font-bold overflow-hidden cursor-pointer">
             AR
          </div>
        </div>
      </div>
    </header>
  );
}
