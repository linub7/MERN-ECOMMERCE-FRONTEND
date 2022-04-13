import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { signup } from '../auth';
import Layout from '../core/Layout';

const Signup = () => {
  const [values, setValues] = useState({
    name: '',
    email: '',
    password: '',
    error: '',
    success: false,
  });

  const { name, email, password, error, success } = values;

  const signUpForm = () => (
    <form>
      <div className='form-group'>
        <label className='text-muted'>Name</label>
        <input
          type='text'
          className='form-control'
          onChange={handleChange('name')}
          value={name}
        />
      </div>
      <div className='form-group'>
        <label className='text-muted'>Email</label>
        <input
          type='email'
          className='form-control'
          onChange={handleChange('email')}
          value={email}
        />
      </div>
      <div className='form-group'>
        <label className='text-muted'>Password</label>
        <input
          type='password'
          className='form-control'
          onChange={handleChange('password')}
          value={password}
        />
      </div>
      <button onClick={clickSubmit} className='btn btn-primary'>
        Sign Up
      </button>
    </form>
  );

  const handleChange = (name) => (event) => {
    setValues({ ...values, error: false, [name]: event.target.value });
  };

  const clickSubmit = (e) => {
    e.preventDefault();
    setValues({ ...values, error: false });
    signup({ name, email, password }).then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error, success: false });
      } else {
        setValues({
          ...values,
          success: true,
          name: '',
          email: '',
          password: '',
          error: '',
        });
      }
    });
  };
  return (
    <Layout
      title='Sign Up'
      description='Sign up to Node React E-Commerce'
      className='container col-md-8 offset-md-2'
    >
      {error ? <div className='alert alert-danger'>{error}</div> : ''}
      {success ? (
        <div className='alert alert-info'>
          New account is created.Please <Link to='/signin'>Sign in</Link>
        </div>
      ) : (
        ''
      )}
      {signUpForm()}
    </Layout>
  );
};

export default Signup;
