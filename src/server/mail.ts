"use strict";
import nodemailer from "nodemailer";
import { env } from "~/env.mjs";

import type {
  ConfirmationMailType,
  DecisionMailType,
  DeclineProfileRequestMail,
  AcceptProfileRequestMail,
  DonationFormConfirmationMailType,
  MatrimonyDecisionMailType,
  RSVPMailType,
  SendMailType,
} from "~/types/mails";

import { generateKAPMembershipPDF } from "./pdfs/kap-membership";
import { generateYACMembershipPDF } from "./pdfs/yac-membership";

import type {
  KAPMembershipFormValues,
  YACMembershipFormValues,
} from "~/types/forms/membership";
import { createId } from "~/utils/helper";
import { MatrimonyFormValues } from "~/types/forms/matrimony";
import { generateMatrimonyProfilePDF } from "./pdfs/matrimony-profile";
// import generateMatrimonyProfilePDF from "./pdfs/profile-pdf";

// const transporter = nodemailer.createTransport({
//   host: "smtp.gmail.com",
//   port: 465,
//   secure: true,
//   auth: {
//     user: env.EMAIL_USER,
//     pass: env.EMAIL_PASS,
//   },
// });

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false, // For STARTTLS
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
  try {
    const info = await transporter.sendMail({
      from: '"Amil Sindhis" <amilsindhis@gmail.com>',
      to,
      subject,
      html,
      attachments: attachments ?? [],
    });

    console.log("Message sent: %s", info?.messageId);
  } catch (e) {
    console.error("Error sending mail: ", e);
  }
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
  // const subject = "Form Response";

  // const html = `
  //   <div style="font-size: 16px;">
  //     <p>Here is the form response:</p>

  //     <pre>
  //       ${JSON.stringify(data, null, 2)}
  //     </pre>
  //   </div>
  // `;

  const formName = formType === "kap-membership" ? "KAP" : "YAC";
  const subject = `New ${formName} Form Submission`;
  /* eslint-disable  @typescript-eslint/no-unsafe-assignment */
  const { personalInfo, paymentId } = data;
  /* eslint-disable  @typescript-eslint/no-unsafe-assignment */
  const { firstName, lastName, emailId } = personalInfo;

  const html = `
    <div style="font-size: 16px;">
      <p>A new ${formName} form has been filled.</p>
      <p>Name: ${firstName} ${lastName}</p>
      <p>Email: ${emailId}</p>
      <p>Amount Paid: ${paymentId}</p>
    </div>
  `;

  let pdf;
  if (formType === "kap-membership") {
    pdf = await generateKAPMembershipPDF({
      membershipNumber: createId().toUpperCase(),
      kapForm: data as KAPMembershipFormValues,
    });
  } else if (formType === "yac-membership") {
    pdf = await generateYACMembershipPDF({
      membershipNumber: createId().toUpperCase(),
      yacForm: data as YACMembershipFormValues,
    });
  }

  await sendMail({
    to,
    subject,
    html,
    attachments: [{ filename: "response-doc.pdf", content: pdf }],
  });
}

export const sendMatrimonyProfileMail = async (
  to: string,
  attachment_data: any,
  requested_name: string,
  requested_matrimony_id: string
) => {
  const subject = `Matrimony Profile Request for ${requested_name}, ${requested_matrimony_id}`;

  const html = `
    <div style="font-size: 16px;">
      <p>Your Request for matrimony profile: ${requested_matrimony_id}</p>
    </div>
  `;

  const pdf = await generateMatrimonyProfilePDF({
    profileData: attachment_data,
  });
  await sendMail({
    html,
    subject,
    to,
    attachments: [
      {
        filename: `${requested_name}(${requested_matrimony_id}).pdf`,
        content: pdf,
      },
    ],
  });
};

export const sendFormConfirmationMail = async ({
  to,
  formName,
  isPrevMember,
}: ConfirmationMailType) => {
  const subject = `Thank you for submitting the ${formName} form!`;

  let html: string = ``;

  if (isPrevMember) {
    html = `
    <div style="font-size: 16px;">
      <p>Welcome to the new digital ${formName} community, while we are in the process of building our digital comunity we will provide you with a KAP ID soon and integrate you on to our database after performing some background checks just to confirm your details. We will get back to you shortly.</p>
    </div>
  `;
  } else {
    html = `
    <div style="font-size: 16px;">
      <p>Your response to the ${formName} form has been successfully recorded. We will get back to you shortly.</p>
    </div>
  `;
  }

  await sendMail({ to, subject, html });
};

export const sendDescisionMail = async ({
  descision,
  formType,
  to,
  membershipID,
}: DecisionMailType) => {
  const subject = `${formType} Application Descision`;
  let html = ``;

  if (descision) {
    html = `
    <div style="font-size: 16px;">
      <p>Congratulations on being Accepted into our community as a honarary ${formType} member</p>
      <p> ${formType} Membership ID: ${membershipID ?? ""}</p>
    </div>
  `;
  } else {
    html = `
    <div style="font-size: 16px;">
      <p>After carefully reviewing your application with ${formType} community. We regret to inform you that we would not be</p>
      <p>able to grant you a ${formType} Membership. We understand this may be dejecting but this in no way defines your ability and charecter</p>
      <p>Your payment will be refunded in 7 to 8 working days.</p>
    </div>
  `;
  }

  console.log({ descision, formType, to, membershipID, html });

  await sendMail({ html, subject, to });
};

