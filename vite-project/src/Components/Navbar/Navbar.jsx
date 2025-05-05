import React, { useState, useRef, useContext } from 'react';
import './Navbar.css';

import { Link } from "react-router-dom";
import { ShopContext } from "../../Context/ShopContext";


const Navbar = () => {
  
    

   

    return (
        // <div className="BODY">
           

        //     <div className="navbar">
        //         <div className="nav-logo">
        //             <img src={logo} alt="" />
        //             <p>Buy Now</p>
        //         </div>
                
        //         <ul ref={menuRef} className="nav-menu">
        //             <li onClick={() => { setMenu("shop"); }}><Link style={{ textDecoration: "none" }} to="/">Drone</Link>{menu === "shop" ? <hr /> : <></>}</li>
        //             <li onClick={() => { setMenu("mens"); }}><Link style={{ textDecoration: "none" }} to="/mens">Robot</Link>{menu === "mens" ? <hr /> : <></>}</li>
        //             <li onClick={() => { setMenu("womens"); }}><Link style={{ textDecoration: "none" }} to="womens">Electronics</Link>{menu === "womens" ? <hr /> : <></>}</li>
        //             <li onClick={() => { setMenu("kids"); }}><Link style={{ textDecoration: "none" }} to="/kids">Software</Link>{menu === "kids" ? <hr /> : <></>}</li>
        //         </ul>
        //         <div className="nav-login-cart">
        //             {localStorage.getItem('auth-token') ? (
        //                 <button onClick={() => {
        //                     localStorage.removeItem('auth-token'); window.location.replace('/');
        //                 }}>Logout</button>
        //             ) : (<Link to="/login"><button>Login</button></Link>)}

        //             <Link to="/register">Register</Link>
        //             <Link to="/cart"><img src={cart_icon} alt="" /></Link>
        //             <div className="nav-cart-count">{getTotalCartItems()}</div>
        //         </div>
        //     </div>

           
        // </div>
        <>
        <nav className="bg-gray-100">
  <div className="max-w-6xl mx-auto px-4">
    <div className="flex justify-between">

      <div className="flex space-x-4">
      
        <div>
          <a href="#" className="flex items-center py-5 px-2 text-gray-700 hover:text-gray-900">
            <svg className="h-6 w-6 mr-1 text-blue-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
            </svg>
            <span className="font-bold">Better Dev</span>
          </a>
        </div>

   
        <div className="hidden md:flex items-center space-x-1">
          <a href="#" className="py-5 px-3 text-gray-700 hover:text-gray-900">Features</a>
          <a href="#" className="py-5 px-3 text-gray-700 hover:text-gray-900">Pricing</a>
        </div>
      </div>


      <div className="hidden md:flex items-center space-x-1">
      
        <Link  to={"/login"} className=' py-5 px-3' >Login</Link>
        <Link to="/register" className="py-2 px-3 bg-yellow-400 hover:bg-yellow-300 text-yellow-900 hover:text-yellow-800 rounded transition duration-300">Signup</Link>
      </div>

  
      <div className="md:hidden flex items-center">
        <button className="mobile-menu-button">
          <svg className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>

    </div>
  </div>

  
  <div className="mobile-menu hidden md:hidden">
    <a href="#" className="block py-2 px-4 text-sm hover:bg-gray-200">Features</a>
    <a href="#" className="block py-2 px-4 text-sm hover:bg-gray-200">Pricing</a>
  </div>
</nav>
        </>
    );
};

export default Navbar;
