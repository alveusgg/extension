import type { SelectOption } from "../pages/overlay/components/Select";

export type SortOption = SelectOption;

export const sortOptions = [
  { value: "default", label: "Default" },
  { value: "arrival", label: "Arrival date" },
  { value: "name", label: "Name (A-Z)" },
  { value: "species", label: "Species (A-Z)" },
] as const satisfies SortOption[];

export type SortMethod = (typeof sortOptions)[number]["value"];

export const sortMethods: SortMethod[] = sortOptions.map((opt) => opt.value);

export type AmbassadorEntry<T> = [string, T];

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
        a.name.localeCompare(b.name, undefined, { sensitivity: "base" }),
      );
    case "species":
      return [...ambassadors].sort(([, a], [, b]) =>
        a.species.name.localeCompare(b.species.name, undefined, {
          sensitivity: "base",
        }),
      );
    case "default":
    default:
      return ambassadors;
  }
};

export default sortOptions;
