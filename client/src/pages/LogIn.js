import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { login } from '../actions/auth';

import PropTypes from 'prop-types';

import './LogIn.css';
import './AuthPages.css';

const LogIn = ({ login, isAuthenticated }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const { email, password } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    login(email, password);
  };

  if (isAuthenticated) {
    return <Redirect to="/" />;
  }

  return (
    <div className="login-page auth-page">
      <div className="form-container">
        <h1>Login</h1>
        <form onSubmit={onSubmit}>
          <label>
            Email
            <input
              name="email"
              type="text"
              placeholder="Enter your email"
              onChange={onChange}
            />
          </label>
          <label>
            Password
            <input
              name="password"
              type="password"
              placeholder="Enter your password"
              onChange={onChange}
            />
          </label>
          <button type="submit" className="login-button">
            Login
          </button>
        </form>
        <div className="alternative-options">
          <a href="/forgot-password">Forgot password?</a>
          <a href="/register">Don't have an account? Register</a>
        </div>
      </div>
    </div>
  );
};

LogIn.propTypes = {
  login: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { login })(LogIn);
