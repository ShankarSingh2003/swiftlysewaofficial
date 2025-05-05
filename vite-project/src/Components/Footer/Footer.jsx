import React,{useState} from 'react'
import './Footer.css'
import {Link} from 'react-router-dom'

import footer_logo from '../Assets/logo_big.png'
import instagram_icon from '../Assets/instagram_icon.png'
import pintrest_icon from '../Assets/pintester_icon.png'
import whatsapp_icon from '../Assets/whatsapp_icon.png'

const Footer = () => {
  const [setMenu, menuOpen] = useState(false);
  return (
    <div className='footer'>
      <div className="footer-logo">
        <img src={footer_logo} alt="" />
        <p>SHOPPER</p>
      </div>
      <ul className="footer-links">
        <li onClick={() => {setMenu("Company");}}><Link style={{ textDecoration: "none" }} to="/company">   Company   </Link>{menuOpen === "Company" ? <hr /> : <></>}</li>
        <li onClick={() => {setMenu("Products");}}><Link style={{ textDecoration: "none" }} to="/products"> Products  </Link>{menuOpen === "Products" ? <hr /> : <></>}</li>
        <li onClick={() => {setMenu("Offices");}}><Link style={{ textDecoration: "none" }} to="/offices">   Offices   </Link>{menuOpen === "Offices" ? <hr /> : <></>}</li>
        <li onClick={() => {setMenu("About");}}><Link style={{ textDecoration: "none" }} to="/about">       About     </Link>{menuOpen === "About" ? <hr /> : <></>}</li>
        <li onClick={() => {setMenu("Contact");}}><Link style={{ textDecoration: "none" }} to="/contact">   Contact   </Link>{menuOpen === "Contact" ? <hr /> : <></>}</li>
        </ul>
        <div className="footer-social-icons">
        <div className="footer-icons-container">
        <a href='https://www.instagram.com/_shankar_singh_kushwaha_/?next=https%3A%2F%2Fwww.instagram.com%2Faccounts%2Fonetap%2F%3Fnext%3D%252F%26__coig_login%3D1'><img src={instagram_icon} alt="" /></a>
        </div>
        <div className="footer-icons-container">
        <a href='https://www.linkedin.com/in/shankar-kumar-637821224/'><img src={pintrest_icon} alt="" /></a>
        </div>
        <div className="footer-icons-container">
        <a href='https://chat.whatsapp.com/C3HyTfTvJfC9gYixNHOVyr'><img src={whatsapp_icon} alt="" /></a>
        </div>
      </div>
      <div className="footer-copyright">
        <hr />
        <p>Copyright @ 2023 - All Right Reserved.</p>
      </div>
    </div>
  )
}

export default Footer