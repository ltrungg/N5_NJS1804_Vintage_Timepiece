import React, { useEffect, useState } from "react";
import HeroSection from "../components/home/HeroSection";
import FeatureProducts from "../components/home/FeatureProducts";
import axios from "axios";
import CompanyFeatures from "../components/home/CompanyFeatures";
import LatestProducts from "../components/home/LatestProducts";
import { useLocation } from "react-router-dom";
export default function Home() {
  const [featureProducts, setFeaturedProducts] = useState([]);
  const [latestProducts, setLatestProducts] = useState([]);
  const location = useLocation();

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
    if(location.state && location.state.latestProducts){
      setLatestProducts(location.state.latestProducts);
    }else{
    fetchFeaturedProductList();
    fetchLatestProductList();
    }
  }, [location.state]);

  return (
    <div className="w-full flex flex-col">
      <HeroSection />
      <FeatureProducts list={featureProducts} />
      <LatestProducts list={latestProducts} />
      <CompanyFeatures />
    </div>
  );
}
