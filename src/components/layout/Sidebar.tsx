"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  LayoutDashboard, 
  CheckSquare, 
  FolderKanban, 
  Database, 
  Zap, 
  Users 
} from "lucide-react";

const navItems = [
  { icon: LayoutDashboard, label: "Dashboard", href: "/dashboard" },
  { icon: CheckSquare, label: "My Tasks", href: "/tasks" },
  { icon: FolderKanban, label: "Projects", href: "/projects" },
  { icon: Database, label: "Backlog", href: "/backlog" },
  { icon: Zap, label: "Sprint", href: "/sprint" },
  { icon: Users, label: "Team", href: "/team" },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="fixed left-0 top-0 hidden h-screen w-64 border-r border-border bg-card lg:flex flex-col">
      <div className="flex h-16 items-center px-6">
        <Link href="/dashboard" className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
            <FolderKanban className="h-5 w-5 text-primary-foreground" />
          </div>
          <span className="text-xl font-bold tracking-tight">TaskMatrix</span>
        </Link>
      </div>

      <nav className="flex-1 space-y-1 px-3 py-4">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.label}
              href={item.href}
              className={`flex w-full items-center gap-3 rounded-xl px-3 py-2 text-sm font-medium transition-all ${
                isActive 
                  ? "bg-primary/10 text-primary" 
                  : "text-muted-foreground hover:bg-secondary hover:text-foreground"
              }`}
            >
              <item.icon className="h-5 w-5" />
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-border">
        <div className="rounded-2xl bg-secondary/50 p-4">
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">Used Space</p>
          <div className="h-2 w-full rounded-full bg-border overflow-hidden">
            <div className="h-full w-[65%] bg-primary" />
          </div>
          <p className="text-[10px] mt-2 text-muted-foreground">Using 1.2GB of 2GB</p>
        </div>
      </div>
    </aside>
  );
}
