//buy
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Card, Input, Select, Pagination } from "antd";
import { Link } from "react-router-dom";

const { Meta } = Card;
const { Search } = Input;
const { Option } = Select;

const gridStyle = {
  width: "25%",
  textAlign: "center",
};

export default function Products() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("");
  const [filterDialColor, setFilterDialColor] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const productsPerPage = 8;

  useEffect(() => {
    const fetchProductsData = async () => {
      try {
        const response = await axios.get("http://localhost:3000/product/buy");
        const products = response.data.products;
        setProducts(products);
        setFilteredProducts(products);
      } catch (error) {
        console.error("Failed to fetch products data", error);
      }
    };
    fetchProductsData();
  }, []);

  useEffect(() => {
    let result = products;

    // Lọc theo cụm từ tìm kiếm nếu nó ko trống
    if (searchTerm) {
      result = result.filter((product) =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Lọc theo loại nếu filterType đc chọn
    if (filterType) {
      result = result.filter((product) => product.type === filterType);
    }

    // Lọc theo màu quay số nếu filterDialColor đc chọn
    if (filterDialColor) {
      result = result.filter(
        (product) => product.dialColor === filterDialColor
      );
    }

    setFilteredProducts(result);
    setCurrentPage(1); // Đặt lại về trang đầu tiên bất cứ khi nào bộ lọc thay đổi
  }, [searchTerm, filterType, filterDialColor, products]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  // Calculate current items for pagination
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  return (
    <div className="flex flex-col items-center">
      <div className="w-full md:w-3/4 mb-8">
        <Search
          placeholder="Search products"
          enterButton
          onSearch={(value) => setSearchTerm(value)}
          className="mb-4"
          allowClear
          style={{ width: "100%" }}
        />
        <div className="flex justify-between mb-4">
          <Select
            placeholder="Filter by Type"
            onChange={(value) => setFilterType(value)}
            allowClear
            className="mr-2"
            style={{ width: "48%" }}
          >
            <Option value="Quazt">Quazt</Option>
            <Option value="Automatic">Automatic</Option>
            <Option value="Solar">Solar</Option>
          </Select>
          <Select
            placeholder="Filter by Dial Color"
            onChange={(value) => setFilterDialColor(value)}
            allowClear
            className="ml-2"
            style={{ width: "48%" }}
          >
            <Option value="Green">Green</Option>
            <Option value="Blue">Blue</Option>
            <Option value="Black">Black</Option>
            <Option value="Gold/Silver">Gold/Silver</Option>
            <Option value="Silver/Gold">Silver/Gold</Option>
            <Option value="Gry">Gry</Option>
            <Option value="Mltclr">Mltclr</Option>
          </Select>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        {currentProducts.length > 0 ? (
          currentProducts.map((product) => (
            <Card
              key={product.id}
              hoverable
              cover={
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-40 object-cover"
                />
              }
            >
              <Meta
                title={product.name}
                description={`Price: ${product.price}`}
              />
              <Link
                to={`/product/${product.id}`}
                className="bg-blue-500 text-white font-medium py-2 px-4 rounded-md block text-center mt-4"
              >
                View Details
              </Link>
            </Card>
          ))
        ) : (
          <p>No products found</p>
        )}
      </div>
      <Pagination
        current={currentPage}
        pageSize={productsPerPage}
        total={filteredProducts.length}
        onChange={handlePageChange}
        className="mt-4"
      />
    </div>
  );
}
