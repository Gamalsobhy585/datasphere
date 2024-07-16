import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export default function Navbar({ onSearchCustomer, onSearchAmount , onReset }) {
  const [searchCustomerName, setSearchCustomerName] = useState('');
  const [searchAmount, setSearchAmount] = useState('');

  const handleSearch = () => {
    if (searchCustomerName) {
      onSearchCustomer(searchCustomerName);
    } else if (searchAmount) {
      onSearchAmount(searchAmount);
    }
  };

  return (
    <nav className="navbar fixed-top navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <Link className='text-decoration-none'  onClick={onReset} to="/">
          <div className="d-flex flex-column justify-content-center align-items-center">
            <img src="Gold_coin_icon.png" width="40" height="40" className="d-inline-block align-top mb-2" alt="Logo" />
            <span className="navbar-brand brand-text text-decoration-none">
              Datasphere Your Path to Financial Gold
            </span>
          </div>
        </Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse justify-content-end" id="navbarSupportedContent">
          <form className="form-inline d-flex align-items-center justify-content-center my-2">
            <div className="input-group mb-2">
              <input
                type="text"
                className="form-control search-input"
                placeholder="Customer Name"
                value={searchCustomerName}
                onChange={(e) => setSearchCustomerName(e.target.value)}
              />
            </div>
            <div className="input-group mb-2">
              <input
                type="text"
                className="form-control search-input"
                placeholder="Transaction Amount"
                value={searchAmount}
                onChange={(e) => setSearchAmount(e.target.value)}
              />
            </div>
            <button type="button" className="btn mb-2 ms-3 fw-semibold btn-gold" onClick={handleSearch}>Search</button>
          </form>
        </div>
      </div>
    </nav>
  );
}
