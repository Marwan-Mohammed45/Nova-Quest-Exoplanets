import React, { useState } from 'react';
import './App.css';
import Header from './components/Header';
import SearchSection from './components/SearchSection';
import ResultsSection from './components/ResultsSection';
import LoadingSpinner from './components/LoadingSpinner';

const NASA_API_KEY = 'DEMO_KEY'; // استبدل بمفتاح NASA الخاص بك

function App() {
  const [searchResults, setSearchResults] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // دالة البحث
  const searchNASA = async (query, searchType) => {
    setLoading(true);
    setError('');
    
    try {
      let url = '';
      
      if (searchType === 'image') {
        url = `https://images-api.nasa.gov/search?q=${encodeURIComponent(query)}&media_type=image`;
      } else if (searchType === 'apod') {
        url = `https://api.nasa.gov/planetary/apod?api_key=${NASA_API_KEY}&date=${query}`;
      } else {
        url = `https://api.nasa.gov/planetary/apod?api_key=${NASA_API_KEY}&count=1`;
      }

      const response = await fetch(url);
      const data = await response.json();

      if (searchType === 'image') {
        setSearchResults({
          type: 'image',
          data: data.collection.items
        });
      } else {
        setSearchResults({
          type: 'apod',
          data: data
        });
      }
    } catch (err) {
      setError('Failed to fetch data from NASA API');
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  };

  // دالة الحصول على حقائق عشوائية
  const getRandomSpaceFact = async () => {
    setLoading(true);
    try {
      const response = await fetch(`https://api.nasa.gov/planetary/apod?api_key=${NASA_API_KEY}&count=5`);
      const data = await response.json();
      setSearchResults({
        type: 'random',
        data: data
      });
    } catch (err) {
      setError('Failed to fetch random space facts');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app">
      {/* خلفية النجوم */}
      <div className="stars-background">
        <div className="stars"></div>
        <div className="stars2"></div>
        <div className="stars3"></div>
      </div>

      <Header />

      <main className="main-content">
        <SearchSection 
          onSearch={searchNASA}
          onRandom={getRandomSpaceFact}
        />

        {loading && <LoadingSpinner />}

        {error && (
          <div className="error-message">{error}</div>
        )}

        {searchResults && !loading && (
          <ResultsSection results={searchResults} />
        )}
      </main>

    </div>
  );
}

export default App;
