import React from 'react';
import './About.css';

function About() {
  return (
    <div className="About">
      <header>
        <div className="container">
          <h1>TeslaRoboat</h1>
          <nav>
            <ul>
              <li><a href="#about">About</a></li>
              <li><a href="#services">Services</a></li>
              <li><a href="#contact">Contact</a></li>
            </ul>
          </nav>
        </div>
      </header>
      <main>
        <section id="about" className="container">
          <h2>About Us</h2>
          <p>Welcome to TeslaRoboat, a pioneering company at the forefront of robotic technology. We are dedicated to designing and manufacturing state-of-the-art robotic solutions for various applications, including farming, industrial, and domestic environments.</p>
          <p>Founded by Shankar Singh Kushwaha, TeslaRoboat is driven by a passion for innovation and a commitment to excellence. Our team of experts is continuously working to develop advanced robots that not only enhance productivity but also improve the quality of life for our users.</p>
        </section>
        <section id="services" className="container">
          <h2>Our Services</h2>
          <ul>
            <li><strong>Farming Drones:</strong> Enhance agricultural efficiency with our precision farming drones, designed to monitor crops, distribute resources, and provide valuable data insights.</li>
            <li><strong>Industrial Robots:</strong> Increase productivity and safety in industrial settings with our robust and reliable robots, built to handle complex tasks in challenging environments.</li>
            <li><strong>Domestic Robots:</strong> Simplify daily tasks at home with our user-friendly domestic robots, designed to assist with cleaning, security, and other household chores.</li>
            <li><strong>Web Application Development:</strong> Get custom web applications tailored to your business needs, leveraging the latest technologies for optimal performance and user experience.</li>
            <li><strong>Android Application Development:</strong> Reach a wider audience with our expertly crafted Android applications, designed for functionality and seamless user interaction.</li>
            <li><strong>AI Model Development:</strong> Harness the power of artificial intelligence with our bespoke AI models, developed to solve complex problems and drive innovation in your business.</li>
          </ul>
        </section>
        <section id="contact" className="container">
          <h2>Contact Us</h2>
          <p>If you have any questions or would like to learn more about our products and services, please don't hesitate to contact us:</p>
          <p><strong>Founder:</strong> Shankar Singh Kushwaha</p>
          <p><strong>Phone:</strong> 8757870948</p>
          <p><strong>Email:</strong> <a href="mailto:shivashankarsingh2003@gmail.com">shivashankarsingh2003@gmail.com</a></p>
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

export default About;
