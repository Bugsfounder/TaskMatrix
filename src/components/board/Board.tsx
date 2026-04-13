"use client";

import React, { useState, useCallback, useEffect } from "react";
import Column from "./Column";
import { TaskModal } from "@/components/task/TaskModal";
import { useKanbanStore, Task } from "@/store/useTaskStore";
import { TaskCard } from "@/components/task/TaskCard";
import {
  DndContext,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
  DragStartEvent,
  DragOverEvent,
  DragOverlay,
  defaultDropAnimationSideEffects,
  DropAnimation,
  pointerWithin,
  rectIntersection,
} from "@dnd-kit/core";
import { sortableKeyboardCoordinates } from "@dnd-kit/sortable";
import { 
  Plus, 
  Filter, 
  SlidersHorizontal, 
  UserPlus, 
  ChevronDown 
} from "lucide-react";

const dropAnimation: DropAnimation = {
  sideEffects: defaultDropAnimationSideEffects({
    styles: {
      active: {
        opacity: "0.5",
      },
    },
  }),
};

export default function Board() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeTask, setActiveTask] = useState<Task | null>(null);
  const { columns, tasks, addTask, moveTask, initialize } = useKanbanStore();

  useEffect(() => {
    initialize();
  }, [initialize]);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 5,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleCreateTask = (data: {
    title: string;
    description?: string;
    priority?: "low" | "medium" | "high";
    dueDate?: string;
  }) => {
    addTask({
      id: crypto.randomUUID(),
      title: data.title,
      description: data.description,
      status: "todo",
      priority: data.priority,
      dueDate: data.dueDate,
      createdAt: new Date().toISOString(),
    });
  };

  const handleDragStart = (event: DragStartEvent) => {
    const { active } = event;
    setActiveTask(tasks[active.id as string] || null);
  };

  const handleDragOver = (event: DragOverEvent) => {
    const { active, over } = event;
    if (!over) return;

    const activeId = active.id as string;
    const overId = over.id as string;

    const activeTask = tasks[activeId];
    const overTask = tasks[overId];

    if (!activeTask) return;

    const activeColumnId = activeTask.status;
    const overColumnId = overTask ? overTask.status : (columns[overId] ? overId : null);

    if (overColumnId && activeColumnId !== overColumnId) {
      moveTask(activeId, overId);
    }
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (over) {
      moveTask(active.id as string, over.id as string);
    }
    setActiveTask(null);
  };

  const collisionDetectionStrategy = useCallback(
    (args: any) => {
      const pointerCollisions = pointerWithin(args);
      if (pointerCollisions.length > 0) return pointerCollisions;
      const rectCollisions = rectIntersection(args);
      if (rectCollisions.length > 0) return rectCollisions;
      return [];
    },
    []
  );

  return (
    <div className="flex h-full flex-col">
      {/* Board Header */}
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-foreground">
            Kanban Board
          </h2>
          <p className="text-sm text-muted-foreground mt-1">Manage and track your team's project tasks.</p>
        </div>
        
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex -space-x-2 mr-2">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-8 w-8 rounded-full border-2 border-background bg-secondary flex items-center justify-center text-[10px] font-bold text-muted-foreground ring-1 ring-border">
                U{i}
              </div>
            ))}
            <button className="h-8 w-8 rounded-full border-2 border-dashed border-muted-foreground/30 bg-secondary/30 flex items-center justify-center text-muted-foreground hover:bg-secondary transition-colors">
              <UserPlus className="h-3 w-3" />
            </button>
          </div>

          <div className="h-8 w-[1px] bg-border mx-1 hidden sm:block" />

          <button className="flex h-10 items-center gap-2 rounded-xl bg-secondary px-4 py-2 text-sm font-medium text-foreground hover:bg-accent transition-all shadow-soft active:scale-95">
            <Filter className="h-4 w-4" />
            Filter
          </button>
          
          <button 
            onClick={() => setIsModalOpen(true)}
            className="flex h-10 items-center gap-2 rounded-xl bg-primary px-4 py-2 text-sm font-bold text-primary-foreground hover:opacity-90 transition-all shadow-elevated active:scale-95"
          >
            <Plus className="h-5 w-5" />
            New Task
          </button>
        </div>
      </div>

      {/* Constraints/Filters Bar */}
      <div className="mb-6 flex items-center gap-4 py-2 overflow-x-auto no-scrollbar">
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-secondary/50 border border-border text-xs font-semibold text-muted-foreground cursor-pointer hover:bg-secondary">
          <SlidersHorizontal className="h-3.5 w-3.5" />
          Views
          <ChevronDown className="h-3 w-3" />
        </div>
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-border text-xs font-medium text-muted-foreground hover:bg-secondary cursor-pointer transition-colors">
          Priority
        </div>
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-border text-xs font-medium text-muted-foreground hover:bg-secondary cursor-pointer transition-colors">
          Assigned to
        </div>
      </div>

      <DndContext
        sensors={sensors}
        collisionDetection={collisionDetectionStrategy}
        onDragStart={handleDragStart}
        onDragOver={handleDragOver}
        onDragEnd={handleDragEnd}
      >
        <div className="flex flex-1 gap-6 overflow-x-auto pb-8 no-scrollbar scroll-smooth">
          {Object.values(columns).map((column) => {
            const columnTasks = column.taskIds.map((taskId) => tasks[taskId]).filter(Boolean);

            return (
              <Column
                key={column.id}
                column={column}
                tasks={columnTasks}
              />
            );
          })}
        </div>

        <DragOverlay dropAnimation={dropAnimation}>
          {activeTask ? (
            <div className="w-[320px] rotate-2 scale-105 opacity-90 transition-transform">
              <TaskCard task={activeTask} />
            </div>
          ) : null}
        </DragOverlay>
      </DndContext>

      <TaskModal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onCreate={handleCreateTask}
      />
    </div>
  );
}
