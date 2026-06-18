import React from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";

import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";

// Auth
import Login from "./pages/Login";
import BuyerRegister from "./pages/BuyerRegister";
import FarmerRegister from "./pages/FarmerRegister";

// Public
import Home from "./pages/Home";
import Products from "./pages/ProductList";
import Orders from "./pages/Orders";
import Reviews from "./pages/Reviews";

import Contact from "./pages/Contact";
import Payment from "./pages/Payment";

// Buyer
import BuyerDashboard from "./pages/BuyerDashboard";
import BuyerCart from "./pages/BuyerCart";

import BuyerProducts from "./pages/BuyerProducts";
import BuyerProductDetails from "./pages/BuyerProductDetail";

// Farmer
import FarmerDashboard from "./pages/FarmerDashboard";
import AddProducts from "./pages/AddProducts";
import EditProduct from "./pages/EditProduct";

// Admin
import AdminDashboard from "./pages/AdminDashboard";

// Components
import Services from "./components/Services";
import Weather from "./components/Weather";
import FarmerProduct from "./components/FarmerProduct";
import StarRating from "./components/StarRating";
import AddReview from "./components/AddReview";

// Exchange Offers
import FarmerExchangeOffers from "./pages/FarmerExchangeOffers";
import CreateExchangeOffer from "./pages/CreateExchangeOffer";
import AdminExchangeOffers from "./pages/AdminExchangeOffers";
import FarmerOrders from "./pages/FarmerOrder";
import Checkout from "./pages/Checkout";
import AddToCart from "./pages/AddtoCart";
import Cart from "./pages/Cart";
import OrderSuccess from "./pages/OrderSuccess";
import BuyerOrders from "./pages/BuyerOrders";
import PaymentCard from "./pages/paymentcard";


function Layout() {
  const location = useLocation();
  const isAuthPage =
    location.pathname === "/login" ||
    location.pathname.startsWith("/register");

  return (
    <>
      {!isAuthPage && <Navbar />}

      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />

        {/* Auth */}
        <Route path="/login" element={<Login />} />
        <Route path="/register/buyer" element={<BuyerRegister />} />
        <Route path="/register/farmer" element={<FarmerRegister />} />


        {/* Public */}
       <Route path="/home" element={<Home />} />

        <Route path="/products" element={<Products />} />
     <Route path="/orders" element={<Orders />} />          {/* all orders list */}
<Route path="/order/:id" element={<Orders />} />
<Route path="/order-success" element={<OrderSuccess />} />
<Route path="/buyer-orders"element={<BuyerOrders/>}/>

        <Route path="/reviews" element={<Reviews />} />
        {/* About → Home About Section */}
        <Route path="/about" element={<Navigate to="/home#about" replace />} />

        <Route path="/services" element={<Services />} />
        <Route path="/weather" element={<Weather />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/payment" element={<Payment />} />
        <Route path="/checkout"element={<Checkout/>}/>
      <Route path="/add-to-cart/:id" element={<AddToCart />} />
      <Route path="/cart"element={<Cart/>}/>
     <Route path="/payment" element={<PaymentCard />} />
     


         
        {/* Buyer */}
        <Route path="/buyer-dashboard" element={
          <ProtectedRoute role="buyer">
            <BuyerDashboard />
          </ProtectedRoute>
        }/>
        <Route path="/buyer-cart" element={<BuyerCart />} />
       
        <Route path="/buyer-product" element={<BuyerProducts />} />
        <Route
  path="/buyerproductdetails/:id"
  element={<BuyerProductDetails />}
/>


        {/* Farmer */}
        <Route path="/farmer-dashboard" element={
          <ProtectedRoute role="farmer">
            <FarmerDashboard />
          </ProtectedRoute>
        }/>
        <Route path="/add-products" element={<AddProducts />} />
       <Route path="/edit-product/:id" element={<EditProduct />} />

        <Route path="/farmer_product" element={<FarmerProduct />} />
        <Route path="/farmer/exchange-offers" element={<FarmerExchangeOffers />} />
        <Route path="/farmer/exchange-offers/new" element={<CreateExchangeOffer />} />
        <Route path="/admin/exchange-offers" element={<AdminExchangeOffers />} />
        <Route path="/farmer_order"element={<FarmerOrders/>}/>
        <Route path="/add review"element={<AddReview/>}/>



        {/* Admin */}
        <Route path="/admin/dashboard" element={
          <ProtectedRoute role="admin">
            <AdminDashboard />
          </ProtectedRoute>
        }/>

        {/* Misc */}
        <Route path="/starrating" element={<StarRating />} />
        <Route path="/addreview" element={<AddReview />} />
      </Routes>
    </>
  );
}

export default Layout;
