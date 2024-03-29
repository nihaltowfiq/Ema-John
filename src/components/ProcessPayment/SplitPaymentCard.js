import { CardCvcElement, CardExpiryElement, CardNumberElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { useMemo } from 'react';
// import useResponsiveFontSize from "../../useResponsiveFontSize";
import { Button } from 'react-bootstrap';

const useOptions = () => {
	//   const fontSize = useResponsiveFontSize();
	const options = useMemo(
		() => ({
			style: {
				base: {
					fontSize: '18px',
					color: '#424770',
					letterSpacing: '0.025em',
					fontFamily: 'Source Code Pro, monospace',
					'::placeholder': {
						color: '#aab7c4',
					},
				},
				invalid: {
					color: '#9e2146',
				},
			},
		}),
		[],
	);

	return options;
};

const SplitPaymentCard = () => {
	const stripe = useStripe();
	const elements = useElements();
	const options = useOptions();

	const handleSubmit = async (event) => {
		event.preventDefault();

		if (!stripe || !elements) {
			// Stripe.js has not loaded yet. Make sure to disable
			// form submission until Stripe.js has loaded.
			return;
		}

		const payload = await stripe.createPaymentMethod({
			type: 'card',
			card: elements.getElement(CardNumberElement),
		});
		console.log('[PaymentMethod]', payload);
	};

	return (
		<form onSubmit={handleSubmit}>
			<label>
				Card number
				<CardNumberElement
					options={options}
					onReady={() => {
						console.log('CardNumberElement [ready]');
					}}
					onChange={(event) => {
						console.log('CardNumberElement [change]', event);
					}}
					onBlur={() => {
						console.log('CardNumberElement [blur]');
					}}
					onFocus={() => {
						console.log('CardNumberElement [focus]');
					}}
				/>
			</label>
			<br />
			<label>
				Expiration date
				<CardExpiryElement
					options={options}
					onReady={() => {
						console.log('CardNumberElement [ready]');
					}}
					onChange={(event) => {
						console.log('CardNumberElement [change]', event);
					}}
					onBlur={() => {
						console.log('CardNumberElement [blur]');
					}}
					onFocus={() => {
						console.log('CardNumberElement [focus]');
					}}
				/>
			</label>
			<br />
			<label>
				CVC
				<CardCvcElement
					options={options}
					onReady={() => {
						console.log('CardNumberElement [ready]');
					}}
					onChange={(event) => {
						console.log('CardNumberElement [change]', event);
					}}
					onBlur={() => {
						console.log('CardNumberElement [blur]');
					}}
					onFocus={() => {
						console.log('CardNumberElement [focus]');
					}}
				/>
			</label>
			<br />
			<Button variant="primary" type="submit" disabled={!stripe}>
				Pay
			</Button>
		</form>
	);
};

export default SplitPaymentCard;
