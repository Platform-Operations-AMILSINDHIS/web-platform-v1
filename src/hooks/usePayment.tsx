import cuid from "cuid";
import { useCallback } from "react";
import axios from "axios";
import useRazorpay, { type RazorpayOptions } from "react-razorpay";

const usePayment = () => {
  const handlePayment = async (amount: number) => {
    try {
      const { data, status } = await axios.post(
        "http://localhost:5000/checkout",
        {
          amount: amount,
        }
      );
      if (status !== 200) throw error;
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
      const order = data.order;
      console.log(order);
    } catch (error) {
      console.log(error);
    }
  };

  return { handlePayment };
};

export default usePayment;
