// components/ResultsSection.js
import React from 'react';
import './ResultsSection.css';

const ResultsSection = ({ results }) => {
  if (!results) return null;

  const renderImageResults = () => {
    if (!results.data || results.data.length === 0) {
      return <div className="no-results">No images found. Try a different search term.</div>;
    }

    return (
      <div className="images-grid">
        {results.data.slice(0, 12).map((item, index) => (
          <div key={index} className="image-card">
            <div className="image-container">
              <img 
                src={item.links?.[0]?.href || '/placeholder-image.jpg'} 
                alt={item.data?.[0]?.title || 'NASA Image'}
                onError={(e) => {
                  e.target.src = 'https://via.placeholder.com/300x200/1e293b/94a3b8?text=NASA+Image';
                }}
              />
            </div>
            <div className="image-info">
              <h3 className="image-title">{item.data?.[0]?.title || 'Untitled'}</h3>
              <p className="image-description">
                {item.data?.[0]?.description?.substring(0, 150) || 'No description available.'}...
              </p>
              <div className="image-meta">
                <span className="image-date">
                  {item.data?.[0]?.date_created?.substring(0, 10) || 'Unknown date'}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  };

  const renderAPODResults = () => {
    const apod = results.data;
    
    return (
      <div className="apod-container">
        <div className="apod-card">
          <h2 className="apod-title">{apod.title || 'Astronomy Picture of the Day'}</h2>
          <div className="apod-content">
            {apod.url && (
              <div className="apod-media">
                {apod.media_type === 'video' ? (
                  <iframe
                    src={apod.url}
                    title={apod.title}
                    className="apod-video"
                    allowFullScreen
                  />
                ) : (
                  <img src={apod.url} alt={apod.title} className="apod-image" />
                )}
              </div>
            )}
            <div className="apod-info">
              <p className="apod-date"><strong>Date:</strong> {apod.date}</p>
              <p className="apod-explanation">{apod.explanation}</p>
              {apod.copyright && (
                <p className="apod-copyright"><strong>Copyright:</strong> {apod.copyright}</p>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderRandomResults = () => {
    if (!results.data || results.data.length === 0) {
      return <div className="no-results">No random facts available at the moment.</div>;
    }

    return (
      <div className="random-facts">
        <h2 className="section-title">🌌 Random Space Discoveries</h2>
        <div className="facts-grid">
          {results.data.map((fact, index) => (
            <div key={index} className="fact-card">
              <h3 className="fact-title">{fact.title}</h3>
              {fact.url && (
                <div className="fact-image">
                  <img src={fact.url} alt={fact.title} />
                </div>
              )}
              <p className="fact-explanation">
                {fact.explanation?.substring(0, 200)}...
              </p>
              <div className="fact-date">{fact.date}</div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <section className="results-section">
      {results.type === 'image' && renderImageResults()}
      {results.type === 'apod' && renderAPODResults()}
      {results.type === 'random' && renderRandomResults()}
    </section>
  );
};

export default ResultsSection;