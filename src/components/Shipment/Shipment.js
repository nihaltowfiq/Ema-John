import React, { useContext } from 'react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { UserContext } from '../../App';
import { getDatabaseCart, processOrder } from '../../utilities/databaseManager';
import ProcessPayment from '../ProcessPayment/ProcessPayment';
import './Shipment.css';

const Shipment = () => {
	const [loggedInUser, setLoggedInUser] = useContext(UserContext);
	const { register, handleSubmit, errors } = useForm();
	const [shippingData, setShippingData] = useState(null);

	const onSubmit = (data) => {
		setShippingData(data);
	};
	const handlePaymentSuccess = (paymentId) => {
		const savedCart = getDatabaseCart();
		const orderDetails = {
			...loggedInUser,
			products: savedCart,
			shipment: shippingData,
			payment: paymentId,
			orderTime: new Date(),
		};
		fetch('https://mighty-reef-39398.herokuapp.com/addOrder', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(orderDetails),
		})
			.then((res) => res.json())
			.then((data) => {
				if (data) {
					processOrder();
					// alert('Odered Succecfully')
				}
			});
	};

	return (
		<div className="row container">
			<div style={{ display: shippingData ? 'none' : 'block' }} className="col-md-6">
				<form className="ship-form" onSubmit={handleSubmit(onSubmit)}>
					<input
						name="name"
						defaultValue={loggedInUser.name}
						placeholder="Your name"
						ref={register({ required: true })}
					/>
					{errors.name && <span className="error">Name is required</span>}

					<input
						name="email"
						defaultValue={loggedInUser.email}
						placeholder="Your email"
						ref={register({ required: true })}
					/>
					{errors.email && <span className="error">Email is required</span>}

					<input name="address" placeholder="Your address" ref={register({ required: true })} />
					{errors.address && <span className="error">Address is required</span>}

					<input name="phone" placeholder="Your phone number" ref={register({ required: true })} />
					{errors.phone && <span className="error">Phone Number is required</span>}
					<input type="submit" />
				</form>
			</div>
			<div style={{ display: shippingData ? 'block' : 'none' }} className="col-md-6">
				<ProcessPayment handlePayment={handlePaymentSuccess}></ProcessPayment>
			</div>
		</div>
	);
};

export default Shipment;
