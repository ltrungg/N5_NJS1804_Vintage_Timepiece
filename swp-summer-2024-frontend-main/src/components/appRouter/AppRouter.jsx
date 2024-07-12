import React from "react";
import { Routes, Route } from "react-router-dom";
import NotFound from "../notFound/NotFound";
import SignIn from "../../pages/Signin";
import SignUp from "../../pages/SignUp";
import Home from "../../pages/Home";
import ProductDetail from "../../pages/ProductDetail";
import ProductList from "../../pages/ProductsList";
import ContactPage from "../../pages/ContactPage";
import WishList from "../../pages/WishList";
import Chat from "../../pages/Chat";
import ThankYou from "../../pages/ThankYou";
import Profile from "../../pages/Profile";
import Sell from "../../pages/Sell";
import StaffDashboard from "../StaffDashboard";
import SellRequestDetail from "../SellRequestDetail";
import ReportPage from "../ReportPage";
import TestProductEdit from "../../pages/TestProductEdit";
import Appraisal from "../../pages/Appraisal";

import ViewSellerProfile from "../../pages/ViewSellerProfile";
import AllAppraisal from "../../pages/AllAppraisal";
import Appraiser from "../../pages/Appraiser";
import Sell2 from "../../pages/Sell2";
import AppraiseAndSell from "../../pages/AppraiseAndSell";

export default function AppRouter() {
  return (
    <div className="w-full min-h-[80vh] flex items-start justify-center">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/test" element={<TestProductEdit />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/products" element={<ProductList />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/wishlist" element={<WishList />} />
        <Route path="/order_completed/:id" element={<ThankYou />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/profile/manage-product" element={<Profile />} />
        <Route path="/profile/:id" element={<ViewSellerProfile />} />
        <Route path="/chat" element={<Chat />} />
        <Route path="/chat/:id" element={<Chat />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/sell" element={<AppraiseAndSell />} />

        <Route path="/sell2" element={<Sell2 />} />
        <Route path="/allAppraisal/appraisal" element={<Appraisal />} />
        <Route path="/allAppraisal" element={<AllAppraisal />} />
        <Route path="/allAppraisal/appraisalHistory" element={<Appraiser />} />

        <Route path="*" element={<NotFound />} />
        <Route path="/staffDashboard" element={<StaffDashboard />} />
        <Route
          path="/sell-request/:productId"
          element={<SellRequestDetail />}
        />
        <Route path="/reportPage" element={<ReportPage />} />
        <Route path="/sell2" element={<Sell2 />} />
      </Routes>
    </div>
  );
}
