import Dexie, { type EntityTable } from 'dexie';

enum Priority {
  Low = "0 - Low",
  Medium = "1 - Medium",
  High = "2 - High"
}

interface Setting {
  key: string,
  value: any
}

interface Goal {
  id: number;
  name: string;
  summary: string;
}

interface Task {
  id: number;
  short_description: string;
  description?: string;
  priority: Priority;
  estimatedHours: number;
  deadline?: Date;
  done: boolean;
  projectId?: number;
  lastMarkedDone?: Date;
}

interface Project {
  id: number;
  name: string;
  priority: Priority;
  description?: string
  active: boolean;
  goal_ids: number[]
}

const db = new Dexie('ProjectsDatabase') as Dexie & {
  tasks: EntityTable<Task, 'id'>;
  projects: EntityTable<Project, 'id'>;
  goals: EntityTable<Goal, 'id'>;
};

const settingsDb = new Dexie('SettingsDatabase') as Dexie & {
  settings: EntityTable<Setting, 'key'>;
};

settingsDb.version(1).stores({
  settings: "key"
});

// Schema declaration:
db.version(1).stores({
  tasks: '++id, short_description, description, priority, estimatedHours, deadline, done, project_id',
  projects: '++id',
  goals: '++id'
});

export type { Task, Project, Goal };
export { db as projectsDb, settingsDb, Priority };
