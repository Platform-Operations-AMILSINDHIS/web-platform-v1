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
  AddAdminMailType,
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

import { SendEmailCommand, SendRawEmailCommand } from "@aws-sdk/client-ses";
import { sesClient } from "~/lib/aws/ses";

export const sendMail = async ({
  to,
  subject,
  html,
  attachments,
  cc,
  source = "noreply",
}: SendMailType & { source?: string }) => {
  const ccAddresses = cc
    ? Array.isArray(cc)
      ? cc
      : [cc]
    : [];

  try {
    if (attachments && attachments.length > 0) {
      // Use nodemailer to build the raw MIME message (supports CC natively)
      const mailOptions = {
        from: `${source}@amilsindhis.org`,
        to,
        cc: ccAddresses.length > 0 ? ccAddresses : undefined,
        subject,
        html,
        attachments,
      };

      // Create a dummy transporter to compile the email
      const dummyTransporter = nodemailer.createTransport({
        streamTransport: true,
        newline: "unix",
        buffer: true,
      });

      const info = (await dummyTransporter.sendMail(mailOptions)) as {
        message: Buffer;
      };
      const rawMessage = info.message;

      const command = new SendRawEmailCommand({
        RawMessage: {
          Data: rawMessage,
        },
      });

      const result = await sesClient.send(command);
      console.log("SES Raw Message sent: %s", result.MessageId);
      return;
    }

    const command = new SendEmailCommand({
      Source: `${source}@amilsindhis.org`,
      Destination: {
        ToAddresses: [to],
        CcAddresses: ccAddresses.length > 0 ? ccAddresses : undefined,
      },
      Message: {
        Subject: {
          Data: subject,
          Charset: "UTF-8",
        },
        Body: {
          Html: {
            Data: html,
            Charset: "UTF-8",
          },
        },
      },
    });

    const result = await sesClient.send(command);
    console.log("SES Message sent: %s", result.MessageId);
  } catch (e) {
    console.error("Error sending SES mail: ", e);
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

  await sendMail({ to, subject, html, source: "noreply" });
}

/* eslint-disable  @typescript-eslint/no-explicit-any */
export async function sendRawJsonDataWithPDF(
  to: string,
  data: any,
  formType: "kap-membership" | "yac-membership"
) {
  const formName = formType === "kap-membership" ? "KAP" : "YAC";
  const source = "noreply";
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
    source,
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
    cc: "amilsindhis@gmail.com",
    attachments: [
      {
        filename: `${requested_name}(${requested_matrimony_id}).pdf`,
        content: pdf,
      },
    ],
    source: "noreply",
  });
};

export const sendFormConfirmationMail = async ({
  to,
  formName,
  isPrevMember,
}: ConfirmationMailType) => {
  const subject = `Thank you for submitting the ${formName} form!`;
  const source = "noreply";

  let html = ``;

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

  await sendMail({ to, subject, html, source });
};

export const sendDescisionMail = async ({
  descision,
  formType,
  to,
  membershipID,
  isPrevMember,
}: DecisionMailType) => {
  const subject = `${formType} Application Descision`;
  const source = "noreply";
  let html = ``;

  if (descision) {
    if (isPrevMember) {
      html = `
  <div style="font-size: 16px;">
    <p>Congratulations on now being a part of our digital ${formType} community, Below is ur ID and make sure to save it</p>
    <p> ${formType} Membership ID: ${membershipID ?? ""}</p>
  </div>
`;
    } else {
      html = `
  <div style="font-size: 16px;">
    <p>Congratulations on being Accepted into our community as a honarary ${formType} member</p>
    <p> ${formType} Membership ID: ${membershipID ?? ""}</p>
  </div>
`;
    }
  } else {
    if (isPrevMember) {
      html = `
  <div style="font-size: 16px;">
    <p>After carefully reviewing your application with ${formType} community. We regret to inform you that we cannot onboard you as a part of our digital community</p>
    <p>We reviewed your application carefully and found a few descrepencies, please resubmit the form on the website once again if needed, so we can take another look</p>
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
  }

  console.log({ descision, formType, to, membershipID, html });

  await sendMail({ html, subject, to, source });
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

  await sendMail({ html, subject, to, source: "noreply" });
};

export const sendDeclineRequestMail = async ({
  to,
  requested_MatID,
  requested_name,
}: DeclineProfileRequestMail) => {
  const subject = `Profile Request Declined`;
  const html = `We regret to inform you that your profile request for ${requested_name}, ${requested_MatID} has been declined. For any queries please email info@amilsindhis.org`;

  await sendMail({ html, subject, to, source: "noreply" });
};

// export const sendAcceptRequestMail = async ({
//   requested_MatID,
//   requested_name,
//   submission,
//   to,
//   }: AcceptProfileRequestMail) => {
//   const matrimonyProfilePDF = generateMatrimonyProfilePDF(submission);
//   const attachments = [
//     {
//       filename: `${requested_name}_${requested_MatID}.pdf`,
//       content: Buffer.from(matrimonyProfilePDF),
//     },
//   ];
//   const subject = `Profile Request for ${requested_name}, ${requested_MatID}`;
//   const html = `Your Request for matrimony profile data of ${requested_name} has been approved. PFA the attached document`;
//   await sendMail({ to, html, subject, attachments, source: "matrimony" });
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

  await sendMail({ to, subject, html, source: "noreply" });
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

  await sendMail({ to: email, subject, html, source: "noreply" });
};

export const sendWithdrawNotificationMail = async (
  user_name: string,
  matrimony_id: string
) => {
  const subject = `Application Withdrawn`;
  const html = `Matrimony Application Withdrawn: ${user_name}, ${matrimony_id}`;
  await sendMail({ to: "amilsindhis@gmail.com", subject, html, source: "noreply" });
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
    paymentTransactionID: string;
  }
) => {
  const {
    donorName,
    email,
    phone,
    amount,
    panCardUrl,
    addressProofUrl,
    paymentTransactionID,
  } = formData;
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
      <p>Payment Transaction: ${paymentTransactionID}</p>
    </div>
  `;

  await sendMail({ to, subject, html, source: "noreply" });
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
      <p>Hey there thank you for showing interest in our event ${eventTitle}, we will have your name entered in our logs when you attend the event and we can verify you</p>
  </div>
  `;

    await sendMail({ to, subject, html, source: "noreply" });
  } catch (e) {
    console.error(e);
  }
};

export const sendAdminEntryMail = async ({
  password,
  to,
  username,
}: AddAdminMailType) => {
  const subject = `Admin Account Details`;
  const html = `
    <div style="font-size: 16px;">
      <p>You have been granted admin access. below are your credentials and link to login</p>
      <p>Email: ${to}, admin_password: ${password}, admin_username: ${username}</p>
      <p>Head over and login onto : https://amilsindhis.org/admin/auth , to access the admin panel</p>
    </div>
  `;

  await sendMail({ to, subject, html, source: "auth" });
};
