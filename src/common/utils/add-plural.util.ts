export const addPlural = (count: number | undefined, label: string) => {
  return count === 1 ? label : `${label}s`;
};
