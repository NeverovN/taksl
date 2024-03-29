import { UserProject } from 'src/api/projects/projects.types';
import { UpdateUserBody, UserNote } from 'src/api/user/user.types';

export type UserState = {
  loading: boolean;
  error: Error | null;
  data: UserData & UserProjects & UserNotes;
};

export type UserData = {
  id: string;
  username: string;
  initials: string;
  email: string;
  role: string;
  phoneNumber: string;
  telegram: string;
  storyPointsPerWeek: number;
};

export type UserProjects = {
  projects: UserProject[];
};

export type UserNotes = {
  notes: UserNote[];
};

export type ProjectShortened = {
  id: string;
  name: string;
  description: string;
};

export type UpdateUser = {
  id: string;
  body: UpdateUserBody;
};
