import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import NavBar from './component/NavBar';
import Footer from './component/Footer';

import HomePage from './pages/HomePage';
import SignUp from './pages/SignUp';
import LogIn from './pages/LogIn';
import CanteenPage from './pages/CanteenPage';

import { Provider } from 'react-redux';
import store from './store';
import { loadUser } from './actions/auth';
import setAuthToken from './utils/setAuthToken';

import './App.css';

const App = () => {
  useEffect(() => {
    setAuthToken(localStorage.token);
    store.dispatch(loadUser());
  }, []);

  return (
    <Provider store={store}>
      <Router>
        <div className="app">
          <NavBar></NavBar>
          <div className="content">
            <Route path="/" exact component={HomePage} />
            <Route path="/register" component={SignUp} />
            <Route path="/login" component={LogIn} />
            <Route path="/canteens/:id" component={CanteenPage} />
          </div>
          <Footer></Footer>
        </div>
      </Router>
    </Provider>
  );
};

export default App;
