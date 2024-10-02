// Navbar.js
import React from 'react';
import './Navbar.css';

const Navbar = ({ onCategoryChange }) => {
  const categories = [
    { label: 'All', value: '' },
    { label: 'Business', value: 'business' },
    { label: 'Entertainment', value: 'entertainment' },
    { label: 'General', value: 'general' },
    { label: 'Health', value: 'health' },
    { label: 'Science', value: 'science' },
    { label: 'Sports', value: 'sports' },
    { label: 'Technology', value: 'technology' },
  ];

  return (
    <nav className="navbar">
      <ul className="category-list">
        {categories.map(category => (
          <li
            key={category.value}
            onClick={() => onCategoryChange(category.value)}
            className="category-item"
          >
            {category.label}
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Navbar;
