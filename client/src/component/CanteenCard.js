import React from 'react';
import { Link } from 'react-router-dom';
import './CanteenCard.css';

const CanteenCard = ({ canteenId, name, campus, imageLink }) => {
  return (
    <div className="canteen-card">
      <img src={imageLink} alt={`${name}`} className="canteen-image" />
      <h2>{name}</h2>
      <p>{campus}</p>
      <button>
        <Link to={`/canteens/${canteenId}`}>
          <p>View Details</p>
        </Link>{' '}
      </button>
    </div>
  );
};

export default CanteenCard;
