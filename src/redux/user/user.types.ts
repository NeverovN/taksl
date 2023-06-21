import { ProjectResponse } from 'src/api/projects/projects.types';
import { UpdateUserBody } from 'src/api/user/user.types';

export type UserState = {
  loading: boolean;
  error: Error | null;
  data: UserData & UserProjects;
};

export type UserData = {
  id: string;
  username: string;
  initials: string;
  email: string;
  role: string;
  phone: string;
  telegram: string;
  storyPointsPerWeek: number;
};

export type UserProjects = {
  projects: ProjectResponse[];
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
