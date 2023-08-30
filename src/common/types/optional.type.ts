export type OptionalPick<T, K extends keyof T> = Pick<Partial<T>, K> &
  Omit<T, K>;

export type Optional<T> = {
  [K in keyof T]?: T[K];
};
