import React from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import PaymentCard from './PaymentCard';
import SplitPaymentCard from './SplitPaymentCard';


// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
const stripePromise = loadStripe('pk_test_51HanohEPr5PzrnPJ6i3RanF17Jzvx2a5UTBGeVJRN2hIe4PEiWlcbRJZIKUcpsvs5i4fR07AbO7Es5Mx8Lmtjmr000MkcdChnE');

const ProcessPayment = ({handlePayment}) => {
    return (
        <Elements stripe={stripePromise}>
            <h4>This is Payment</h4>
            <PaymentCard handlePayment={handlePayment}></PaymentCard>
            {/* <SplitPaymentCard></SplitPaymentCard> */}
        </Elements>
    );
};

export default ProcessPayment;