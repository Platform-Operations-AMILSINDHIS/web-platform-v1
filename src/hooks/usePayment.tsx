import cuid from "cuid";
import { useCallback } from "react";
import {} from 'razorpay'
import axios from "axios";
import error from "next/error";

const usePayment = () => {
  const handlePayment = async (amount: number) => {
    try {
      const {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
        data: { key },
      } = await axios.get("http://localhost:5000/getkey");
      const {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        data: { order },
        status,
      } = await axios.post("http://localhost:5000/checkout", {
        amount: amount,
      });
      if (status !== 200) throw error;
      const options = {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
        key: key,
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
        amount: order.amount,
        currency: "INR",
        name: "Khudabadi Amil Panchayat", //your business name
        description: "Payment for membership",
        image: "https://example.com/your_logo",
        order_id: "order_9A33XWu170gUtm", //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
        callback_url: "http://localhost:5000/paymentVerify",
        prefill: {
          name: "Gaurav Kumar",
          email: "gaurav.kumar@example.com",
          contact: "9000090000",
        },
        notes: {
          address: "Razorpay Corporate Office",
        },
        theme: {
          color: "#3399cc",
        },
      };
      console.log(order);
      const razorpayGateway = new 
    } catch (error) {
      console.log(error);
    }
  };

  return { handlePayment };
};

export default usePayment;
