import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './components/HomePage';
import MemorialPage from './components/MemorialPage';
import VideoGallery from './components/VideoGallery';
import Navigation from './components/Navigation';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-stone-50 to-amber-50">
        <Navigation />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/memorial/:personId" element={<MemorialPage />} />
          <Route path="/videos/:galleryId" element={<VideoGallery />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;