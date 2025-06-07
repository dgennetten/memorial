import React, { useState, useEffect } from 'react';
import ImageModal from './ImageModal';

interface Photo {
  date: string;
  caption: string;
  url: string;
}

interface PhotoGalleryProps {
  personId: string;
  personName: string;
}

const PhotoGallery: React.FC<PhotoGalleryProps> = ({ personId, personName }) => {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState<number | null>(null);

  useEffect(() => {
    const loadPhotos = async () => {
      try {
        const photoData = await import(`../data/photos/${personId}.json`);
        setPhotos(photoData.default);
      } catch (error) {
        console.error('Failed to load photos:', error);
        setPhotos([]);
      }
    };

    loadPhotos();
  }, [personId]);

  const openModal = (index: number) => {
    setSelectedPhotoIndex(index);
  };

  const closeModal = () => {
    setSelectedPhotoIndex(null);
  };

  const navigatePhoto = (direction: 'prev' | 'next') => {
    if (selectedPhotoIndex === null) return;
    
    if (direction === 'prev' && selectedPhotoIndex > 0) {
      setSelectedPhotoIndex(selectedPhotoIndex - 1);
    } else if (direction === 'next' && selectedPhotoIndex < photos.length - 1) {
      setSelectedPhotoIndex(selectedPhotoIndex + 1);
    }
  };

  if (photos.length === 0) {
    return (
      <div className="bg-white rounded-2xl shadow-lg p-8">
        <h2 className="text-2xl font-bold text-stone-800 mb-6">Photo Memories</h2>
        <p className="text-stone-600">No photos available at this time.</p>
      </div>
    );
  }

  return (
    <>
      <div className="bg-white rounded-2xl shadow-lg p-8">
        <h2 className="text-2xl font-bold text-stone-800 mb-6">Photo Memories</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {photos.map((photo, index) => (
            <div
              key={index}
              className="group cursor-pointer"
              onClick={() => openModal(index)}
            >
              <div className="aspect-square rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105">
                <img
                  src={photo.url}
                  alt={photo.caption}
                  className="w-full h-full object-cover group-hover:brightness-110 transition-all duration-300"
                />
              </div>
              <p className="text-sm text-stone-600 mt-2 text-center leading-tight">
                {photo.date}
              </p>
            </div>
          ))}
        </div>
      </div>

      {selectedPhotoIndex !== null && (
        <ImageModal
          photo={photos[selectedPhotoIndex]}
          onClose={closeModal}
          onPrevious={selectedPhotoIndex > 0 ? () => navigatePhoto('prev') : undefined}
          onNext={selectedPhotoIndex < photos.length - 1 ? () => navigatePhoto('next') : undefined}
        />
      )}
    </>
  );
};

export default PhotoGallery;