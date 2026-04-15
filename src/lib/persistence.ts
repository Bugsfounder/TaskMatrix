import { Task, Column } from '@/store/useTaskStore';

interface KanbanData {
  tasks: Record<string, Task>;
  columns: Record<string, Column>;
}

const STORAGE_KEY = 'kanban-matrix-storage';

export const persistence = {
  save: (data: KanbanData) => {
    if (typeof window === 'undefined') return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch (error) {
      console.error('Failed to save to local storage', error);
    }
  },
  load: (): KanbanData | null => {
    if (typeof window === 'undefined') return null;
    try {
      const data = localStorage.getItem(STORAGE_KEY);
      return data ? JSON.parse(data) : null;
    } catch (error) {
      console.error('Failed to load from local storage', error);
      return null;
    }
  }
};
