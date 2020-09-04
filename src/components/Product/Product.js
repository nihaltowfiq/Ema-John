import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCartPlus } from '@fortawesome/free-solid-svg-icons'
import './Product.css';

const Product = (props) => {
    const { name, img, seller, price, stock } = props.product;
    const handleButton = () => props.handleAddProduct(props.product);
    return (
        <div className='product'>
            <div className='product-img'>
                <img src={img} alt="" srcset="" />
            </div>
            <div className='product-details'>
                <h4 className='product-name'>{name}</h4>
                <p><small>by: {seller}</small></p>
                <br />
                <p>${price}</p>
                <p><small>only {stock} left in stock - order soon</small></p>
                <button className='add-btn' onClick={handleButton}><FontAwesomeIcon icon={faCartPlus} /> add to cart</button>
            </div>
        </div>
    );
};

export default Product;