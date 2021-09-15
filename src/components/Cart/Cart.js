import React from 'react';
import './Cart.css';

const Cart = (props) => {
	const cart = props.cart;
	// const total = cart.reduce((total, pd) => total + pd.price, 0);
	let total = 0;
	for (let i = 0; i < cart.length; i++) {
		const product = cart[i];
		total = total + product.price * product.quantity || 1;
	}
	let shipping = 0;
	if (total === 0) {
		shipping = 0;
	} else if (total <= 49) {
		shipping = 12.99;
	} else if (total >= 50) {
		shipping = 2.99;
	}
	const totalBeforeTax = total + shipping;
	const tax = total * 0.12;
	const grandTotal = totalBeforeTax + tax;
	return (
		<div className="cart-container">
			<h3>Order Summary</h3>
			<p>Items ordered: {cart.length}</p>
			<small>Price: ${total.toFixed(2)}</small>
			<br />
			<small>Shipping: ${shipping}</small>
			<br />
			<small>Total before tax: ${totalBeforeTax.toFixed(2)}</small>
			<br />
			<small>Tax: ${tax.toFixed(2)}</small>
			<h4>Grand Total: ${grandTotal.toFixed(2)}</h4>
			{props.children}
		</div>
	);
};

export default Cart;
