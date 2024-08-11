import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import PropTypes from 'prop-types';

import { setAlert } from '../actions/alert';
import { register } from '../actions/auth';

import './SignUp.css';
import './AuthPages.css';

const SignUp = ({ setAlert, register, isAuthenticated }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password2: '',
  });

  const { name, email, password, password2 } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    if (password !== password2) {
      console.log("Password don't match");
      setAlert('Passwords do not match', 'danger');
    } else {
      register({ name, email, password });
    }
  };

  if (isAuthenticated) {
    return <Redirect to="/dashboard" />;
  }

  return (
    <div className="setup-page auth-page">
      <div className="form-container">
        <h1>Sign up</h1>
        <div className="icon-container">
          <div className="icon">
            <i className="fas fa-utensils"></i>
          </div>
        </div>
        <form onSubmit={onSubmit}>
          <label>
            Full name
            <input
              name="name"
              value={name}
              type="text"
              placeholder="Enter your full name"
              onChange={onChange}
            />
          </label>
          <label>
            Email
            <input
              name="email"
              value={email}
              type="text"
              placeholder="Enter your email"
              onChange={onChange}
            />
          </label>
          <label>
            Password
            <input
              name="password"
              value={password}
              type="password"
              placeholder="Enter a password"
              onChange={onChange}
            />
          </label>
          <label>
            Confirm Your Password
            <input
              name="password2"
              value={password2}
              type="password"
              placeholder="Confirm your password"
              onChange={onChange}
            />
          </label>

          <button type="submit" className="signup-button">
            Sign up
          </button>
        </form>
      </div>
    </div>
  );
};

SignUp.propTypes = {
  setAlert: PropTypes.func.isRequired,
  register: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});
export default connect(mapStateToProps, { setAlert, register })(SignUp);
