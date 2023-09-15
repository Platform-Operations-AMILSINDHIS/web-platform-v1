import { GoogleSpreadsheet as GSheet } from "google-spreadsheet";
import { JWT } from "google-auth-library";

import { env } from "~/env.mjs";

const serviceAccountAuth = new JWT({
  email: env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
  key: env.GOOGLE_PRIVATE_KEY,
  scopes: ["https://www.googleapis.com/auth/spreadsheets"],
});

const doc = new GSheet(env.GOOGLE_SHEET_ID, serviceAccountAuth);

export const rsvpForEvent = async ({
  eventTitle,
  name,
  email,
}: RSVPSheetType) => {
  try {
    await doc.loadInfo();
    const sheet = doc.sheetsByTitle[`${eventTitle} participants`];
    if (!sheet) {
      console.log("Sheet not found");
      const newEventSheet = await doc.addSheet({
        title: `${eventTitle} participants`,
        headerValues: ["name", "email"],
      });
      await newEventSheet.addRow({
        name,
        email,
      });
    } else {
      await sheet.addRow({
        name,
        email,
      });
    }
  } catch (e) {
    console.error(e);
  }
};

export default doc;
