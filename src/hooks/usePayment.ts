import { useEffect, useState } from "react";
import axios from "axios";

import AmilLogo from "../../public/images/amil-sindhis-logo.png";

import type { RazorpayOptions } from "react-razorpay";

interface RazorpayResponse {
  order: {
    amount: number;
    id: string;
    currency: string;
  };
}

interface RazorpaySuccesshandlerArgs {
  razorpay_signature: string;
  razorpay_order_id: string;
  razorpay_payment_id: string;
}

interface UsePaymentProps {
  prefillDetails: {
    name: string;
    email: string;
    contact?: string;
  };
}

const usePayment = ({
  prefillDetails: { name, email, contact },
}: UsePaymentProps) => {
  const [paymentId, setPaymentId] = useState<string | null>(null);

  const loadScript = (src: string) => {
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

  const handlePayment = async (amount: number, receiptId: string) => {
    try {
      const isScriptLoaded = await loadScript(
        "https://checkout.razorpay.com/v1/checkout.js"
      );

      if (!isScriptLoaded) {
        alert("Razorpay SDK failed to load. Are you online?");
        return;
      }

      const result = await axios.post<RazorpayResponse>("/api/pay", {
        amount,
        receipt: receiptId,
      });

      if (!result?.data || result.status !== 200) {
        alert("Server error. Are you online?");
        console.error("Server Error: ", result);
      }

      const { id: orderId } = result.data.order;

      const options: RazorpayOptions = {
        key: "rzp_test_wuTV2NfMnyAMY4",
        amount: amount.toString(),
        currency: "INR",
        name: "Khudabadi Amil Panchayat",
        description: "Payment for membership",
        image: AmilLogo.src,
        order_id: orderId,
        handler: (response: RazorpaySuccesshandlerArgs) => {
          const data = {
            orderCreationId: orderId,
            razorpayPaymentId: response.razorpay_payment_id,
            razorpayOrderId: response.razorpay_order_id,
            razorpaySignature: response.razorpay_signature,
            userEmail: email,
          };

          axios
            .post("/api/pay/success", data)
            .then((resp) => {
              const res = resp.data as {
                msg: string;
                orderId: string;
                paymentId: string;
              };

              alert("console.logging the response");

              if (res.msg === "success") {
                setPaymentId(res.paymentId);

                console.log("success");
                console.log({ res });
              } else if (resp.data === "error") {
                console.log("error");
                alert("An error occurred with the payment");

                console.log({ res });
              }
            })
            .catch(console.error);
        },
        prefill: {
          name,
          email,
          contact,
        },
        notes: {
          address: "",
        },
        theme: {
          color: "#FF4D00",
        },
      };

      // console.log(order);
      // console.log(window);

      /* eslint-disable 
        @typescript-eslint/ban-ts-comment,
        @typescript-eslint/no-unsafe-assignment,
        @typescript-eslint/no-unsafe-call,
        @typescript-eslint/no-unsafe-member-access
        */
      // @ts-ignore
      const gateway = new window.Razorpay(options);
      gateway.open();
      /* eslint-enable */
    } catch (error) {
      console.log(error);
    }
  };

  return { handlePayment, paymentId };
};

export default usePayment;
