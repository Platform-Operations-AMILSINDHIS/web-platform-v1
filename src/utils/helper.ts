import { init } from "@paralleldrive/cuid2";
import { ToWords } from "to-words";

export const convertDATE = (date: Date) => {
  const inputDate = new Date(date);

  const formattedDate = inputDate.toLocaleString("en-US", {
    day: "numeric",
    month: "short",
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  });
  return formattedDate;
};

export const convertDateV2 = (input: Date) => {
  const date = new Date(input);

  const formatter = new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  const formattedDate = formatter.format(date);
  return formattedDate;
};

export const getTimeFromDate = (date: Date) => {
  const inputDate = new Date(date);

  const formattedTime = inputDate.toLocaleString("en-US", {
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  });

  return formattedTime;
};

export const getDayOfWeekFromDate = (date: Date) => {
  const inputDate = new Date(date);

  const formattedDayOfWeek = inputDate.toLocaleString("en-US", {
    weekday: "long",
  });

  return formattedDayOfWeek;
};

export const formatDate = (date: Date) => {
  const inputDate = new Date(date);

  const formattedDate = inputDate.toLocaleString("en-US", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

  return formattedDate;
};

export const createId = init({
  random: Math.random,
  length: 6,
  fingerprint: "D6LzbC7JIVWrYVJcamWshmLkrUFpHM",
});

export const toWords = new ToWords({
  localeCode: "en-IN",
});

export const formatCreatedTime = (dateString: string) => {
  const date = new Date(dateString);
  const readableDate = date.toLocaleDateString("en-us", {
    timeZone: "UTC",
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  return readableDate;
};
