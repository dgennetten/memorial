import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Heart } from 'lucide-react';

const Navigation: React.FC = () => {
  const location = useLocation();

  return (
    <nav className="bg-white/90 backdrop-blur-sm shadow-sm border-b border-stone-200 sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link 
            to="/" 
            className="flex items-center space-x-2 text-stone-800 hover:text-amber-700 transition-colors"
          >
            <Heart className="h-6 w-6" />
            <span className="font-semibold text-lg">Gennetten Family Memorial</span>
          </Link>
          
          {location.pathname !== '/' && (
            <Link 
              to="/" 
              className="flex items-center space-x-2 px-4 py-2 bg-amber-100 hover:bg-amber-200 rounded-lg text-stone-800 transition-colors"
            >
              <Home className="h-4 w-4" />
              <span>Home</span>
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navigation;