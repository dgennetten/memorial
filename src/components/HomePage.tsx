import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Heart } from 'lucide-react';
import peopleData from '../data/peopleData.json';

const HomePage: React.FC = () => {
  const [personPhotos, setPersonPhotos] = useState<Record<string, string>>({});

  useEffect(() => {
    const loadFirstPhotos = async () => {
      const photos: Record<string, string> = {};
      
      for (const person of peopleData) {
        try {
          const photoData = await import(`../data/photos/${person.id}.json`);
          if (photoData.default && photoData.default.length > 0) {
            photos[person.id] = photoData.default[0].url;
          }
        } catch (error) {
          console.error(`Failed to load photos for ${person.id}:`, error);
        }
      }
      
      setPersonPhotos(photos);
    };

    loadFirstPhotos();
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-stone-800 mb-4">
          Gennetten Family Memorial
        </h1>
        <p className="text-xl text-stone-600 max-w-3xl mx-auto leading-relaxed">
          In loving memory of our cherished family members who continue to live on in our hearts and memories.
        </p>
      </div>

      {/* Family Tree Section */}
      <div className="mb-16">
        <h2 className="text-3xl font-bold text-stone-800 text-center mb-8">Our Family Tree</h2>
        <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
          <img 
            src="https://raw.githubusercontent.com/dgennetten/mausoleum/b064b5b08a75af4775094a0019ca111ec1a6a87f/src/images/GennettenMemorial.png"
            alt="Gennetten Family Tree"
            className="w-full max-w-4xl mx-auto "
          />
        </div>
      </div>

      {/* Memorial Gallery */}
      <div className="mb-16">
        <h2 className="text-3xl font-bold text-stone-800 text-center mb-8">In Loving Memory</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {peopleData.map((person) => (
            <Link
              key={person.id}
              to={`/memorial/${person.id}`}
              className="group"
            >
              <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 overflow-hidden">
                <div className="h-48 bg-gradient-to-br from-amber-100 to-stone-100 flex items-center justify-center overflow-hidden">
                  {personPhotos[person.id] ? (
                    <img
                      src={personPhotos[person.id]}
                      alt={person.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  ) : (
                    <Heart className="h-16 w-16 text-amber-600 group-hover:text-amber-700 transition-colors" />
                  )}
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-stone-800 mb-2 group-hover:text-amber-700 transition-colors">
                    {person.name}
                  </h3>
                  <div className="flex items-center text-stone-600 mb-3">
                    <Calendar className="h-4 w-4 mr-2" />
                    <span className="text-sm">
                      {person.birth} - {person.death}
                    </span>
                  </div>
                  <p className="text-stone-700 text-sm leading-relaxed">
                    {person.shortMemorial}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Timeline Section */}
      <div className="mb-16">
        <h2 className="text-3xl font-bold text-stone-800 text-center mb-8">Family Timeline</h2>
        <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
          <img 
            src="https://raw.githubusercontent.com/dgennetten/mausoleum/b064b5b08a75af4775094a0019ca111ec1a6a87f/src/images/Timeline.png"
            alt="Family Timeline"
            className="w-full max-w-6xl mx-auto"
          />
        </div>
      </div>

      {/* Footer */}
      <div className="text-center mt-16 pt-8 border-t border-stone-200">
        <p className="text-stone-600 italic">
          "Those we love don't go away, they walk beside us every day."
        </p>
      </div>
    </div>
  );
};

export default HomePage;