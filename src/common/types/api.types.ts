export type Response<T, E> =
  | {
      data: T;
      status: number;
      ok: boolean;
      error?: never;
    }
  | {
      data?: never;
      status: number;
      ok: boolean;
      error: E;
    };

export type PromiseResponse<T, E> = Promise<Response<T, E>>;
