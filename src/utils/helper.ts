import { init } from "@paralleldrive/cuid2";

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
