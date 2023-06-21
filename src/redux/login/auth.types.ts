export type AuthState = {
  loading: boolean;
  error: Error | null;
  data: AuthData;
};

export type AuthResponse = {
  userId: string;
  token: string;
};

export type AuthData = {
  token: string | null;
};

export type LoginRequestBody = {
  email: string;
  password: string;
};

export type RegisterRequestBody = {
  username: string;
  email: string;
  password: string;
};
