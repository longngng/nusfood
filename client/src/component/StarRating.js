import React from 'react';
import './StarRating.css';

const StarRating = ({ rating, onRate, size = 'large' }) => {
  const starClass = `star ${size}`;
  
  return (
    <div className={`star-rating ${size}`}>
      {[...Array(5)].map((star, index) => {
        const ratingValue = index + 1;
        return (
          <label key={index}>
            <input 
              type="radio" 
              name="rating" 
              value={ratingValue} 
              onClick={() => onRate(ratingValue)} 
            />
            <span 
              className={`${starClass} ${ratingValue <= rating ? 'filled' : ''}`} 
            >
              ★
            </span>
          </label>
        );
      })}
    </div>
  );
};

export default StarRating;
