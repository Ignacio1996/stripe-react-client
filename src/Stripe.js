import React, { Component, useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  CardElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";

import axios from "axios";

const stripeTestPromise = loadStripe(
  "pk_test_IgMq4trDOcxe2pbZs8F0d8PV00kErQAneo"
);
const stripeLivePromise = loadStripe(
  "pk_live_24UupglxP9tOgYzhst0UFLU600Y9pAczQc"
);

const CheckoutForm = ({ _setPaidUser, _getUserData }) => {
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

export class Stripe extends Component {
  createToken = async (event) => {
    const stripe = useStripe();
    const elements = useElements();

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

  render() {
    return (
      <Elements stripe={stripeTestPromise}>
        {/* <CheckoutForm
          _setPaidUser={this.props._setPaidUser}
          _getUserData={this.props._getUserData}
          paidUser={this.props.paidUser}
        /> */}
        <form onSubmit={this.createToken}>
          <CardElement />
          <button>Pay</button>
        </form>
      </Elements>
    );
  }
}

export default Stripe;
