import React from 'react';
import '../css/Notfound.css';
import construction from '../images/construction.png';

export default function NotFound() {
  return (
    <div className="container">
      <h1 className="notfound-text">Not Found</h1>
      <p className="error-text">Page for drinks by nationalities</p>
      <p className="error-text">404 ERROR</p>
      <img
        src={ construction }
        alt="construction"
        className="construction"
      />
    </div>
  );
}
