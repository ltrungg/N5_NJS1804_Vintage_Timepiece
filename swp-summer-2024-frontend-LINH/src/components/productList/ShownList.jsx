import React, { useState } from "react";
import SingleProduct from "./SingleProduct";
import { Pagination } from "antd";

export default function ShownList({ list }) {
  const wishList = sessionStorage.wishList
    ? JSON.parse(sessionStorage.wishList)
    : [];
  const [currentWishList, setCurrentWishList] = useState(wishList);

  const defaultPageSize = 16;
  const [pagingState, setPagingState] = useState({
    min: 0,
    max: defaultPageSize,
  });

  const handlePageChange = (page) => {
    setPagingState({
      min: (page - 1) * defaultPageSize,
      max: page * defaultPageSize,
    });
  };

  const getAddToWishList = (value, type) => {
    console.log(`${type} to wish list: `, value);
    let updated = [...currentWishList];
    if (type === "add") {
      updated.push(value);
    } else if (type === "remove") {
      updated = currentWishList.filter((item) => item !== value);
    }
    setCurrentWishList(updated);
  };

  return (
    <div className="w-full flex flex-row flex-wrap items-start justify-start gap-4 p-4">
      {list.slice(pagingState.min, pagingState.max).map((item) => {
        const check = currentWishList.some((i) => item.id === i.id);
        return (
          <SingleProduct
            key={item.id}
            product={item}
            isWishList={check}
            getAddToWishList={getAddToWishList}
          />
        );
      })}
      <Pagination
        total={list.length}
        pageSize={defaultPageSize}
        hideOnSinglePage={true}
        size="default"
        onChange={handlePageChange}
        className="w-full text-center mt-8"
      />
    </div>
  );
}
