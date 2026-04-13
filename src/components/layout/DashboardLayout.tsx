"use client";

import React from "react";
import { Sidebar } from "./Sidebar";
import { TopBar } from "./TopBar";

export function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-primary/20 selection:text-primary overflow-hidden">
      <Sidebar />
      <div className="lg:ml-64 flex flex-col h-screen overflow-hidden">
        <TopBar />
        <main className="mt-16 flex-1 overflow-y-auto bg-soft-gradient p-0 sm:p-6 lg:p-8">
          <div className="mx-auto max-w-7xl h-full flex flex-col">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
