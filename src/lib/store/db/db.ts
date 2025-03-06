import Dexie, { type EntityTable } from 'dexie';

enum TaskPriority {
  Low = "0 - Low",
  Medium = "1 - Medium",
  High = "2 - High"
}

interface Task {
  id: number;
  short_description: string;
  description?: string;
  priority: TaskPriority;
  estimatedHours: number;
  deadline?: Date;
  done: boolean;
  projectId?: number;
}

const db = new Dexie('FriendsDatabase') as Dexie & {
  tasks: EntityTable<
    Task,
    'id' // primary key "id" (for the typings only)
  >;
};

// Schema declaration:
db.version(1).stores({
  tasks: '++id, short_description, description, priority, estimatedHours, deadline, done, project_id'
});

export type { Task };
export { db, TaskPriority };
