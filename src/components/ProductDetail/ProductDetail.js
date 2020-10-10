import React, { useEffect, useState } from 'react';
import { Spinner } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import Product from '../Product/Product';

const ProductDetail = () => {
    const { productKey } = useParams();
    const [loading, setLoading] = useState(true)
    const [product, setProduct] = useState({});
    useEffect(() => {
        fetch(`https://mighty-reef-39398.herokuapp.com/product/${productKey}`)
            .then(res => res.json())
            .then(data => {
                setLoading(false);
                setProduct(data)
            })
    }, [productKey]);
    return (
        <div>
            <h1>Your Product Details.</h1>
            {
                loading ? <Spinner animation="border" role="status">
                    <span className="sr-only">Loading...</span>
                </Spinner>
                    : <Product showAddToCart={false} product={product}></Product>
            }
        </div>
    );
};

export default ProductDetail;