export const sendMatrimonyDescisionMail = async ({
  descision,
  to,
  matrimonyID,
}: MatrimonyDecisionMailType) => {
  const subject = `Matrimony Application Descision`;
  let html = ``;

  if (descision) {
    html = `
    <div style="font-size: 16px;">
      <p>Your Matrimony application has been approved by the community, We hope you find your perfect match. Below is your matrimony ID</p>
      <p> Matrimony ID: ${matrimonyID ?? ""}</p>
    </div>
  `;
  } else {
    html = `
    <div style="font-size: 16px;">
      <p>After carefully reviewing your application with the community. We regret to inform you that we would not be</p>
      <p>able to grant you a Matrimony ID. We understand this may be dejecting but this in no way defines your ability and charecter</p>
    </div>
  `;
  }

  console.log({ descision, to, html });

  await sendMail({ html, subject, to });
};

export const sendDeclineRequestMail = async ({
  to,
  requested_MatID,
  requested_name,
}: DeclineProfileRequestMail) => {
  const subject = `Profile Request Declined`;
  const html = `We regret to inform you that your profile request for ${requested_name}, ${requested_MatID} has been declined. For any queries please email info@amilsindhis.org`;

  await sendMail({ html, subject, to });
};

// export const sendAcceptRequestMail = async ({
//   requested_MatID,
//   requested_name,
//   submission,
//   to,
// }: AcceptProfileRequestMail) => {
//   const matrimonyProfilePDF = generateMatrimonyProfilePDF(submission);
//   const attachments = [
//     {
//       filename: `${requested_name}_${requested_MatID}.pdf`,
//       content: Buffer.from(matrimonyProfilePDF),
//     },
//   ];
//   const subject = `Profile Request for ${requested_name}, ${requested_MatID}`;
//   const html = `Your Request for matrimony profile data of ${requested_name} has been approved. PFA the attached document`;
//   await sendMail({ to, html, subject, attachments });
// };

/* eslint-disable  @typescript-eslint/no-explicit-any */
export const sendMatrimonyFormNotificationMail = async (
  to: string,
  /* eslint-disable  @typescript-eslint/no-unsafe-assignment */
  formData: any
) => {
  const { personalInfo } = formData;
  const { firstName, lastName, emailId } = personalInfo;
  const subject = `New Matrimony Form Submission`;

  const html = `
    <div style="font-size: 16px;">
      <p>A new Matrimony form has been filled.</p>
      <p>Name: ${firstName} ${lastName}</p>
      <p>Email: ${emailId}</p>
    </div>
  `;

  await sendMail({ to, subject, html });
};

export const sendDonationFormConfirmationMail = async ({
  amount,
  donorName,
  email,
}: DonationFormConfirmationMailType) => {
  const subject = `Thank you for your donation, ${donorName.split(" ")[0]}!`;

  const html = `
    <div style="font-family: Arial, sans-serif; font-size: 16px;">
      <p>Dear ${donorName.split(" ")[0]},</p>
      <p>Thank you for your generous donation of Rs. ${amount}/- to the Amil Sindhis community.</p>
      <p>Your support helps us continue our mission and assist those in our community who need it most.</p>
      <p>Thank you again for your support!</p>
      <p>Best regards,</p>
      <p><strong>Team Amil Sindhis</strong></p>
    </div>
  `;

  await sendMail({ to: email, subject, html });
};

export const sendWithdrawNotificationMail = async (
  user_name: string,
  matrimony_id: string
) => {
  const subject = `Application Withdrawn`;
  const html = `Matrimony Application Withdrawn: ${user_name}, ${matrimony_id}`;
  await sendMail({ to: "amilsindhis@gmail.com", subject, html });
};

export const sendDonationNotificationMail = async (
  to: string,
  formData: {
    donorName: string;
    email: string;
    phone: string;
    amount: number;
    panCardUrl: string;
    addressProofUrl: string;
  }
) => {
  const { donorName, email, phone, amount, panCardUrl, addressProofUrl } =
    formData;
  const subject = `New Donation Received`;

  const html = `
    <div style="font-size: 16px;">
      <p>A new donation has been received.</p>
      <p>Donor Name: ${donorName}</p>
      <p>Phone: ${phone}</p>
      <p>Email: ${email}</p>
      <p>Amount: ${amount}</p>
      <p>PAN Card: ${panCardUrl}</p>
      <p>Address Proof: ${addressProofUrl}</p>
    </div>
  `;

  await sendMail({ to, subject, html });
};

export const sendRsvpMailForEvent = async ({
  to,
  eventTitle,
  eventDate,
}: RSVPMailType) => {
  try {
    const subject = `RSVP confirmation for ${eventTitle}, held on ${eventDate.toLocaleDateString(
      "en-IN",
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
  } catch (e) {
    console.error(e);
  }
};
