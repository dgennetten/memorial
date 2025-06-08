import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Calendar, Heart, Video, ArrowLeft } from 'lucide-react';
import PhotoGallery from './PhotoGallery';
import peopleData from '../data/peopleData.json';

interface Person {
  id: string;
  name: string;
  birth: string;
  death: string;
  shortMemorial: string;
  fullObituary: string;
  hasVideoGallery: boolean;
}

const MemorialPage: React.FC = () => {
  const { personId } = useParams<{ personId: string }>();
  const [person, setPerson] = useState<Person | null>(null);

  useEffect(() => {
    const foundPerson = peopleData.find(p => p.id === personId);
    setPerson(foundPerson || null);
    
    // Scroll to top when page loads
    window.scrollTo(0, 0);
  }, [personId]);

  if (!person) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 text-center">
        <h1 className="text-2xl font-bold text-stone-800">Person not found</h1>
        <Link to="/" className="text-amber-600 hover:text-amber-700 mt-4 inline-block">
          Return to home
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Back Button */}
      <Link 
        to="/"
        className="inline-flex items-center space-x-2 text-amber-600 hover:text-amber-700 mb-8 transition-colors"
      >
        <ArrowLeft className="h-4 w-4" />
        <span>Back to Family Memorial</span>
      </Link>

      {/* Memorial Header */}
      <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
        <div className="text-center mb-8">
          <div className="w-24 h-24 bg-gradient-to-br from-amber-100 to-stone-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <Heart className="h-12 w-12 text-amber-600" />
          </div>
          <h1 className="text-4xl font-bold text-stone-800 mb-4">{person.name}</h1>
          <div className="flex items-center justify-center text-stone-600 mb-4">
            <Calendar className="h-5 w-5 mr-2" />
            <span className="text-lg">{person.birth} - {person.death}</span>
          </div>
          <p className="text-xl text-stone-700 italic max-w-3xl mx-auto">
            {person.shortMemorial}
          </p>
        </div>

      </div>

      {/* Obituary */}
      <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
        <h2 className="text-2xl font-bold text-stone-800 mb-6">Memorial Obituary</h2>
        <div className="prose prose-stone max-w-none">
          {person.fullObituary.split('\n\n').map((paragraph, index) => (
            <p key={index} className="text-stone-700 leading-relaxed mb-4">
              {paragraph}
            </p>
          ))}
        </div>
      </div>

      {/* Photo Gallery */}
      <div className="mb-8">
      <PhotoGallery personId={person.id} personName={person.name} />
      </div>

      {/* Memorial Footer*/}

        {/* Video Gallery Link */}
        {person.hasVideoGallery && (
      <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
          <div className="text-center mb-8">
            <Link
              to={`/videos/${person.id === 'delbert-gennetten' ? 'delbert' : 'virginia'}`}
              className="inline-flex items-center space-x-2 bg-amber-600 hover:bg-amber-700 text-white px-6 py-3 rounded-lg transition-colors"
            >
              <Video className="h-5 w-5" />
              <span>View Video Memories (password required)</span>
            </Link>
          </div>
      </div>
        )}
      <div className="text-center mt-16 pt-8 border-t border-stone-200">
        <p className="text-stone-600 italic">
          "Those we love don't go away, they walk beside us every day."
        </p>
      </div>
 
   </div>
  );
};

export default MemorialPage;