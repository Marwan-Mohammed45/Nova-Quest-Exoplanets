import React, { useState } from 'react';
import './SearchSection.css';

const SearchSection = ({ onSearch, onRandom }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchType, setSearchType] = useState('image');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      onSearch(searchQuery, searchType);
    }
  };

  const handleRandom = () => {
    onRandom();
  };

  return (
    <section className="search-section">
      <div className="search-container">
        <h2 className="search-title">Discover the Cosmos</h2>
        <p className="search-description">
          Explore NASA's vast collection of space images, astronomy data, and planetary information
        </p>

        <form onSubmit={handleSubmit} className="search-form">
          <div className="search-input-group">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Enter planet, galaxy, or date (YYYY-MM-DD)..."
              className="search-input"
            />
            <button type="submit" className="search-button">
              🔍 Search
            </button>
          </div>

          <div className="search-options">
            <label className="option-label">
              <input
                type="radio"
                value="image"
                checked={searchType === 'image'}
                onChange={(e) => setSearchType(e.target.value)}
              />
              <span>Space Images</span>
            </label>

            <label className="option-label">
              <input
                type="radio"
                value="apod"
                checked={searchType === 'apod'}
                onChange={(e) => setSearchType(e.target.value)}
              />
              <span>Astronomy Picture</span>
            </label>

            <label className="option-label">
              <input
                type="radio"
                value="planet"
                checked={searchType === 'planet'}
                onChange={(e) => setSearchType(e.target.value)}
              />
              <span>Planetary Data</span>
            </label>
          </div>
        </form>

        <div className="action-buttons">
          <button onClick={handleRandom} className="random-button">
            🌟 Get Random Space Facts
          </button>
        </div>

        <div className="search-examples">
          <p>Try: "Mars", "Galaxy", "2024-01-15", or "Nebula"</p>
        </div>
      </div>
    </section>
  );
};

export default SearchSection;
