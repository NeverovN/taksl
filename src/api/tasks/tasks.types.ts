import { TaskType } from 'src/common/types/task.types';
import { UserShortened } from '../projects/projects.types';

export type TaskResponse = {
  id: string;
  name: string;
  description: string;
  status: TaskType;
  assigneeUser: UserShortened;
  storyPoints: number;
  daysLeft: number;
};
