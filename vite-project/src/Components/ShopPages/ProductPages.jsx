import React from 'react';
import { useParams } from 'react-router-dom';

const ProductPage = () => {
    let { productId } = useParams();

    return (
        <div>
            <h2>Product {productId}</h2>
            {/* Add product details here */}
        </div>
    );
}

export default ProductPage;
