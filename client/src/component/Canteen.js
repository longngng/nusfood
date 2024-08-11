import React from 'react';
import './Canteen.css';

const Canteen = ({dishes, canteenName, canteenImgLink}) => {
  return (
    <div className="canteen-container">
      <h1>{canteenName}</h1>
      <div className="canteen-content">
        <div className="canteen-summary">
        <img 
          src={canteenImgLink}
          alt="Canteen" 
          className="canteen-image" 
        />
          <p>
            This canteen offers a variety of delicious meals prepared with the freshest ingredients. 
            The ambiance is perfect for students to relax and enjoy their meals.
          </p>
        </div>

        <div className="canteen-description">
          <div className="dishes-prices">
            <h2>Dishes & Prices</h2>
            <ul>
              {dishes.map((dish) => <p>{dish.name} - ${parseFloat(dish.price.$numberDecimal).toFixed(2)}</p>)}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Canteen;
