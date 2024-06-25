import React, { useEffect, useState } from "react";
import ProductDetailComponent from "../components/productDetail/ProductDetailComponent";
import RelatedProductList from "../components/productDetail/RelatedProductList";
import { useParams } from "react-router-dom";
import axios from "axios";

export default function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState();
  const [relatedProducts, setRelatedProducts] = useState([]);
  const cart = sessionStorage.cartList
    ? JSON.parse(sessionStorage.cartList)
    : [];
  const [isInCart, setIsInCart] = useState(false);

  const fetchProduct = async () => {
    await axios
      .get(`http://localhost:3000/product/withRelated/${id}`)
      .then((res) => {
        console.log("Product: ", res.data.product);
        setProduct(res.data.product);
        setRelatedProducts(res.data.relatedProducts);

        //Check if item has already been in cart
        if (cart.length > 0) {
          const foundInCart = cart.find(
            (item) => item.id === res.data.product.id
          );
          setIsInCart(foundInCart ? true : false);
        }
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    fetchProduct();
  }, []);

  return (
    <div className="min-h-[70vh] flex flex-col items-center gap-16 py-8">
      <ProductDetailComponent product={product} isInCart={isInCart} />
      <RelatedProductList list={relatedProducts} />
    </div>
  );
}
