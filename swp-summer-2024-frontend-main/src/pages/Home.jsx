import React, { useEffect, useState } from "react";
import HeroSection from "../components/home/HeroSection";
import FeatureProducts from "../components/home/FeatureProducts";
import axios from "axios";
import CompanyFeatures from "../components/home/CompanyFeatures";
import LatestProducts from "../components/home/LatestProducts";
import { useLocation } from "react-router-dom";
import { useCookies } from "react-cookie";

export default function Home() {
  const userSession = sessionStorage.signInUser;
  const [featureProducts, setFeaturedProducts] = useState([]);
  const [latestProducts, setLatestProducts] = useState([]);
  const location = useLocation();

  const [cookies, setCookie, removeCookie] = useCookies(["signInUser"]);

  const fetchFeaturedProductList = async () => {
    await axios
      .get("http://localhost:3000/product/featured")
      .then((res) => {
        setFeaturedProducts(res.data);
      })
      .then((err) => console.log(err));
  };

  const fetchLatestProductList = async () => {
    await axios
      .get("http://localhost:3000/product/latest")
      .then((res) => {
        setLatestProducts(res.data);
      })
      .then((err) => console.log(err));
  };

  useEffect(() => {
    if (!userSession && cookies.signInUser) {
      window.location.href = "/signin";
    }
    fetchFeaturedProductList();
    fetchLatestProductList();
  }, []);

  return (
    <div className="w-full flex flex-col">
      <HeroSection />
      {/* <FeatureProducts list={featureProducts} /> */}
      <LatestProducts list={latestProducts} />
      <CompanyFeatures />
    </div>
  );
}
