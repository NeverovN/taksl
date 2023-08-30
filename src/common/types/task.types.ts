import { UserShortened } from 'src/api/projects/projects.types';
import { Optional } from './optional.type';

export type Task = {
  id: string;
  name: string;
  description: string;
  status: TaskType;
  assigneeUser: UserShortened;
  daysLeft: number;
  storyPoints: number;
};

export type TaskUpdateBody = Optional<
  Omit<Task, 'id' | 'assigneeUser' | 'daysLeft'> & {
    assigneeUserId: string;
    deadline: string;
  }
>;

export enum TaskType {
  archived = 'BACKLOG',
  inProgress = 'IN_PROGRESS',
  inReview = 'REVIEW',
  done = 'DONE',
}

export const STORY_POINTS = [1, 2, 3, 5, 8, 13];
