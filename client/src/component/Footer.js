import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

const Footer = () => {
  return (
    <div className="footer">
      Project originated under NUS Orbital 2020. Remake in 2024
      <ul>
        <li>
          <a href="https://github.com/longngng/nood">GitHub</a>
        </li>
      </ul>
    </div>
  );
}
  
export default Footer;
