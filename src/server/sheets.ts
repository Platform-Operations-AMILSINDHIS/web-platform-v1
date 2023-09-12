import { GoogleSpreadsheet as GSheet } from "google-spreadsheet";
import { JWT } from "google-auth-library";

import { env } from "~/env.mjs";

const serviceAccountAuth = new JWT({
  email: env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
  // key: env.GOOGLE_PRIVATE_KEY.replace(/\\n/gm, '\n'),
  key: env.GOOGLE_PRIVATE_KEY,
  scopes: ["https://www.googleapis.com/auth/spreadsheets"],
});

const doc = new GSheet(env.GOOGLE_SHEET_ID, serviceAccountAuth);

export const rsvpForEvent = async ({
  eventName,
  name,
  email,
}: RSVPSheetType) => {
  await doc.loadInfo();
  console.log({ title: doc.title });

  const sheet = doc.sheetsByTitle[`${eventName} participants`];
  if (!sheet) {
    console.log("Sheet not found");
    const newEventSheet = await doc.addSheet({
      title: `${eventName} participants`,
      headerValues: ["name", "email"],
    });
    await newEventSheet.addRow({
      eventName,
      name,
      email,
    });
  } else {
    await sheet.addRow({
      eventName,
      name,
      email,
    });
  }
};

export default doc;
