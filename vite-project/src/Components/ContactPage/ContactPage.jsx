import React from 'react';
import './ContactPage.css';

function App() {
  return (
    <div className="App">
      <header>
        <div className="container">
          <h1>TeslaRoboat</h1>
          <nav>
            <ul>
              <li><a href="#about">About</a></li>
              <li><a href="#services">Services</a></li>
              <li><a href="#contact">Contact</a></li>
              <li><a href="#order">Order</a></li>
            </ul>
          </nav>
        </div>
      </header>
      <main>
        <section id="about" className="container">
          <h2>About Us</h2>
          <p>Welcome to TeslaRoboat! We specialize in developing advanced farming drones, industrial robots, and domestic robots. Our cutting-edge technology ensures high efficiency and reliability in all our products.</p>
        </section>
        <section id="services" className="container">
          <h2>Our Services</h2>
          <ul>
            <li>Farming Drones</li>
            <li>Industrial Robots</li>
            <li>Domestic Robots</li>
            <li>Web Application Development</li>
            <li>Android Application Development</li>
            <li>AI Model Development</li>
          </ul>
        </section>
        <section id="contact" className="container">
          <h2>Contact Us</h2>
          <p>Founder: Shankar Singh Kushwaha</p>
          <p>Phone: 8757870948</p>
          <p>Email: <a href="mailto:shivashankarsingh2003@gmail.com">shivashankarsingh2003@gmail.com</a></p>
        </section>
        <section id="order" className="container">
          <h2>Order Form</h2>
          <iframe 
            src="YOUR_GOOGLE_FORM_EMBED_LINK" 
            width="100%" 
            height="800" 
            frameBorder="0" 
            marginHeight="0" 
            marginWidth="0">Loading…
          </iframe>
        </section>
      </main>
      <footer>
        <div className="container">
          <p>&copy; 2024 TeslaRoboat. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

export default App;
