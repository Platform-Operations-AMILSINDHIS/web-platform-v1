"use strict";
import nodemailer from "nodemailer";

import { env } from "~/env.mjs";
import {
  ConfirmationMailType,
  RSVPMailType,
  sendMailType,
} from "~/types/mails";

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: env.EMAIL_USER,
    pass: env.EMAIL_PASS,
  },
});

export const sendMail = async ({ to, subject, html }: sendMailType) => {
  const info = await transporter.sendMail({
    from: '"Amil Sindhis" <amilsindhis@gmail.com>',
    to,
    subject,
    html: html ?? "",
  });

  console.log("Message sent: %s", info.messageId);
};

/* eslint-disable  @typescript-eslint/no-explicit-any */
export async function sendRawJsonData(to: string, data: any) {
  const subject = "Form Response";

  const html = `
    <div style="font-size: 16px;">
      <p>Here is the form response:</p>

      <pre>
        ${JSON.stringify(data, null, 2)}
      </pre>
    </div>
  `;

  await sendMail({ to, subject, html });
}

export const sendFormConfirmationMail = async ({
  to,
  formName,
}: ConfirmationMailType) => {
  const subject = `Thank you for submitting the ${formName} form!`;

  const html = `
    <div style="font-size: 16px;">
      <p>Your response to the ${formName} form has been successfully recorded. We will get back to you shortly.</p>
    </div>
  `;

  await sendMail({ to, subject, html });
};

export const sendRSVPMailForEvent = async ({
  to,
  eventTitle,
  eventDate,
}: RSVPMailType) => {
  const subject = `RSVP confirmation for ${eventTitle}, held on ${eventDate}`;

  const html = `
  <div style="font-size: 16px;">
      <p>Hey there thank you for showing intrest in our event, attached below is your uniquely generated RSVP token that is to be shown prior to entering the event</p>
  </div>
  `;

  await sendMail({ to, subject, html });
};
