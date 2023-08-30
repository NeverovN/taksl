import { ProjectShort } from '../projects/projects.types';

export type FetchUserRequestParams = {
  id: string;
};

export type UpdateUserBody = {
  username?: string;
  role?: string;
  email?: string;
  phoneNumber?: string;
  telegram?: string;
};

export type UserNote = {
  id: string;
  text: string;
};

export type Member = {
  id: string;
  username: string;
  initials: string;
  email: string;
  telegram: string;
  role: string;
  phoneNumber: string;
  storyPointsPerWeek: number;
  mutualProjects: ProjectShort[];
};
