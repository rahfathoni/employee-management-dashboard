export const formatDate = (date: Date): string => {
  const offset = date.getTimezoneOffset();
  const setDate = new Date(date.getTime() - (offset * 60 * 1000));
  return setDate.toISOString().split('T')[0];
};