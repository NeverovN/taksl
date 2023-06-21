import { UserShortened } from 'src/api/projects/projects.types';

export type Task = {
  id: string;
  name: string;
  description: string;
  status: TaskType;
  assigneeUser: UserShortened;
  daysLeft: number;
  storyPoints: number;
};

export enum TaskType {
  archived = 'ARCHIVE',
  inProgress = 'IN_PROGRESS',
  inReview = 'REVIEW',
  done = 'DONE',
}

export const STORY_POINTS = [1, 2, 3, 5, 8, 13];
