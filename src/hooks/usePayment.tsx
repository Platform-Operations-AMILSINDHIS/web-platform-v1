import cuid from "cuid";
import { useCallback } from "react";
import useRazorpay, { type RazorpayOptions } from "react-razorpay";

const usePayment = () => {
  const handlePayment = () => {
    console.log("Press me for payment");
  };

  return { handlePayment };
};

export default usePayment;
