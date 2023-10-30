import { env } from "~/env.mjs";

import type { NextApiRequest, NextApiResponse } from "next";

import crypto from "crypto";

import { prisma } from "~/server/db";

interface RazorpayPaymentSuccessRequest extends NextApiRequest {
  body: {
    orderCreationId: string;
    razorpayPaymentId: string;
    razorpayOrderId: string;
    razorpaySignature: string;
    userEmail: string;
  };
}

// const RazorpayPaymentSuccessHandler = async (
const RazorpayPaymentSuccessHandler = (
  req: RazorpayPaymentSuccessRequest,
  res: NextApiResponse
) => {
  try {
    // getting the details back from frontend
    console.log({ rpSuccessReqBody: req.body });

    const {
      orderCreationId,
      razorpayPaymentId,
      razorpayOrderId,
      razorpaySignature,
      userEmail,
    } = req.body;

    // Creating our own digest
    // The format should be like this:
    // digest = hmac_sha256(orderCreationId + "|" + razorpayPaymentId, secret);
    const shasum = crypto.createHmac("sha256", env.RAZORPAY_SECRET);

    shasum.update(`${orderCreationId}|${razorpayPaymentId}`);

    const digest = shasum.digest("hex");

    // comaparing our digest with the actual signature
    if (digest !== razorpaySignature)
      return res.status(500).json({ msg: "error" });

    // THE PAYMENT IS LEGIT & VERIFIED
    // YOU CAN SAVE THE DETAILS IN YOUR DATABASE IF YOU WANT

    console.log("userEmail in success route: ", { userEmail });

    // TODO: Store the payment details in the database here
    // await prisma.booking.create({
    //   data: { slotId, userId: user.id, screenshotFilename: "" },
    // });

    return res.status(200).json({
      msg: "success",
      orderId: razorpayOrderId,
      paymentId: razorpayPaymentId,
    });
  } catch (e) {
    res.status(500).json({ msg: "error", text: e });
  }
};

export default RazorpayPaymentSuccessHandler;
