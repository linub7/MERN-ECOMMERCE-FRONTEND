import React, { useEffect, useState } from 'react';
import { getProducts } from './apiCore';
import Card from './Card';
import Layout from './Layout';
import Search from './Search';

const Home = () => {
  const [productsBySell, setProductsBySell] = useState([]);
  const [productsByArrival, setProductsByArrival] = useState([]);
  const [error, setError] = useState('');

  const loadProductsBySell = () => {
    getProducts('sold').then((data) => {
      if (data.error) {
        setError(data.error);
      } else {
        setProductsBySell(data);
      }
    });
  };

  const loadProductsByArrival = () => {
    getProducts('createdAt').then((data) => {
      if (data.error) {
        setError(data.error);
      } else {
        setProductsByArrival(data);
      }
    });
  };

  useEffect(() => {
    loadProductsByArrival();
    loadProductsBySell();
  }, []);

  return (
    <Layout
      title='Home Page'
      description='Node REact E-Commerce App'
      className='container-fluid'
    >
      <Search />
      <h2 className='mb-4'>New Arrivals</h2>
      <div className='row'>
        {productsByArrival.map((pByArrive, index) => (
          <div key={index} className='col-4 mb-3'>
            <Card product={pByArrive} />
          </div>
        ))}
      </div>
      <h2 className='mb-4'>Best Sellers</h2>
      <div className='row'>
        {productsBySell.map((pBySell, index) => (
          <div key={index} className='col-4 mb-3'>
            <Card product={pBySell} />
          </div>
        ))}
      </div>
    </Layout>
  );
};

export default Home;
