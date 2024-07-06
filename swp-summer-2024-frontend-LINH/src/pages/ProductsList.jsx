import React, { useEffect, useState } from "react";
import axios from "axios";
import FilterSidebar from "../components/productList/FilterSidebar";
import ShownList from "../components/productList/ShownList";
import NoResult from "../assets/images/productList/no_result.jpg";
import Loading from "../components/loading/Loading";

export default function ProductList() {
  const user = sessionStorage.signInUser
    ? JSON.parse(sessionStorage.signInUser)
    : null;

  const [productList, setProductList] = useState([]);
  const [currentList, setCurrentList] = useState([]);
  const [brandList, setBrandList] = useState([]);
  const [currentSortOrder, setCurrentSortOrder] = useState("");

  const fetchProductList = async () => {
    await axios
      .get(`http://localhost:3000/product/available/${user ? user.id : "null"}`)
      .then((res) => {
        setProductList(res.data);
        setCurrentList(res.data);
      })
      .catch((err) => console.log(err));
  };

  const fetchBrandList = async () => {
    await axios
      .get("http://localhost:3000/product/brand")
      .then((res) => {
        let tempBrandList = [];
        res.data.map((item) => {
          tempBrandList.push(item.brand);
        });
        setBrandList(tempBrandList);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    fetchProductList();
    fetchBrandList();
  }, []);

  const getSearchKey = async (value) => {
    if (value === "") {
      setCurrentList(productList);
      getSortOrder(currentSortOrder, productList);
    } else {
      await axios
        .get(
          `http://localhost:3000/product/search/${value.toLowerCase().trim()}`
        )
        .then((res) => {
          setCurrentList(res.data);
          getSortOrder(currentSortOrder, res.data);
        })
        .catch((err) => console.log(err));
    }
  };

  const getSortOrder = (value, current) => {
    if (value.length > 0) {
      if (!current) {
        current = currentList;
      }
      let temp = [...current];
      let sorted = [];
      if (value === "price_asc") {
        setCurrentSortOrder("price_asc");
        sorted = temp.sort((a, b) => {
          return parseFloat(a.price) - parseFloat(b.price);
        });
      } else if (value === "price_des") {
        setCurrentSortOrder("price_des");
        sorted = temp.sort((a, b) => {
          return parseFloat(b.price) - parseFloat(a.price);
        });
      } else if (value === "date_asc") {
        setCurrentSortOrder("date_asc");
        sorted = temp.sort((a, b) => {
          return new Date(a.createdAt) - new Date(b.createdAt);
        });
      } else if (value === "date_des") {
        setCurrentSortOrder("date_des");
        sorted = temp.sort((a, b) => {
          return new Date(b.createdAt) - new Date(a.createdAt);
        });
      }
      setCurrentList(sorted);
    }
  };

  const getSelectedBrandList = (value) => {
    console.log("Selected brands: ", value);
    let filtered = [];
    if (value.length === 0) {
      setCurrentList(productList);
    } else {
      value.map((brand) => {
        const temp = productList.filter((i) => i.brand === brand);
        temp.map((i) => filtered.push(i));
      });
      console.log("Filter brand: ", filtered);
      setCurrentList(filtered);
      getSortOrder(currentSortOrder, filtered);
    }
  };
  if (productList.length === 0) return <Loading />;
  else
    return (
      <div className="w-full flex gap-8 items-start px-4 py-8 lg:ml-32">
        <FilterSidebar
          brandList={brandList}
          getSearchKey={getSearchKey}
          getSortOrder={getSortOrder}
          getSelectedBrandList={getSelectedBrandList}
        />
        {currentList.length === 0 ? (
          <div className="w-full h-[40vh] flex flex-col items-center justify-center gap-8">
            <img src={NoResult} alt="" className="w-32 lg:w-64" />
            <p className="font-bold lg:text-xl">NO RESULTS FOUND</p>
          </div>
        ) : (
          <ShownList list={currentList} />
        )}
      </div>
    );
}
