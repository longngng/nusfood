import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import AboutUs from './component/pages/Aboutus';
import Homepage from './component/pages/Homepage';
import Login from './component/auth/Login';
import Register from './component/auth/Register';
import PrivateRoute from './component/routing/PrivateRoute';
import SingleCampus from './component/pages/SingleCampus';
import Canteen from './component/pages/Canteen';

// Redux
import { Provider } from 'react-redux';
import store from './store';
import { loadUser } from './actions/auth';
import setAuthToken from './utils/setAuthToken';

import Alert from './component/layout/Alert';

import './App.css';
import Navbar from './component/layout/Navbar';
import Footer from './component/layout/Footer';
import SignUpRemake from './pages/SignUpRemake';
import LogInRemake from './pages/LogInRemake';
import HomePageRemake from './pages/HomePageRemake';
import NavBarRemake from './component/NavBarRemake';
import FooterRemake from './component/FooterRemake';
import Canteen from './pages/Canteen';

const App = () => {
  useEffect(() => {
    setAuthToken(localStorage.token);
    store.dispatch(loadUser());
  }, []);

  return (
    <Provider store={store}>
      <Router>
        <div className="app">
          <NavBarRemake></NavBarRemake>
          {/* <Navbar /> */}
          <Alert />
          <div className="content">


            {/* <Route path="/" exact component={Homepage} /> */}
            <Route path="/" exact component={HomePageRemake} />

            {/* {/* <Route
              path="/kent-ridge"
              render={() => <SingleCampus campusCode="KR" />}
            /> */}
            {/* <Route
              path="/bukit-timah"
              render={() => <SingleCampus campusCode="BT" />}
            /> */}
            {/* <Route
              path="/utown"
              render={() => <SingleCampus campusCode="UT" />}
            /> */}

           

            {/* <Route path="/about" component={AboutUs} /> */}

             {/* <Route path="/canteen_remake" component={Canteen} /> */}
             <Route path="/canteens/:id" component={Canteen} />
            <Route path="/canteens_old/:id" component={Canteen} />

            {/* <Route path="/login_legacy" component={Login} />
          <Route path="/register_legacy" component={Register} /> */}
            <Route path="/register" component={SignUpRemake} />
            <Route path="/login" component={LogInRemake} />
          </div>
          {/* <Footer /> */}
          <FooterRemake></FooterRemake>
        </div>
      </Router>
    </Provider>
  );
};

export default App;
