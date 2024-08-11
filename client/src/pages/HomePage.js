import React, { Fragment, useState, useEffect } from 'react';

import CanteenCard from '../component/CanteenCard';

import api from '../utils/api';

import './HomePage.css';

const HomePage = () => {
  const [selectedCampus, setSelectedCampus] = useState('All');

  const [canteens, setCanteens] = useState([]);

  useEffect(() => {
    api
      .get('canteens')
      .then((response) => {
        if (response.data.length > 0) {
          setCanteens(response.data);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleFilterChange = (e) => {
    setSelectedCampus(e.target.value);
  };

  const canteenDecode = {
    KR: 'Kent Ridge',
    UT: 'UTown',
  };

  const filteredCanteens =
    selectedCampus === 'All'
      ? canteens
      : canteens.filter(
          (canteen) => canteenDecode[canteen.campus] === selectedCampus
        );

  return (
    <Fragment>
      <div className="filter-container">
        <label htmlFor="campus-filter">Filter by Campus: </label>
        <select
          id="campus-filter"
          value={selectedCampus}
          onChange={handleFilterChange}
        >
          <option value="All">All</option>
          <option value="Kent Ridge">Kent Ridge</option>
          <option value="UTown">UTown</option>
        </select>
      </div>
      <div className="canteens">
        {filteredCanteens.map((canteen, index) => (
          <CanteenCard
            canteenId={canteen._id}
            name={canteen.name}
            campus={canteenDecode[canteen.campus]}
            imageLink={canteen.img_link}
          />
        ))}
      </div>
    </Fragment>
  );
};

export default HomePage;
