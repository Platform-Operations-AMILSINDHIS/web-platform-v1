import { env } from "~/env.mjs";

import type { NextApiRequest, NextApiResponse } from "next";

import Razorpay from "razorpay";

interface RazorpayPaymentHandlerRequest extends NextApiRequest {
  body: {
    amount: number;
    receipt: string;
  };
}

const RazorpayPaymentHandler = async (
  req: RazorpayPaymentHandlerRequest,
  res: NextApiResponse
) => {
  try {
    const instance = new Razorpay({
      key_id: env.RAZORPAY_KEY_ID,
      key_secret: env.RAZORPAY_SECRET,
    });

    const options = {
      amount: req.body.amount, // amount in smallest currency unit
      receipt: req.body.receipt,
      currency: "INR",
    };

    const order = await instance.orders.create(options);

    if (!order)
      return res.status(500).json({
        status: "error",
        message: "some error occurred",
        order: "",
      });

    res.status(200).json({ status: "success", message: "Worked :)", order });
  } catch (e) {
    res.status(500).json({ status: "error", message: e, order: "" });
  }
};

export default RazorpayPaymentHandler;
