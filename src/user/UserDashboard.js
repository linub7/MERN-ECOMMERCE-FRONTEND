import React, { useState, useEffect } from 'react';
import moment from 'moment';
import { Link } from 'react-router-dom';
import { isAuthenticated } from '../auth';
import Layout from '../core/Layout';
import { getPurchaseHistory } from './apiUser';

const UserDashboard = () => {
  const [history, setHistory] = useState([]);

  const {
    user: { _id, name, email, role },
    token,
  } = isAuthenticated();

  const init = (userId, token) => {
    getPurchaseHistory(userId, token)
      .then((data) => {
        setHistory(data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    init(_id, token);
  }, []);

  const userLinks = () => {
    return (
      <div className='card'>
        <h4 className='card-header'>User Links</h4>
        <ul className='list-group'>
          <li className='list-group-item'>
            <Link className='nav-link' to='/cart'>
              My Cart
            </Link>
          </li>
          <li className='list-group-item'>
            <Link className='nav-link' to={`/profile/${_id}`}>
              Update Profile
            </Link>
          </li>
        </ul>
      </div>
    );
  };

  const userInfo = () => (
    <div className='card mb-5'>
      <h3 className='card-header'>User Information</h3>
      <ul className='list-group'>
        <li className='list-group-item'>{name}</li>
        <li className='list-group-item'>{email}</li>
        <li className='list-group-item'>
          {role === 1 ? 'Admin' : role === 0 ? 'Registered User' : ''}
        </li>
      </ul>
    </div>
  );

  const purchaseHistory = (history) => {
    return (
      <div className='card mb-5'>
        <h3 className='card-header'>Purchase history</h3>
        <ul className='list-group'>
          <li className='list-group-item'>
            {history.map((h, i) => {
              return (
                <div key={i}>
                  <hr />
                  {h.products.map((p, productIndex) => {
                    return (
                      <div key={productIndex}>
                        <h6>Product name: {p.name}</h6>
                        <h6>Product price: ${p.price}</h6>
                        <h6>Purchased date: {moment(p.createdAt).fromNow()}</h6>
                      </div>
                    );
                  })}
                </div>
              );
            })}
          </li>
        </ul>
      </div>
    );
  };

  return (
    <Layout
      title='Dashboard'
      description={`G'Day ${name}`}
      className='container-fluid'
    >
      <div className='row'>
        <div className='col-3'>{userLinks()}</div>
        <div className='col-9'>
          {userInfo()}
          {purchaseHistory(history)}
        </div>
      </div>
    </Layout>
  );
};

export default UserDashboard;
