import React from 'react';
import './RelatedProducts.css';
import Item from '../Item/Item';

const RelatedProducts = ({ products, currentCategory }) => {
  // Filter products based on currentCategory
  const filteredProducts = products.filter(product => product.category === currentCategory);

  return (
    <div className='relatedproducts'>
      <h1>Related Products</h1>
      <hr />
      <div className="relatedproducts-item">
        {filteredProducts.map(item => (
          <Item
            key={item.id}  // Add a unique key prop
            id={item.id}
            name={item.name}
            image={item.image}
            new_price={item.new_price}
            old_price={item.old_price}
          />
        ))}
      </div>
    </div>
  );
};

export default RelatedProducts;
