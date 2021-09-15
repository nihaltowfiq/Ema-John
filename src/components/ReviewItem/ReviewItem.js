const ReviewItem = (props) => {
	const { name, quantity, key, price } = props.product;
	const reviewItemStyle = {
		margin: '10px',
		padding: '10px',
		borderBottom: '1px solid lightgray',
		marginLeft: '50px',
	};
	const removeBtn = () => props.handleRemoveItem(key);
	return (
		<div style={reviewItemStyle}>
			<h4 className="product-name" style={{ marginBottom: '10px' }}>
				{name}
			</h4>
			<h5>Quantity: {quantity}</h5>
			<p>
				<small>Price: ${price}</small>
			</p>
			<button onClick={removeBtn} className="main-btn">
				Remove
			</button>
		</div>
	);
};

export default ReviewItem;
