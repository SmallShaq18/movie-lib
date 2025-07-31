import React from 'react';
// src/components/Navbar.jsx
import { Link, NavLink } from "react-router-dom";
import { useState } from "react";

export default function Navbar() {

  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="navbar navbar-expand-md navbar-dark bg-dark px-3 navbar-custom">
      <div className="container-fluid">
        <Link to="/" className="navbar-brand fw-bold">
          🎬 MovieLib
        </Link>

        <button className={`navbar-toggler ${isOpen ? "open" : ""}`} type="button" onClick={() => setIsOpen(!isOpen)} aria-label="Toggle navigation">
          <span className="toggler-icon"></span>
          <span className="toggler-icon"></span>
          <span className="toggler-icon"></span>
        </button>

        <div className={`collapse navbar-collapse ${isOpen ? "show" : ""}`} id="navbarNav">
          <ul className="navbar-nav ms-auto navv">
            <li className="nav-item">
              <NavLink to="/" className="nav-link" onClick={() => setIsOpen(false)} end>
                Home
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/movies" className="nav-link" onClick={() => setIsOpen(false)}>
                All
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/watched" className="nav-link" onClick={() => setIsOpen(false)}>
                Watched
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/wantToWatch" className="nav-link" onClick={() => setIsOpen(false)}>
                Want to Watch
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
