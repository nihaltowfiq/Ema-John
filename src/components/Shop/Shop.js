import React, { useState, useEffect } from 'react';
import './Shop.css';
import Product from '../Product/Product';
import Cart from '../Cart/Cart';
import { addToDatabaseCart, getDatabaseCart } from '../../utilities/databaseManager';
import { Link } from 'react-router-dom';
import { Button, Form, FormControl, InputGroup, Spinner } from 'react-bootstrap';

const Shop = () => {
    // const first10 = fakeData.slice(0, 10);
    // const [products, setProducts] = useState(first10);

    const [products, setProducts] = useState([]);
    const [search, setSearch] = useState('');
    const [searchInput, setSearchInput] = useState('');
    
    useEffect(() => {
        fetch('https://mighty-reef-39398.herokuapp.com/products?search=' + search)
            .then(res => res.json())
            .then(data => {
                setProducts(data)
            })
    }, [search]);

    useEffect(() => {
        const savedCart = getDatabaseCart();
        const productKeys = Object.keys(savedCart);
        fetch('https://mighty-reef-39398.herokuapp.com/productsBykeys', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(productKeys)
        })
            .then(res => res.json())
            .then(data => setCart(data));
    }, []);

    const [cart, setCart] = useState([]);
    const handleAddProduct = (product) => {
        const toBeAddedKey = product.key;
        const sameProduct = cart.find(pd => pd.key === toBeAddedKey);
        let count = 1;
        let newCart;
        if (sameProduct) {
            count = sameProduct.quantity + 1;
            sameProduct.quantity = count;
            const others = cart.filter(pd => pd.key !== toBeAddedKey);
            newCart = [...others, sameProduct];
        }
        else {
            product.quantity = 1;
            newCart = [...cart, product];
        }
        setCart(newCart);
        addToDatabaseCart(product.key, count);
    };

    const handleSearch = event => {
        event.preventDefault();
        setSearch(searchInput);
        console.log('clicked');
    };
    const handleBlur = e => {
        const newSetSearchInput = e.target.value;
        setSearchInput(newSetSearchInput)
    };
    return (
        <div className='twin-container'>
            <div className="product-container">
                {/* <input type="text" onBlur={handleSearch}/> */}
                <Form onSubmit={handleSearch}>
                    <InputGroup size="lg" className="mb-3 mt-2 pr-1 search-bar">
                        <FormControl
                            onBlur={handleBlur}
                            placeholder="Search..."
                            aria-label="Recipient's username"
                            aria-describedby="basic-addon2"
                        />
                        <InputGroup.Append>
                            <Button variant="primary" type="submit">Search</Button>
                        </InputGroup.Append>
                    </InputGroup>
                </Form>
                {
                    products.length === 0 &&
                    <Spinner animation="border" role="status">
                        <span className="sr-only">Loading...</span>
                    </Spinner>
                }
                {
                    products.map(pd => <Product key={pd.key} showAddToCart={true} product={pd} handleAddProduct={handleAddProduct}> </Product>)
                }
            </div>
            <div className="cart-container">
                <Cart cart={cart}>
                    <Link to="/review">
                        <button className="main-btn">Review Order</button>
                    </Link>
                </Cart>
            </div>
        </div>
    );
};

export default Shop;