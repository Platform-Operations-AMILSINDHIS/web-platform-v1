import { init } from "@paralleldrive/cuid2";
import { ToWords } from "to-words";
import supabase from "~/pages/api/auth/supabase";

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

export const formatPDFDate = (dateString: Date) => {
  const date = new Date(dateString); // Parse the date string
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Add leading zero for single-digit months
  const day = String(date.getDate()).padStart(2, "0"); // Add leading zero for single-digit days

  return `${day}/${month}/${year}`;
};

export const formatPDFAge = (dateString: Date) => {
  const today = new Date();
  const birthDate = new Date(dateString);
  const birthYear = birthDate.getFullYear();
  const birthMonth = birthDate.getMonth();
  const birthDay = birthDate.getDate();

  let age = today.getFullYear() - birthYear;

  // Adjust age if birthday hasn't happened this year yet
  if (
    today.getMonth() < birthMonth ||
    (today.getMonth() === birthMonth && today.getDate() < birthDay)
  ) {
    age--;
  }

  return age;
};

export const camelCaseToSpaces = (str: string) => {
  return str.replace(/([A-Z])/g, " $1").replace(/^./, function (str) {
    return str.toUpperCase();
  });
};
