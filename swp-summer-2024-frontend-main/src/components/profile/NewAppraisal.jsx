import React, { useState, useEffect } from 'react';
    import moment from 'moment';

    export default function NewAppraisal() {
        const [products, setProducts] = useState([]);

        useEffect(() => {
            
            const fetchProducts = async () => {
              
                const response = await fetch(`http://localhost:3000/product`);
                const data = await response.json();
                setProducts(data);
            };

            fetchProducts();
        }, []);

        const getProductsAddedToday = () => {
            const today = moment().startOf('day');
            return products.filter((product) => {
                const productDate = moment(product.dateAdded);
                return productDate.isSame(today, 'day');
            });
        };

        return (
            <div>
                <h1>Products Added Today</h1>
                {getProductsAddedToday().map((product) => (
                    <div key={product.id}>
                        <h3>{product.name}</h3>
                        <p>{product.description}</p>
                    </div>
                ))}
            </div>
        );
    }