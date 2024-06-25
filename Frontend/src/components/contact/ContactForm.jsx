import React, { useState,useEffect } from "react";
import styles from "../../styles/ContactStyle.module.css";
import { Content } from "antd/es/layout/layout";
export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [product,setProducts] = useState();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
  };

  useEffect(() => {
     fetch("http://localhost:3000/contact/report")
      .then((response) => response.json())
      .then((data) => {
        setProducts(data);
      })
      .catch((error) => {
        console.error("Error fetching Contact", error);
      });
  }, []);
  return (
    <Content className="flex items-center justify-center mt-6 bg-gray-100">
      <div className="w-full max-w-full p-8 space-y-6 bg-white shadow-md rounded-lg">
        <h1 className="text-3xl font-semibold text-center text-gray-800">Contact Us</h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-600">
            Name:
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-200"
          />
    <div>
            <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-600">
              Email:
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-200"
            />
          </div>
          <div>
            <label htmlFor="message" className="block mb-2 text-sm font-medium text-gray-600">
              Message:
            </label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-200"
            />
          </div>
          <button type="submit" className="w-full px-4 py-2 font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring focus:ring-blue-200">
            Submit
          </button>
        </form>
      </div>
    </Content>
  );
}
