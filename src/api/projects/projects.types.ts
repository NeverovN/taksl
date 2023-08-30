import { Optional } from 'src/common/types/optional.type';
import { TaskType } from 'src/common/types/task.types';

export type FetchUserRequestParams = {
  id: string;
};

export type UpdateUserBody = {
  username?: string;
  role?: string;
  email?: string;
  phone?: string;
  telegram?: string;
};

export type UserProject = {
  id: string;
  name: string;
  description: string;
  donePercent: number;
};

export type ProjectResponse = {
  id: string;
  name: string;
  description: string;
  memberUsers: Omit<UserShortened, 'role' | 'storyPointsPerWeek'>[];
};

export type ProjectShort = {
  id: string;
  name: string;
  description: string;
};

export type UserShortened = {
  id: string;
  username: string;
  role: string;
  initials: string;
  storyPointsPerWeek: number;
};

export type UserShort = Omit<UserShortened, 'role' | 'storyPointsPerWeek'>;

export type TaskCreatorBody = {
  name?: string;
  description?: string;
  assigneeUserId?: string;
  status?: TaskType;
  storyPoints?: number;
  deadline?: string;
};

export type UpdateProjectBody = Optional<
  Omit<ProjectResponse, 'id' | 'memberUsers'>
> & { memberUserIds?: string[] };
