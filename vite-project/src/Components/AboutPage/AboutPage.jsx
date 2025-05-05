import React from 'react';
import './AboutPage.css';

function AboutPage() {
  return (
    // <div classNameName="AboutPage">
    //   <section id="about" classNameName="container">
    //     <h2>About Us</h2>
    //     <p>Welcome to TeslaRoboat, a pioneering company at the forefront of robotic technology. We are dedicated to designing and manufacturing state-of-the-art robotic solutions for various applications, including farming, industrial, and domestic environments.</p>
    //     <p>Founded by Shankar Singh Kushwaha, TeslaRoboat is driven by a passion for innovation and a commitment to excellence. Our team of experts is continuously working to develop advanced robots that not only enhance productivity but also improve the quality of life for our users.</p>
    //   </section>
    //   <section id="services" classNameName="container">
    //     <h2>Our Services</h2>
    //     <ul>
    //       <li><strong>Farming Drones:</strong> Enhance agricultural efficiency with our precision farming drones, designed to monitor crops, distribute resources, and provide valuable data insights.</li>
    //       <li><strong>Industrial Robots:</strong> Increase productivity and safety in industrial settings with our robust and reliable robots, built to handle complex tasks in challenging environments.</li>
    //       <li><strong>Domestic Robots:</strong> Simplify daily tasks at home with our user-friendly domestic robots, designed to assist with cleaning, security, and other household chores.</li>
    //       <li><strong>Web Application Development:</strong> Get custom web applications tailored to your business needs, leveraging the latest technologies for optimal performance and user experience.</li>
    //       <li><strong>Android Application Development:</strong> Reach a wider audience with our expertly crafted Android applications, designed for functionality and seamless user interaction.</li>
    //       <li><strong>AI Model Development:</strong> Harness the power of artificial intelligence with our bespoke AI models, developed to solve complex problems and drive innovation in your business.</li>
    //     </ul>
    //   </section>
    //   <section id="contact" classNameName="container">
    //     <h2>Contact Us</h2>
    //     <p>If you have any questions or would like to learn more about our products and services, please don't hesitate to contact us:</p>
    //     <p><strong>Founder:</strong> Shankar Singh Kushwaha</p>
    //     <p><strong>Phone:</strong> 8757870948</p>
    //     <p><strong>Email:</strong> <a href="mailto:shivashankarsingh2003@gmail.com">shivashankarsingh2003@gmail.com</a></p>
    //   </section>
    // </div>
    <>
    <section className="py-24 relative">
        <div className="w-full max-w-7xl px-4 md:px-5 lg:px-5 mx-auto">
            <div className="w-full justify-start items-center gap-8 grid lg:grid-cols-2 grid-cols-1">
                <div className="w-full flex-col justify-start lg:items-start items-center gap-10 inline-flex">
                    <div className="w-full flex-col justify-start lg:items-start items-center gap-4 flex">
                        <h2 className="text-gray-900 text-4xl font-bold font-manrope leading-normal lg:text-start text-center">Building Stronger Communities through Collaboration and Empowerment</h2>
                        <p className="text-gray-500 text-base font-normal leading-relaxed lg:text-start text-center">Through collaborationperse perspectives and strengths are leveraged to create inclusive environments where everyone has the opportunity to thrive. This approach not only fosters personal growth and achievement but also strengthens the fabric of society.</p>
                    </div>
                    <button className="sm:w-fit w-full px-3.5 py-2 bg-indigo-600 hover:bg-indigo-800 transition-all duration-700 ease-in-out rounded-lg shadow-[0px_1px_2px_0px_rgba(16,_24,_40,_0.05)] justify-center items-center flex">
                        <span className="px-1.5 text-white text-sm font-medium leading-6">Get Started</span>
                    </button>
                </div>
                <img className="lg:mx-0 mx-auto h-full rounded-3xl object-cover" src="https://pagedone.io/asset/uploads/1717751272.png" alt="about Us image" />
            </div>
        </div>
    </section>
    </>
  );
}

export default AboutPage;
