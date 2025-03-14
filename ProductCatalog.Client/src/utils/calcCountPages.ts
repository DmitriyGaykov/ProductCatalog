export const calcCountPages = (limit: number, countElements: number) => {
  return Math.ceil(countElements / limit);
}