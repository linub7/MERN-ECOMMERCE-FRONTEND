import React, { useEffect, useState } from 'react';
import { isAuthenticated } from '../auth';
import Layout from '../core/Layout';
import { listOrders, getStatusValues, updateOrderStatus } from './apiAdmin';
import moment from 'moment';

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [statusValues, setStatusValues] = useState([]);

  const { user, token } = isAuthenticated();

  const loadOrders = () => {
    listOrders(user._id, token).then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        setOrders(data);
      }
    });
  };

  const loadStatusValues = () => {
    getStatusValues(user._id, token).then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        setStatusValues(data);
      }
    });
  };

  useEffect(() => {
    loadOrders();
    loadStatusValues();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const showOrdersLength = () => {
    if (orders.length > 0) {
      return (
        <h1 className='text-danger display-2'>Total Orders: {orders.length}</h1>
      );
    } else {
      return <h1 className='text-danger'>No Orders</h1>;
    }
  };

  const showInput = (key, value) => (
    <div className='input-group mb-2 mr-sm-2'>
      <div className='input-group-prepend'>
        <div className='input-group-text'>{key}</div>
      </div>
      <input type='text' value={value} className='form-control' readOnly />
    </div>
  );

  const handleStatusChange = (e, orderId) => {
    updateOrderStatus(user._id, token, orderId, e.target.value).then((data) => {
      if (data.error) {
        console.log('Status Update failed');
      } else {
        loadOrders();
      }
    });
  };

  const showStatus = (order) => (
    <div className='form-group'>
      <h3 className='mark mb-4'>Status: {order.status}</h3>
      <select
        className='form-control'
        onChange={(e) => handleStatusChange(e, order._id)}
      >
        <option>Update Status</option>
        {statusValues.map((status, statusIndex) => (
          <option key={statusIndex} value={status}>
            {status}
          </option>
        ))}
      </select>
    </div>
  );
  return (
    <Layout
      title='Orders'
      description={`G'Day ${user.name}, you can manage akk the orders here`}
    >
      <div className='row'>
        <div className='col-md-8 offset-md-2'>
          {showOrdersLength()}
          {orders.map((order, orderIndex) => {
            return (
              <div
                className='mt-5'
                key={orderIndex}
                style={{ borderBottom: '5px solid indigo' }}
              >
                <h2 className='mb-5'>
                  <span className='bg-primary'>Order ID: {order._id}</span>
                </h2>
                <ul className='list-group mb-2'>
                  <li className='list-group-item'>{showStatus(order)}</li>
                  <li className='list-group-item'>
                    Transaction ID: {order.transaction_id}
                  </li>
                  <li className='list-group-item'>Amount: ${order.amount}</li>
                  <li className='list-group-item'>
                    Ordered By: {order.user.name}
                  </li>
                  <li className='list-group-item'>
                    Ordered On: {moment(order.createdAt).fromNow()}
                  </li>
                  <li className='list-group-item'>
                    Delivery Address: {order.address}
                  </li>
                </ul>
                <h3 className='mt-4 mb-4 font-italic'>
                  Total Products in the order: {order.products.length}
                </h3>
                {order.products.map((product, productIndex) => (
                  <div
                    className='mb-4'
                    key={productIndex}
                    style={{ padding: '20px', border: '1px solid indigo' }}
                  >
                    {showInput('Product name', product.name)}
                    {showInput('Product price', product.price)}
                    {showInput('Product total', product.count)}
                    {showInput('Product Id', product._id)}
                  </div>
                ))}
              </div>
            );
          })}
        </div>
      </div>
    </Layout>
  );
};

export default Orders;
