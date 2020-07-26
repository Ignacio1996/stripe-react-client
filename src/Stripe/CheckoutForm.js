import React from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";

export const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: elements.getElement(CardElement),
    });

    if (!error) {
      console.log("Stripe 23 | token generated!", paymentMethod);
      const { id } = paymentMethod;
    } else {
      console.log(error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <CardElement />
      <button>Pay</button>
    </form>
  );
};
