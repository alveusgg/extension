export const typeSafeObjectEntries = <T extends object>(obj: T) =>
  Object.entries(obj) as Array<[keyof T, T[keyof T]]>;

export const typeSafeObjectFromEntries = <T extends [string, unknown][]>(
  entries: T,
) => Object.fromEntries(entries) as { [K in T[number][0]]: T[number][1] };

export const camelToKebab = (str: string) =>
  str.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase();
