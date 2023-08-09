import { z } from "zod";

export const familyMemberSchema = z.object({
  memberName: z.string().optional(),
  relationship: z.string().optional(),
  occupation: z.string().optional(),
  age: z.number().optional().nullable(),
});

export const personalInfoSchema = z.object({
  firstName: z.string(),
  middleName: z.string(),
  lastName: z.string(),
  occupation: z.string(),
  dateOfBirth: z.date(),
  mobileNumber: z.string(),
  emailId: z.string(),
  maidenSurname: z.string(),
  maidenName: z.string(),
  fathersName: z.string(),
  mothersName: z.string(),
});

export const addressInfoSchema = z.object({
  residentialAddress: z.object({
    addressLine1: z.string(),
    addressLine2: z.string(),
    addressLine3: z.string(),
    pinCode: z.string(),
  }),
  officeAddress: z
    .object({
      addressLine1: z.string(),
      addressLine2: z.string(),
      addressLine3: z.string(),
      pinCode: z.string(),
    })
    .optional(),
});

export const kapMembershipInfoSchema = z.object({
  membershipType: z
    .union([z.literal("patron"), z.literal("life-member")])
    .nullable(),
});

export const proposerInfoSchema = z.object({
  firstName: z.string(),
  lastName: z.string(),
  mobileNumber: z.string(),
});

export const kapMembershipFormValuesSchema = z.object({
  personalInfo: personalInfoSchema,
  addressInfo: addressInfoSchema,
  membershipInfo: kapMembershipInfoSchema,
  familyMembers: z.array(familyMemberSchema).optional(),
  proposerInfo: proposerInfoSchema,
});

export const yacMembershipFormValuesSchema = z.object({
  personalInfo: personalInfoSchema,
  addressInfo: addressInfoSchema,
  familyMembers: z.array(familyMemberSchema).optional(),
  proposerInfo: proposerInfoSchema,
});
