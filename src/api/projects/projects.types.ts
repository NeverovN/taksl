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

export type ProjectResponse = {
  id: string;
  name: string;
  description: string;
  memberUsers: UserShortened[];
};

export type UserShortened = {
  id: string;
  username: string;
  initials: string;
  role: string;
  storyPointsPerWeek: number;
};
