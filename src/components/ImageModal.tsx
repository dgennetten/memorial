import React, { useEffect } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

interface Photo {
  date: string;
  caption: string;
  url: string;
}

interface ImageModalProps {
  photo: Photo;
  onClose: () => void;
  onPrevious?: () => void;
  onNext?: () => void;
}

const ImageModal: React.FC<ImageModalProps> = ({ photo, onClose, onPrevious, onNext }) => {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      switch (event.key) {
        case 'Escape':
          onClose();
          break;
        case 'ArrowLeft':
          if (onPrevious) onPrevious();
          break;
        case 'ArrowRight':
          if (onNext) onNext();
          break;
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'auto';
    };
  }, [onClose, onPrevious, onNext]);

  return (
    <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4">
      {/* Close Button */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 z-60 p-2 bg-white/10 hover:bg-white/20 rounded-full text-white transition-colors"
      >
        <X className="h-6 w-6" />
      </button>

      {/* Previous Button */}
      {onPrevious && (
        <button
          onClick={onPrevious}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-60 p-3 bg-white/10 hover:bg-white/20 rounded-full text-white transition-colors"
        >
          <ChevronLeft className="h-8 w-8" />
        </button>
      )}

      {/* Next Button */}
      {onNext && (
        <button
          onClick={onNext}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-60 p-3 bg-white/10 hover:bg-white/20 rounded-full text-white transition-colors"
        >
          <ChevronRight className="h-8 w-8" />
        </button>
      )}

      {/* Modal Content */}
      <div className="max-w-5xl max-h-full w-full flex flex-col items-center">
        <div className="relative max-w-full max-h-[80vh] mb-4">
          <img
            src={photo.url}
            alt={photo.caption}
            className="max-w-full max-h-full object-contain rounded-lg shadow-2xl"
          />
        </div>
        
        {/* Caption */}
        <div className="text-center bg-white/10 backdrop-blur-sm rounded-lg p-4 max-w-2xl">
          <p className="text-white text-lg font-medium mb-1">{photo.caption}</p>
          <p className="text-white/80 text-sm">{photo.date}</p>
        </div>
      </div>

      {/* Background Click to Close */}
      <div 
        className="absolute inset-0 -z-10" 
        onClick={onClose}
      />
    </div>
  );
};

export default ImageModal;