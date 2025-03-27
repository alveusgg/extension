import { DateTime } from "luxon";

const timezone = process.env.REACT_APP_TIMEZONE || "UTC";

const getToday = () => DateTime.now().setZone(timezone).startOf("day");

type PartialDate =
  | `${number}`
  | `${number}-${number}`
  | `${number}-${number}-${number}`;

const splitPartialDate = (partialDate: PartialDate) =>
  partialDate.split("-").map((x) => parseInt(x)) as
    | [number]
    | [number, number]
    | [number, number, number];

const parsePartialDate = (partialDate: PartialDate) => {
  const [year, month, day] = splitPartialDate(partialDate);
  return DateTime.fromObject(
    {
      year,
      month: month || 1,
      day: day || 1,
    },
    { zone: timezone },
  ).startOf("day");
};

export const isBirthday = (dateOfBirth: PartialDate) => {
  const [, month, day] = splitPartialDate(dateOfBirth);
  if (month === undefined || day === undefined) return false;

  const today = getToday();
  return today.month === month && today.day === day;
};

export const calculateAge = (dateOfBirth: PartialDate) => {
  const accurate = splitPartialDate(dateOfBirth).length === 3;
  const { years, months, days } = getToday()
    .diff(parsePartialDate(dateOfBirth), ["years", "months", "days"])
    .toObject();

  if (years)
    return `${accurate ? "" : "~"}${years} year${years === 1 ? "" : "s"}`;
  if (months)
    return `${accurate ? "" : "~"}${months} month${months === 1 ? "" : "s"}`;

  const floorDays = Math.floor(days ?? 0);
  return `${accurate ? "" : "~"}${floorDays} day${floorDays === 1 ? "" : "s"}`;
};

/**
 * converts a date to a string of the date in the format Month DD, YYYY or Month YYYY or YYYY
 * @param date date in the format YYYY-MM-DD or YYYY-MM or YYYY
 * @returns a string of the date in the format Month DD, YYYY or Month YYYY or YYYY
 */
export function formatDate(date: string, approximate = true): string {
  const dateArray = date.split("-");
  let day = dateArray[2];
  let month = dateArray[1];
  const year = dateArray[0];

  if (month && day) {
    month = monthConverter(parseInt(month));
    day = parseInt(day) + getDaySuffix(parseInt(day));
  } else if (month) {
    month = monthConverter(parseInt(month));
  }

  if (day && month && year) return `${month} ${day}, ${year}`;
  else if (month && year) return `${approximate ? "~" : ""}${month}, ${year}`;

  return `${approximate ? "~" : ""}${year}`;
}

/**
 * converts the numerical month to the name of the month
 * @param month month number (1-12)
 * @returns the name corresponding to the month number
 */
function monthConverter(month: number) {
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  if (month < 0 || month > 12) return "Invalid month";

  return monthNames[month - 1];
}

/**
 * @param day day of the month (1-31)
 * @returns the suffix of the day (st, nd, rd, or th)
 */
function getDaySuffix(day: number): string {
  if (day < 1 || day > 31) return "";

  if (day === 1 || day === 21 || day === 31) return "st";
  else if (day === 2 || day === 22) return "nd";
  else if (day === 3 || day === 23) return "rd";
  else return "th";
}

/**
 * Parse a partial date string into a Date object
 *
 * @param {string} date partial date to parse (e.g. 2023 or 2023-01 or 2023-01-01)
 * @returns {Date|null} Date object if the date is valid, null otherwise
 */
function parseDate(date: string): Date | null {
  const dateArray = date.split("-");
  const day = parseInt(dateArray[2] ?? "");
  const month = parseInt(dateArray[1] ?? "");
  const year = parseInt(dateArray[0] ?? "");

  if (!isNaN(day) && !isNaN(month) && !isNaN(year))
    return new Date(year, month - 1, day);
  else if (!isNaN(month) && !isNaN(year)) return new Date(year, month - 1);
  else if (!isNaN(year)) return new Date(year);

  return null;
}

/**
 * Sorts the dates in descending order, with nulls at the end
 *
 * @param {string|null} a first date to compare
 * @param {string|null} b second date to compare
 * @returns {number}
 */
export function sortDate(a: string | null, b: string | null): number {
  const parsedA = typeof a === "string" ? parseDate(a) : null;
  const parsedB = typeof b === "string" ? parseDate(b) : null;

  if (parsedA === parsedB) return 0;
  else if (parsedA === null || (parsedB !== null && parsedB > parsedA))
    return 1;
  else return -1;
}
