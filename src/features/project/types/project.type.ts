import { ProjectResponse } from 'src/api/projects/projects.types';
import { TaskResponse } from 'src/api/tasks/tasks.types';

export type ProjectData = ProjectResponse & { tasks: TaskResponse[] };
