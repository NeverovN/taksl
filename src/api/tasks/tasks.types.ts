import { TaskType } from 'src/common/types/task.types';
import { UserShort } from '../projects/projects.types';

export type TaskResponse = {
  id: string;
  projectId: string;
  name: string;
  description: string;
  status: TaskType;
  assigneeUser: UserShort;
  storyPoints: number;
  daysLeft: number;
};

export type Author = {
  id: string;
  username: string;
  initials: string;
};

export type TaskNote = {
  id: string;
  authorUserId: string;
  text: string;
};

export type TaskNotesResponse = {
  authors: Author[];
  comments: TaskNote[];
};

export type NoteBody = {
  text: string;
};
