import { DateTime, Info } from "luxon";

const timezone = process.env.REACT_APP_TIMEZONE || "UTC";

export const getToday = () => DateTime.now().setZone(timezone).startOf("day");

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

const getMonthName = (month: number) => {
  if (month < 1 || month > 12) throw new Error("Invalid month");
  return Info.months("long")[month - 1];
};

const getOrdinal = (number: number) => {
  if (number < 1) throw new Error("Invalid number");
  const lastDigit = number % 10;
  const lastTwoDigits = number % 100;
  if (lastTwoDigits >= 11 && lastTwoDigits <= 13) return "th";
  if (lastDigit === 1) return "st";
  if (lastDigit === 2) return "nd";
  if (lastDigit === 3) return "rd";
  return "th";
};

export const formatDate = (date: PartialDate, showApproximate = true) => {
  const [year, month, day] = splitPartialDate(date);

  const formattedMonth = month && getMonthName(month);
  const formattedDay = day && `${day}${getOrdinal(day)}`;

  if (day && month && year) return `${formattedMonth} ${formattedDay}, ${year}`;
  if (month && year)
    return `${showApproximate ? "~" : ""}${formattedMonth}, ${year}`;
  return `${showApproximate ? "~" : ""}${year}`;
};

export const sortPartialDates = (
  a: PartialDate | null,
  b: PartialDate | null,
) => {
  const parsedA = typeof a === "string" ? parsePartialDate(a).toMillis() : null;
  const parsedB = typeof b === "string" ? parsePartialDate(b).toMillis() : null;

  if (parsedA === parsedB) return 0;
  else if (parsedA === null || (parsedB !== null && parsedB > parsedA))
    return 1;
  else return -1;
};
