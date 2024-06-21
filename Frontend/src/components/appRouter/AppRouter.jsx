import React from "react";
import { Routes, Route } from "react-router-dom";
import NotFound from "../notFound/NotFound";
import SignIn from "../../pages/Signin";
import SignUp from "../../pages/SignUp";
import Home from "../../pages/Home";
import ProductDetail from "../../pages/ProductDetail";

import Cart from "../../pages/Cart";
import SellPage from "../../components/SellPage";
import LastActionSell from "../../components/LastActionSell";
import WatchForm from "../../components/WatchForm";
import { SellProvider } from "../../context/sellContext";
import ContactPage from "../../pages/ContactPage";
import OtherBrandForm from "../OtherBrandForm";
import Products from "../../pages/ProductsList";

export default function AppRouter() {
  return (
    <div className="w-full min-h-[80vh] flex items-start justify-start">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/products" element={<Products />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/watchForm" element ={<WatchForm/>} />
        <Route
          path="/sellPage"
          element={
            <SellProvider>
              <SellPage />
            </SellProvider>
          }
        />
        <Route
          path="/lastActionSell"
          element={
            <SellProvider>
              <LastActionSell />
            </SellProvider>
          }
        />
        <Route
          path="/watchForm"
          element={
            <SellProvider>
              <WatchForm />
            </SellProvider>
          }
        />
        <Route
          path="/OtherBrandForm"
          element={
            <SellProvider>
              <OtherBrandForm />
            </SellProvider>
          }
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}
