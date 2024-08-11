import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import PropTypes from 'prop-types';

import { logout } from '../actions/auth';

import './NavBar.css';

const NavBar = ({ auth: { user, isAuthenticated, loading }, logout }) => {
  const scrollToTop = () => {
    window.scrollTo(0, 0);
  };

  const authLinks = (
    <div className="navbar-links">
      <Link to="/" className="link">
        <h5>Home</h5>
      </Link>

      <button onClick={logout} href="#!">
        <h5>Logout</h5>
      </button>

      {user && !loading && isAuthenticated && (
        <button className="disabled-link">
          <h5>Welcome {user.name}</h5>
        </button>
      )}
    </div>
  );

  const guestLinks = (
    <div className="navbar-links">
      <Link to="/" className="link">
        <h5>Home</h5>
      </Link>
      <Link to="/register" onClick={scrollToTop} className="link">
        <h5>Register</h5>
      </Link>
      <Link to="/login" onClick={scrollToTop} className="link">
        <h5>Login</h5>
      </Link>
    </div>
  );

  return (
    <nav className="navbar">
      <div className="navbar-logo">NUSFood</div>
      {!loading && (
        <Fragment>{isAuthenticated ? authLinks : guestLinks}</Fragment>
      )}
    </nav>
  );
};
NavBar.propTypes = {
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { logout })(NavBar);
