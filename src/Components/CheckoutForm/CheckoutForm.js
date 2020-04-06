import React from "react";

import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { useState } from "react";

const CheckoutForm = (props) => {
  const [paymentError, setPaymentError] = useState(null);
  const [paymentFinished, setPaymentFinished] = useState(null);
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: elements.getElement(CardElement),
    });
    if (error) {
      setPaymentError(error.message);
      setPaymentFinished(null);
    } else {
      setPaymentFinished(paymentMethod);
      const payment = { id: paymentMethod.id, last4: paymentMethod.last4 };
      props.handlePlaceOrder(payment);

      setPaymentError(null);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <CardElement />
      <button
        className="btn btn-danger btn-block border-top mt-3"
        type="submit"
        disabled={!stripe}
      >
        Pay
      </button>
      {paymentError && <p className="text-danger">{paymentError}</p>}
      {paymentFinished && <p className="text-success">Payment Successfull!</p>}
    </form>
  );
};

export default CheckoutForm;
