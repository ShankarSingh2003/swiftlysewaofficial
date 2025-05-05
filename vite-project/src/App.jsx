import './App.css';
import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getAllUsers, loadUser } from "./action/User";
import { getAllServices, getLoggedinUserAllServices } from "./action/Service";
import { getAllProducts } from "./action/Product";
import Dashboard from "./Pages/Dashboard/Shop";
import ShippingInfo from "./Components/Shippinginfo/ShippingInfo";
import Product from "./Pages/Product";
import Footer from "./Components/Footer/Footer";
import Navbar from "./Components/Navbar/Navbar";
import Register from "./Components/Register/Register";
import Login from "./Components/Login/Login";
import AfterLoginNavbar from "./Components/AfterLoginNavbar/AfterLoginNavbar";
import Services from "./Components/Services/Services";
import BookServices from "./Components/BookServices/BookServices";
import Profile from "./Components/Profile/Profile";
import UserProfile from "./Components/UserProfile/UserProfile";
import SearchJobPage from "./Components/SearchJobPage/SearchJobPage";
import AdminDashboard from "./Components/AdminDashboard/AdminDashboard";
import Order from "./Components/Order/Order";
import Loader from "./Components/Loader/Loader";
import AOS from "aos";
import ProductDescription from "./Components/ProductDescription/ProductDescription";

function App() {
  const dispatch = useDispatch();
  const { isAuthenticated, user } = useSelector((state) => state.user);
  const { products, loading: productLoader } = useSelector((state) => state.AllProducts);
  const { users, loading: userLoading } = useSelector((state) => state.getAllUsers);
  const { allservices, loading: allServicesLoading } = useSelector((state) => state.getAllServices);
  const { loggedinuserservice, loading: loadingUserServices } = useSelector((state) => state.loggedinuserservice);

  // Fetch data on component mount
  useEffect(() => {
    dispatch(getAllUsers());
    dispatch(loadUser());
    dispatch(getAllServices());
    dispatch(getLoggedinUserAllServices());
    dispatch(getAllProducts());
  }, [dispatch, isAuthenticated]); // Removed allservices.length

  // Initialize AOS animations
  useEffect(() => {
    AOS.init({ duration: 2000 });
    AOS.refresh();
  }, []);

  return (
    <Router>
      {/* Conditional Navbar */}
      {isAuthenticated && user ? <AfterLoginNavbar user={user} /> : <Navbar />}

      {/* Conditional Rendering for Routes */}
      {!productLoader && !userLoading && !allServicesLoading && !loadingUserServices ? (
        <Routes>
          <Route path="/" element={<Dashboard allservices={allservices} user={user} />} />
          <Route path="/register" element={<Register />} />
          <Route path="/admindashboard" element={<AdminDashboard users={users} user={user} />} />
          <Route path="/shippinginfo" element={<ShippingInfo />} />
          <Route path="/SearchJobPage" element={<SearchJobPage user={user} />} />
          <Route path="/bookservice/:id" element={<BookServices />} />
          <Route path="/profile/:id" element={<Profile />} />
          <Route path="/product/:id" element={<ProductDescription />} />
          <Route path="/order" element={<Order />} />
          <Route path="/product" element={<Product products={products} />} />
          <Route path="/userProfile" element={<UserProfile user={user} loggedinuserservice={loggedinuserservice} />} />
          <Route path="/login" element={<Login />} />
          <Route path="/Allservices" element={<Services allservices={allservices} />} />
        </Routes>
      ) : (
        <Loader />
      )}

      {/* Footer */}
      <Footer />
    </Router>
  );
}

export default App;