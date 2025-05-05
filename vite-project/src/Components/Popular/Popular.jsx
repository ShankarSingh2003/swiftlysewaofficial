import React, { useEffect, useState } from 'react';
import './Popular.css';
import Item from '../Item/Item';

const Popular = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch('http://localhost:4000/allproducts') // Update with your actual endpoint
      .then(response => response.json())
      .then(data => setData(data))
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  return (
    <div className="popular">
      <h1>POPULAR ROBOTS AND DRONES</h1>
      <hr />
      <div className="popular-item">
        {data.map((item) => (
          <Item
            key={item.id}
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

export default Popular;
