import React, { useEffect, useState } from "react";
import HeroSection from "../components/home/HeroSection";
import FeatureProducts from "../components/home/FeatureProducts";
import axios from "axios";
import CompanyFeatures from "../components/home/CompanyFeatures";
import LatestProducts from "../components/home/LatestProducts";

export default function Home() {
  const [featureProducts, setFeaturedProducts] = useState([]);
  const [latestProducts, setLatestProducts] = useState([]);

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
    fetchFeaturedProductList();
    fetchLatestProductList();
  }, []);

  return (
    <div className="w-full flex flex-col">
      <HeroSection />
      <FeatureProducts list={featureProducts} />
      <LatestProducts list={latestProducts} />
      <CompanyFeatures />
    </div>
  );
}
