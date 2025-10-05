// // components/SearchSection.js
// import React, { useState } from 'react';
// import './SearchSection.css';

// const SearchSection = ({ onSearch, onRandom }) => {
//   const [searchQuery, setSearchQuery] = useState('');
//   const [searchType, setSearchType] = useState('image');

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (searchQuery.trim()) {
//       onSearch(searchQuery, searchType);
//     }
//   };

//   const handleRandom = () => {
//     onRandom();
//   };

//   return (
//     <section className="search-section">
//       <div className="search-container">
//         <h2 className="search-title">Discover the Cosmos</h2>
//         <p className="search-description">
//           Search through NASA's vast collection of space images, astronomy data, and planetary information
//         </p>

//         <form onSubmit={handleSubmit} className="search-form">
//           <div className="search-input-group">
//             <input
//               type="text"
//               value={searchQuery}
//               onChange={(e) => setSearchQuery(e.target.value)}
//               placeholder="Enter planet name, space term, or date (YYYY-MM-DD)..."
//               className="search-input"
//             />
//             <button type="submit" className="search-button">
//               🔍 Search
//             </button>
//           </div>

//           <div className="search-options">
//             <label className="option-label">
//               <input
//                 type="radio"
//                 value="image"
//                 checked={searchType === 'image'}
//                 onChange={(e) => setSearchType(e.target.value)}
//               />
//               <span>Space Images</span>
//             </label>
            
//             <label className="option-label">
//               <input
//                 type="radio"
//                 value="apod"
//                 checked={searchType === 'apod'}
//                 onChange={(e) => setSearchType(e.target.value)}
//               />
//               <span>Astronomy Picture</span>
//             </label>
            
//             <label className="option-label">
//               <input
//                 type="radio"
//                 value="planet"
//                 checked={searchType === 'planet'}
//                 onChange={(e) => setSearchType(e.target.value)}
//               />
//               <span>Planetary Data</span>
//             </label>
//           </div>
//         </form>

//         <div className="action-buttons">
//           <button onClick={handleRandom} className="random-button">
//             🌟 Get Random Space Facts
//           </button>
//         </div>

//         <div className="search-examples">
//           <p>Try searching for: "Mars", "Galaxy", "2024-01-15", or "Nebula"</p>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default SearchSection;

// components/SearchSection.js
import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown'; // To render the response
import { GoogleGenerativeAI } from '@google/generative-ai';
import './SearchSection.css';

// --- Gemini API Setup ---
// Get API key from environment variables
const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

// Initialize the Generative AI model
const genAI = new GoogleGenerativeAI(API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

const SearchSection = () => { // Removed onSearch and onRandom props
  const [searchQuery, setSearchQuery] = useState('');
  const [searchType, setSearchType] = useState('planet'); // Default to planet for better context

  // State for API response
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [result, setResult] = useState('');

  const generatePrompt = (query, type) => {
    // Base instruction for the AI
    let basePrompt = "You are an expert AI assistant with access to NASA's archives. Your primary source for exoplanet data is NASA's Exoplanet Archive Composite Planet Data table: https://exoplanetarchive.ipac.caltech.edu/cgi-bin/TblView/nph-tblView?app=ExoTbls&config=PSCompPars. Answer the user's query concisely and informatively. Format your response using markdown for readability (e.g., use bolding for key terms, use lists for multiple results).";

    if (type === 'planet') {
      return `${basePrompt}\n\nThe user is asking for planetary data. Based on the Exoplanet Archive, answer the following query: "${query}"`;
    }
    if (type === 'image') {
      return `You are a helpful space enthusiast assistant. A user is searching for a space image. Based on their query, generate a vivid and engaging one-paragraph description of what a NASA image for "${query}" might look like. Do not mention that you are generating a description; describe the image itself.`;
    }
    if (type === 'apod') {
      return `You are an assistant knowledgeable about NASA's Astronomy Picture of the Day (APOD). If the user's query is a date (YYYY-MM-DD), provide a likely description for an APOD on or around that date. If it's a term, explain its significance in astronomy, possibly referencing a famous APOD. User's query: "${query}"`;
    }
    return query; // Fallback
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) {
      return; // Don't search if the query is empty
    }
    
    // Reset state and start loading
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
      setLoading(false); // Stop loading regardless of outcome
    }
  };

  const handleRandom = async () => {
    setSearchQuery(''); // Clear search query for random search
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
        <h2 className="search-title">Discover the Cosmos</h2>
        <p className="search-description">
          Search through NASA's vast collection of space images, astronomy data, and planetary information
        </p>

        <form onSubmit={handleSubmit} className="search-form">
          <div className="search-input-group">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Ex: 'Hottest exoplanet', 'TRAPPIST-1e'..."
              className="search-input"
            />
            <button type="submit" className="search-button" disabled={loading}>
              {loading ? 'Searching...' : '🔍 Search'}
            </button>
          </div>

          <div className="search-options">
            <label className="option-label">
              <input type="radio" value="planet" checked={searchType === 'planet'} onChange={(e) => setSearchType(e.target.value)} />
              <span>Planetary Data</span>
            </label>
            <label className="option-label">
              <input type="radio" value="image" checked={searchType === 'image'} onChange={(e) => setSearchType(e.target.value)} />
              <span>Image Descriptions</span>
            </label>
            <label className="option-label">
              <input type="radio" value="apod" checked={searchType === 'apod'} onChange={(e) => setSearchType(e.target.value)} />
              <span>Astronomy Picture</span>
            </label>
          </div>
        </form>

        <div className="action-buttons">
          <button onClick={handleRandom} className="random-button" disabled={loading}>
            🌟 Get Random Space Fact
          </button>
        </div>

        {/* --- Display Area for API Response --- */}
        <div className="results-container">
          {loading && <div className="loading-indicator">Please wait, querying the cosmos... ✨</div>}
          {error && <div className="error-message">{error}</div>}
          {result && (
            <div className="results-section">
                <ReactMarkdown>{result}</ReactMarkdown>
            </div>
          )}
        </div>
        
      </div>
    </section>
  );
};

export default SearchSection;