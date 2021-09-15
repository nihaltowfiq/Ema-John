import { faCartPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import './Product.css';

const Product = (props) => {
	const { name, img, seller, price, stock, key } = props.product;
	const handleButton = () => props.handleAddProduct(props.product);
	return (
		<div className="product">
			<div className="product-img">
				<img src={img} alt="" />
			</div>
			<div className="product-details">
				<h4 className="product-name">
					<Link to={'/product/' + key}>{name}</Link>
				</h4>
				<p>
					<small>by: {seller}</small>
				</p>
				<br />
				<p>${price}</p>
				<p>
					<small>only {stock} left in stock - order soon</small>
				</p>
				{props.showAddToCart === true && (
					<button className="main-btn" onClick={handleButton}>
						<FontAwesomeIcon icon={faCartPlus} /> add to cart
					</button>
				)}
			</div>
		</div>
	);
};

export default Product;
