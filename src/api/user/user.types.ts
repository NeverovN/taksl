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
