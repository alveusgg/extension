export type SortMethod = "default" | "arrival" | "name" | "species";

export const sortMethods: SortMethod[] = [
  "default",
  "arrival",
  "name",
  "species",
];

export const sortOptions: { value: SortMethod; label: string }[] = [
  { value: "default", label: "Default" },
  { value: "arrival", label: "Arrival date" },
  { value: "name", label: "Name (A-Z)" },
  { value: "species", label: "Species (A-Z)" },
];

export default sortOptions;
