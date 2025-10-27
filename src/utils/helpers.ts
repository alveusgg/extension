export type ObjectEntries<T extends object> = Array<[keyof T, T[keyof T]]>;

export const typeSafeObjectEntries = <T extends object>(obj: T) =>
  Object.entries(obj) as ObjectEntries<T>;

export const typeSafeObjectFromEntries = <T extends [string, unknown][]>(
  entries: T,
) => Object.fromEntries(entries) as { [K in T[number][0]]: T[number][1] };

export const camelToKebab = (str: string) =>
  str.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase();

export type AmbassadorEntry<T> = [string, T];

export type SortMethod = "default" | "arrival" | "name" | "species";

type PartialDate =
  | `${number}`
  | `${number}-${number}`
  | `${number}-${number}-${number}`;

/**
 * Sorts an array of ambassador entries based on the specified sort method.
 * @param ambassadors - Array of [key, ambassador] tuples
 * @param sortMethod - The sorting method to apply
 * @param sortPartialDates - Function to sort partial dates (for arrival sorting)
 * @returns Sorted array of ambassador entries
 */
export const sortAmbassadors = <
  T extends {
    name: string;
    arrival: PartialDate | null;
    species: { name: string };
  },
>(
  ambassadors: AmbassadorEntry<T>[],
  sortMethod: SortMethod,
  sortPartialDates: (a: PartialDate | null, b: PartialDate | null) => number,
): AmbassadorEntry<T>[] => {
  switch (sortMethod) {
    case "arrival":
      return [...ambassadors].sort(([, a], [, b]) =>
        sortPartialDates(a.arrival, b.arrival),
      );
    case "name":
      return [...ambassadors].sort(([, a], [, b]) =>
        a.name.localeCompare(b.name),
      );
    case "species":
      return [...ambassadors].sort(([, a], [, b]) =>
        a.species.name.localeCompare(b.species.name),
      );
    case "default":
    default:
      return ambassadors;
  }
};
