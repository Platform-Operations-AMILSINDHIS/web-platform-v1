import { env } from "~/env.mjs";

import type { NextApiRequest, NextApiResponse } from "next";

import Razorpay from "razorpay";

const RazorpayPaymentHandler = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  try {
    const instance = new Razorpay({
      key_id: env.RAZORPAY_KEY_ID,
      key_secret: env.RAZORPAY_SECRET,
    });

    const options = {
      amount: 5000, // amount in smallest currency unit
      currency: "INR",
      receipt: "receipt_order_74394",
    };

    const order = await instance.orders.create(options);

    if (!order)
      return res.status(500).json({
        status: "error",
        message: "some error occurred",
        order: "",
      });

    res.status(200).json({ status: "success", order, message: "Worked :)" });
  } catch (e) {
    res.status(500).json({ status: "error", message: e, order: "" });
  }
};

export default RazorpayPaymentHandler;
