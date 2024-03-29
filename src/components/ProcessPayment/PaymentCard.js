import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { useState } from 'react';
import { Button } from 'react-bootstrap';

const PaymentCard = ({ handlePayment }) => {
	const stripe = useStripe();
	const elements = useElements();

	const [paymentError, setPaymentError] = useState('');
	const [paymentSuccess, setPaymentSuccess] = useState('');

	const handleSubmit = async (event) => {
		// Block native form submission.
		event.preventDefault();

		if (!stripe || !elements) {
			// Stripe.js has not loaded yet. Make sure to disable
			// form submission until Stripe.js has loaded.
			return;
		}

		// Get a reference to a mounted CardElement. Elements knows how
		// to find your CardElement because there can only ever be one of
		// each type of element.
		const cardElement = elements.getElement(CardElement);

		// Use your card Element with other Stripe.js APIs
		const { error, paymentMethod } = await stripe.createPaymentMethod({
			type: 'card',
			card: cardElement,
		});

		if (error) {
			setPaymentError(error.message);
			setPaymentSuccess('');
			console.log(error);
		} else {
			setPaymentSuccess(paymentMethod.id);
			setPaymentError('');
			handlePayment(paymentMethod.id);
			console.log('[PaymentMethod]', paymentMethod);
		}
	};

	return (
		<div>
			<form onSubmit={handleSubmit}>
				<CardElement /> <br />
				{paymentError && <p style={{ color: 'red' }}>{paymentError}</p>}
				{paymentSuccess && <p style={{ color: 'green' }}>Payment Successfully</p>}
				<Button type="submit" disabled={!stripe}>
					Pay
				</Button>
			</form>
		</div>
	);
};

export default PaymentCard;
