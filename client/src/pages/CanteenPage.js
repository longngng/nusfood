import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Canteen from '../component/Canteen';
import ReviewForm from '../component/ReviewForm';
import ReviewList from '../component/ReviewList';
import './CanteenPage.css';

import { logout } from '../actions/auth';

import api from '../utils/api';

const CanteenPage = ({ auth: { isAuthenticated, loading }, logout }) => {
  const { id } = useParams();
  const [canteenData, setCanteenData] = useState(null);

  useEffect(() => {
    api
      .get(`canteens/${id}`)
      .then((response) => {
        console.log(response.data);
        if (response.data) {
          setCanteenData(response.data);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, [id]);

  const addReviewFe = (newReview) => {
    console.log(newReview);
    setCanteenData({
      ...canteenData,
      reviews: [...canteenData.reviews, newReview],
    });
  };
  if (canteenData) {
    return (
      <div className="canteen-page">
        <main>
          <div className="canteen-page-content">
            <div className="canteen-section">
              <Canteen
                canteenName={canteenData.name}
                dishes={canteenData.dishes}
                canteenImgLink={canteenData.img_link}
              />
            </div>
            <div className="reviews-section">
              <ReviewList reviews={canteenData.reviews} />
              {isAuthenticated && loading === false ? (
                <ReviewForm
                  canteenId={canteenData._id}
                  addReviewFe={addReviewFe}
                />
              ) : (
                <p>
                  Please <a href="/Login">Log in</a> or{' '}
                  <a href="Register">Sign up</a> to rate and comment
                </p>
              )}
            </div>
          </div>
        </main>
      </div>
    );
  }
  return <></>;
};

CanteenPage.propTypes = {
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { logout })(CanteenPage);
