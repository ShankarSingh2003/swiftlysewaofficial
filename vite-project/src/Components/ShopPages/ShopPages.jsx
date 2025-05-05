import React from 'react';
import { Link } from 'react-router-dom';

const ShopPages = () => {
    return (
        <div>
            <h1>ShopPages</h1>
            <p>Welcome to our shop! Browse our products below:</p>
            <ul>
                <li><Link to="/shop/product/1">Product 1</Link></li>
                <li><Link to="/shop/product/2">Product 2</Link></li>
                {/* Add more products as needed */}
            </ul>
        </div>
    );
}

export default ShopPages;
