import React from 'react';
import './ReviewList.css';
import Review from './Review';

const ReviewList = ({reviews}) => {

  return (
    <div className="review-list">
      <h2>Reviews</h2>
      {reviews.map(review => <Review review={review}></Review>)}
    </div>
  );
}

export default ReviewList;
