import { useEffect } from "react";
import useRazorpay, { RazorpayOptions } from "react-razorpay";
import axios from "axios";
import error from "next/error";

const usePayment = () => {
  const [Razorpay, isLoaded] = useRazorpay();

  const loadSDKScript = (src: string) => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = src;

      script.onload = () => {
        resolve(true);
      };

      script.onerror = () => {
        resolve(false);
      };

      document.body.appendChild(script);
    });
  };

  const handlePayment = async (amount: number) => {
    try {
      const response = await loadSDKScript(
        "https://checkout.razorpay.com/v1/checkout.js"
      );

      if (!response) {
        console.log("Error");
        return;
      }

      const {
        data: { key },
      } = await axios.get("http://localhost:5000/getkey");
      const {
        data: { order },
        status,
      } = await axios.post("http://localhost:5000/checkout", {
        amount: amount,
      });

      if (status !== 200) {
        throw error;
      }

      const options: RazorpayOptions = {
        key: key,
        amount: order.amount,
        currency: "INR",
        name: "Khudabadi Amil Panchayat",
        description: "Payment for membership",
        image: "https://example.com/your_logo",
        order_id: order.id,
        callback_url: "http://localhost:5000/paymentVerify",
        prefill: {
          name: "Akshat Sabavat",
          email: "akshat.sabavat@gmail.com",
          contact: "9676107181",
        },
        notes: {
          address: "Razorpay Corporate Office",
        },
        theme: {
          color: "#3399cc",
        },
      };

      console.log(order);
      console.log(window);
      const gateway = new window.Razorpay(options);
      gateway.open();
    } catch (error) {
      console.log(error);
    }
  };

  return { handlePayment };
};

export default usePayment;
