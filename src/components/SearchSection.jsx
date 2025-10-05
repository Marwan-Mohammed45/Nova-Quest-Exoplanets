// components/SearchSection.js
import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { GoogleGenerativeAI } from '@google/generative-ai';
import './SearchSection.css';

// --- Gemini API Setup ---
const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

const SearchSection = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchType, setSearchType] = useState('planet');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [result, setResult] = useState('');

  const generatePrompt = (query, type) => {
    let basePrompt = "You are an expert AI assistant with access to NASA's archives. Your primary source for exoplanet data is NASA's Exoplanet Archive Composite Planet Data table: https://exoplanetarchive.ipac.caltech.edu/cgi-bin/TblView/nph-tblView?app=ExoTbls&config=PSCompPars. Answer the user's query concisely and informatively. Format your response using markdown for readability.";

    if (type === 'planet') {
      return `${basePrompt}\n\nThe user is asking for planetary data. Based on the Exoplanet Archive, answer the following query: "${query}"`;
    }
    if (type === 'image') {
      return `You are a helpful space enthusiast assistant. A user is searching for a space image. Based on their query, generate a vivid and engaging one-paragraph description of what a NASA image for "${query}" might look like. Do not mention that you are generating a description; describe the image itself.`;
    }
    if (type === 'apod') {
      return `You are an assistant knowledgeable about NASA's Astronomy Picture of the Day (APOD). If the user's query is a date (YYYY-MM-DD), provide a likely description for an APOD on or around that date. If it's a term, explain its significance in astronomy, possibly referencing a famous APOD. User's query: "${query}"`;
    }
    return query;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    
    setLoading(true);
    setError(null);
    setResult('');

    try {
      const prompt = generatePrompt(searchQuery, searchType);
      const generationResult = await model.generateContent(prompt);
      const response = await generationResult.response;
      const text = response.text();
      setResult(text);
    } catch (err) {
      console.error("Error fetching data from Gemini:", err);
      setError("Failed to get a response. Please check your API key or try again later.");
    } finally {
      setLoading(false);
    }
  };

  const handleRandom = async () => {
    setSearchQuery('');
    setLoading(true);
    setError(null);
    setResult('');

    try {
      const randomPrompt = "Provide one fascinating and surprising fact about space or exoplanets from NASA's archives. Make it a short, single paragraph.";
      const generationResult = await model.generateContent(randomPrompt);
      const response = await generationResult.response;
      const text = response.text();
      setResult(text);
    } catch (err) {
      console.error("Error fetching random fact from Gemini:", err);
      setError("Failed to get a random fact. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="search-section">
      <div className="search-container">
        <div className="search-header">
          <h2 className="search-title">Discover the Cosmos</h2>
          <p className="search-description">
            Search through NASA's vast collection of space images, astronomy data, and planetary information
          </p>
        </div>

        <form onSubmit={handleSubmit} className="search-form">
          <div className="search-input-group">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Ex: 'Hottest exoplanet', 'TRAPPIST-1e', 'Mars rover'..."
              className="search-input"
            />
            <button type="submit" className="search-button" disabled={loading}>
              {loading ? (
                <>
                  <span className="loading-spinner"></span>
                  Searching...
                </>
              ) : (
                <>
                  <span className="search-icon">🔍</span>
                  Search
                </>
              )}
            </button>
          </div>

          <div className="search-options">
            <label className="option-label">
              <input 
                type="radio" 
                value="planet" 
                checked={searchType === 'planet'} 
                onChange={(e) => setSearchType(e.target.value)} 
              />
              <span className="option-text">
                <span className="option-icon">🪐</span>
                Planetary Data
              </span>
            </label>
            <label className="option-label">
              <input 
                type="radio" 
                value="image" 
                checked={searchType === 'image'} 
                onChange={(e) => setSearchType(e.target.value)} 
              />
              <span className="option-text">
                <span className="option-icon">🖼️</span>
                Image Descriptions
              </span>
            </label>
            <label className="option-label">
              <input 
                type="radio" 
                value="apod" 
                checked={searchType === 'apod'} 
                onChange={(e) => setSearchType(e.target.value)} 
              />
              <span className="option-text">
                <span className="option-icon">🌟</span>
                Astronomy Picture
              </span>
            </label>
          </div>
        </form>

        <div className="action-buttons">
          <button onClick={handleRandom} className="random-button" disabled={loading}>
            <span className="random-icon">✨</span>
            Get Random Space Fact
          </button>
        </div>

        <div className="search-examples">
          <p>Try: "Hottest exoplanet", "TRAPPIST-1e", "Hubble deep field", or "2024-01-15"</p>
        </div>

        {/* Results Display Area */}
        <div className="results-container">
          {loading && (
            <div className="loading-indicator">
              <div className="loading-spinner-large"></div>
              <p>Querying the cosmos... ✨</p>
            </div>
          )}
          
          {error && (
            <div className="error-message">
              <div className="error-icon">⚠️</div>
              <p>{error}</p>
            </div>
          )}
          
          {result && (
            <div className="results-section">
              <div className="result-card">
                <div className="result-header">
                  <h3>Search Results</h3>
                  <span className="result-type-badge">{searchType}</span>
                </div>
                <div className="result-content">
                  <ReactMarkdown>{result}</ReactMarkdown>
                </div>
                <div className="result-footer">
                  <span className="result-source">Source: NASA Archives via Gemini AI</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default SearchSection;