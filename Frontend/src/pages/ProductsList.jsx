import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Input, Select, Pagination, Typography, Button } from 'antd';
import { Link } from 'react-router-dom';

const { Text } = Typography;
const { Search } = Input;
const { Option } = Select;

export default function Products() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('');
  const [filterDialColor, setFilterDialColor] = useState('');
  const [sortOrder, setSortOrder] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  const productsPerPage = 8;

  useEffect(() => {
    const fetchProductsData = async () => {
      try {
        const response = await axios.get('http://localhost:3000/product');
        const products = response.data;
        setProducts(products);
        setFilteredProducts(products);
      } catch (error) {
        console.error('Failed to fetch products data', error);
      }
    };
    fetchProductsData();
  }, []);

  useEffect(() => {
    let result = products;

    if (searchTerm) {
      result = result.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (filterType) {
      result = result.filter(product => product.type === filterType);
    }

    if (filterDialColor) {
      result = result.filter(product => product.dialColor === filterDialColor);
    }

    if (sortOrder) {
      switch (sortOrder) {
        case 'lowToHigh':
          result.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));
          break;
        case 'highToLow':
          result.sort((a, b) => parseFloat(b.price) - parseFloat(a.price));
          break;
        case 'newest':
          result.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
          break;
        case 'oldest':
          result.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
          break;
        default:
          break;
      }
    }

    setFilteredProducts(result);
    setCurrentPage(1);
  }, [searchTerm, filterType, filterDialColor, sortOrder, products]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = Array.isArray(filteredProducts) ? filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct) : [];

  return (
    <div className="flex flex-col items-center m-5 w-full">
      <div className="w-full md:w-3/4 mb-8">
        <Search
          placeholder="Search products"
          enterButton
          onSearch={value => setSearchTerm(value)}
          className="mb-4"
          allowClear
          style={{ width: '100%' }}
        />
        <div className="w-full flex">
          <Select
            placeholder="Filter by Type"
            onChange={value => setFilterType(value)}
            allowClear
            className="mb-2"
            style={{ width: '100%' }}
          >
            <Option value="Quazt">Quazt</Option>
            <Option value="Automatic">Automatic</Option>
            <Option value="Solar">Solar</Option>
          </Select>
          <Select
            placeholder="Filter by Dial Color"
            onChange={value => setFilterDialColor(value)}
            allowClear
            className="mb-2"
            style={{ width: '100%' }}
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
        <div className="flex justify-between mb-4 m-2 w-full">
          <Button
            onClick={() => setSortOrder('lowToHigh')}
            style={{ backgroundColor: '#fff', color: '#33E9FF', flexGrow: 1 }}
            className="mr-2"
          >
            Low to High Price
          </Button>
          <Button
            onClick={() => setFilterDialColor('Black')}
            style={{ backgroundColor: '#fff', color: '#FF5133', flexGrow: 1 }}
            className="mr-2"
          >
            Black Color
          </Button>
          <Button
            onClick={() => setFilterType('Automatic')}
            style={{ backgroundColor: '#fff', color: '#FFB733', flexGrow: 1 }}
            className="mr-2"
          >
            Automatic Type
          </Button>
          <Button
            onClick={() => setSortOrder('newest')}
            style={{ backgroundColor: '#fff', color: '#2CC82E', flexGrow: 1 }}
            className="mr-2"
          >
            Newest Post
          </Button>
          <Select
            placeholder="Sort by"
            onChange={value => setSortOrder(value)}
            allowClear
            className="ml-2"
            style={{ width: '23%', flexGrow: 1 }}
          >
            <Option value="lowToHigh">Price: Low to High</Option>
            <Option value="highToLow">Price: High to Low</Option>
            <Option value="newest">Newest</Option>
            <Option value="oldest">Oldest</Option>
          </Select>
        </div>
      </div>
      <div className="flex flex-col items-center w-full">
        {currentProducts.length > 0 ? (
          currentProducts.map(product => (
            <Link key={product.id} to={`/product/${product.id}`} className="w-full">
              <div className="flex justify-center items-center bg-white shadow-md rounded-lg p-4 mb-4 w-11/12 lg:w-3/4 mx-auto transition-transform transform hover:scale-105 hover:shadow-lg">
                <img alt={product.name} src={product.image} className="w-40 h-auto object-contain rounded-lg mr-4" />
                <div className="flex-1 text-left">
                  <div className="mb-2">
                    <h2 className="text-sm md:text-base lg:text-lg font-semibold mb-1">{product.name}</h2>
                    <p className="text-gray-700 text-xs md:text-sm lg:text-base mb-1">Price: ${product.price}</p>
                  </div>
                  <div className="mb-2">
                    <Text type="secondary" className="text-xs md:text-sm lg:text-base font-bold">Date Posted: {new Date(product.createdAt).toLocaleDateString()}</Text>
                  </div>
                  <div className="mb-2 flex items-center">
                    <Text type="secondary" className="text-xs md:text-sm lg:text-base font-bold">Seller:</Text>
                    <img alt={product.owner.username} src={product.owner.avatar} className="w-8 h-8 object-cover rounded-full mr-2" />
                    <Text type="secondary" className="text-xs md:text-sm lg:text-base font-bold">{product.owner.username}</Text>
                  </div>
                </div>
              </div>
            </Link>
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
