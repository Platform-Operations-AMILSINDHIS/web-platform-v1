"use strict";
import nodemailer from "nodemailer";
import { env } from "~/env.mjs";

import type {
  ConfirmationMailType,
  RSVPMailType,
  SendMailType,
} from "~/types/mails";

import { generateKAPMembershipPDF } from "./pdfs/kap-membership";

import type { KAPMembershipFormValues } from "~/types/forms/membership";

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: env.EMAIL_USER,
    pass: env.EMAIL_PASS,
  },
});

export const sendMail = async ({
  to,
  subject,
  html,
  attachments,
}: SendMailType) => {
  const info = await transporter.sendMail({
    from: '"Amil Sindhis" <amilsindhis@gmail.com>',
    to,
    subject,
    html,
    attachments,
  });
  // let info;
  // if (attachments?.length !== 0) {
  //   info = await transporter.sendMail({
  //     from: '"Amil Sindhis" <amilsindhis@gmail.com>',
  //     to,
  //     subject,
  //     html,
  //     attachments,
  //   });
  // } else {
  //   info = await transporter.sendMail({
  //     from: '"Amil Sindhis" <amilsindhis@gmail.com>',
  //     to,
  //     subject,
  //     html,
  //   });
  // }

  console.log("Message sent: %s", info?.messageId);
};

/* eslint-disable  @typescript-eslint/no-explicit-any */
export async function sendRawJsonDataOnly(to: string, data: any) {
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

/* eslint-disable  @typescript-eslint/no-explicit-any */
export async function sendRawJsonDataWithPDF(
  to: string,
  data: any,
  formType: "kap-membership" | "yac-membership"
) {
  const subject = "Form Response";

  const html = `
    <div style="font-size: 16px;">
      <p>Here is the form response:</p>

      <pre>
        ${JSON.stringify(data, null, 2)}
      </pre>
    </div>
  `;

  let pdf;
  if (formType === "kap-membership") {
    pdf = await generateKAPMembershipPDF({
      // TODO: Dynamically generate membership number
      membershipNumber: "123456",
      kapForm: data as KAPMembershipFormValues,
    });
  }

  await sendMail({
    to,
    subject,
    html,
    attachments: [{ filename: "response-doc.pdf", content: pdf }],
  });
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
  const subject = `RSVP confirmation for ${eventTitle}, held on ${eventDate.toLocaleDateString(
    "en-GB",
    {
      day: "numeric",
      month: "short",
      year: "numeric",
    }
  )} `;

  const html = `
  <div style="font-size: 16px;">
      <p>Hey there thank you for showing intrest in our event, attached below is your uniquely generated RSVP token that is to be shown prior to entering the event</p>
  </div>
  `;

  await sendMail({ to, subject, html });
};
