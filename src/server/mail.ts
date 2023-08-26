"use strict";
import nodemailer from "nodemailer";

import { env } from "~/env.mjs";

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: env.EMAIL_USER,
    pass: env.EMAIL_PASS,
  },
});

export async function sendMail(to: string, subject: string, html?: string) {
  const info = await transporter.sendMail({
    from: '"Amil Sindhis" <amilsindhis@gmail.com>',
    to,
    subject,
    html: html ?? "",
  });

  console.log("Message sent: %s", info.messageId);
}

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

  await sendMail(to, subject, html);
}

export async function sendFormConfirmationMail(to: string, formName: string) {
  const subject = `Thank you for submitting the ${formName} form!`;

  const html = `
    <div style="font-size: 16px;">
      <p>Your response to the ${formName} form has been successfully recorded. We will get back to you shortly.</p>
    </div>
  `;

  await sendMail(to, subject, html);
}
