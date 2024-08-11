import React, { useState } from 'react';
import './ReviewForm.css';
import StarRating from './StarRating';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addReview } from '../actions/review';

const ReviewForm = ({ canteenId, addReview, addReviewFe}) => {
  const [rating, setRating] = useState(0);
  const [text, setText] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Rating:', rating);
    console.log('Review:', text);
    addReview(canteenId, { text, rating});
    setText('');
    addReviewFe({
      text, rating, likes: []
    })
  };

  return (
    <div className="review-form">
      <h2>Leave a review</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group-1">
          <StarRating rating={rating} onRate={setRating} />
        </div>
          <textarea 
            id="review" 
            className="textarea-review"
            value={text} 
            placeholder='Tell us what you think'
            onChange={(e) => setText(e.target.value)} 
            required 
          > </textarea>
        <button type="submit" className="submit-button">Submit Review</button>
      </form>
    </div>
  );
}

ReviewForm.propTypes = {
  canteenId: PropTypes.string.isRequired,
  addReview: PropTypes.func.isRequired,
};

export default connect(null, { addReview })(ReviewForm);
