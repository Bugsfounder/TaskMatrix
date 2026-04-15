import { create } from 'zustand';
import { persistence } from '@/lib/persistence';

export type Task = {
  id: string;
  title: string;
  description?: string;
  status: "todo" | "in-progress" | "done";
  priority?: "low" | "medium" | "high";
  assignedTo?: string;
  dueDate?: string;
  createdAt: string;
};

export type Column = {
  id: "todo" | "in-progress" | "done";
  title: string;
  taskIds: string[];
};

interface KanbanState {
  tasks: Record<string, Task>;
  columns: Record<string, Column>;
  addTask: (task: Task) => void;
  moveTask: (activeId: string, overId: string) => void;
  initialize: () => void;
}

export const useKanbanStore = create<KanbanState>((set) => ({
  tasks: {},
  columns: {
    "todo": { id: "todo", title: "To Do", taskIds: [] },
    "in-progress": { id: "in-progress", title: "In Progress", taskIds: [] },
    "done": { id: "done", title: "Done", taskIds: [] }
  },
  addTask: (task) =>
    set((state) => ({
      tasks: {
        ...state.tasks,
        [task.id]: task,
      },
      columns: {
        ...state.columns,
        [task.status]: {
          ...state.columns[task.status],
          taskIds: [...state.columns[task.status].taskIds, task.id],
        },
      },
    })),
  moveTask: (activeId, overId) =>
    set((state) => {
      const activeTask = state.tasks[activeId];
      if (!activeTask) return state;

      const sourceColId = activeTask.status;
      
      // Determine destination column
      let destColId: "todo" | "in-progress" | "done" | undefined;
      if (state.columns[overId as keyof typeof state.columns]) {
        destColId = overId as any;
      } else if (state.tasks[overId]) {
        destColId = state.tasks[overId].status;
      }

      if (!destColId) return state;

      const sourceCol = state.columns[sourceColId];
      const destCol = state.columns[destColId];

      // Reordering in same column
      if (sourceColId === destColId) {
        const oldIndex = sourceCol.taskIds.indexOf(activeId);
        const newIndex = sourceCol.taskIds.indexOf(overId);
        if (oldIndex === -1 || newIndex === -1 || oldIndex === newIndex) return state;

        const newTaskIds = [...sourceCol.taskIds];
        const [removed] = newTaskIds.splice(oldIndex, 1);
        newTaskIds.splice(newIndex, 0, removed);

        return {
          columns: {
            ...state.columns,
            [sourceColId]: { ...sourceCol, taskIds: newTaskIds }
          }
        };
      }

      // Moving to different column
      const newSourceTaskIds = sourceCol.taskIds.filter(id => id !== activeId);
      const newDestTaskIds = [...destCol.taskIds];
      const overIndex = destCol.taskIds.indexOf(overId);

      if (overIndex !== -1) {
        newDestTaskIds.splice(overIndex, 0, activeId);
      } else {
        newDestTaskIds.push(activeId);
      }

      return {
        tasks: {
          ...state.tasks,
          [activeId]: { ...activeTask, status: destColId }
        },
        columns: {
          ...state.columns,
          [sourceColId]: { ...sourceCol, taskIds: newSourceTaskIds },
          [destColId]: { ...destCol, taskIds: newDestTaskIds }
        }
      };
    }),
  initialize: () => {
    const data = persistence.load();
    if (data) {
      set({ tasks: data.tasks, columns: data.columns });
    }
  },
}));

// Automatically save changes to local storage
useKanbanStore.subscribe((state) => {
  persistence.save({
    tasks: state.tasks,
    columns: state.columns,
  });
});

