import React from 'react';
import './Company.css';

const Company = () => {
  return (
    <div style={{ fontFamily: 'Arial, sans-serif', padding: '20px', maxWidth: '800px', margin: 'auto' }}>
      <h1 style={{ color: '#333' }}>TeslaRoboat</h1>
      <h2 style={{ color: '#555' }}>Founded by Shankar Singh Kushwaha</h2>
      <p style={{ lineHeight: '1.6' }}>
        TeslaRoboat is at the forefront of innovation, specializing in cutting-edge robotics and drone technologies.
        Our mission is to revolutionize industries with our advanced robotic solutions, enhancing efficiency and 
        productivity across various sectors. 
      </p>
      <p style={{ lineHeight: '1.6' }}>
        We are dedicated to pushing the boundaries of what robots and drones can achieve, making the impossible 
        possible through relentless research and development.
      </p>
      <p style={{ lineHeight: '1.6' }}>
        Join us in our journey to transform the future with technology.
      </p>
    </div>
  );
};

export default Company;
