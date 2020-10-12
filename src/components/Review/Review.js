import React, { useEffect, useState } from 'react';
import { getDatabaseCart, removeFromDatabaseCart } from '../../utilities/databaseManager';
import ReviewItem from '../ReviewItem/ReviewItem';
import Cart from '../Cart/Cart';
import happyImage from '../../images/giphy.gif';
import { useHistory } from 'react-router-dom';

const Review = () => {
    const [cart, setCart] = useState([]);

    useEffect(() => {
        const savedCart = getDatabaseCart();
        const productKeys = Object.keys(savedCart)

        fetch('https://mighty-reef-39398.herokuapp.com/productsBykeys', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(productKeys)
        })
            .then(res => res.json())
            .then(data => setCart(data));
    }, []);

    const handleRemoveItem = (productKey) => {
        const newCart = cart.filter(pd => pd.key !== productKey);
        setCart(newCart);
        removeFromDatabaseCart(productKey);
    };

    const [orderPlaced, setOrderPlaced] = useState([]);
    const history = useHistory();

    const handleProceedCheckout = () => {
        history.push('/shipment')
    };
    let thankyou;
    let thankText;
    if (orderPlaced === true) {
        thankText = <h1>You will get the order from the sky!</h1>
        thankyou = <img src={happyImage} alt='' />
    };

    return (
        <div>

            <div className="twin-container">
                <div className="product-container">
                    {
                        !cart[0] && <h4 style={{ textAlign: 'center' }}>Please order SomeThings</h4>
                    }
                    {
                        cart.map(pd => <ReviewItem handleRemoveItem={handleRemoveItem} key={pd.key} product={pd}></ReviewItem>)
                    }
                    {thankText}
                    {thankyou}
                </div>
                <div className="cart-container">
                    <Cart cart={cart}>
                        <button onClick={handleProceedCheckout} className="main-btn">Proceed Checkout</button>
                    </Cart>
                </div>
            </div>
        </div>
    );
};

export default Review;