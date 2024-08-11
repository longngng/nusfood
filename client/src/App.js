import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import NavBar from './component/NavBar';
import HomePage from './pages/HomePage';
import Footer from './component/Footer';

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
          </div>
          <Footer></Footer>
        </div>
      </Router>
    </Provider>
  );
};

export default App;
