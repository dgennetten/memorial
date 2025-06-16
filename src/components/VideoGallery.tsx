import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, ExternalLink, Lock } from 'lucide-react';
import ReactPlayer from 'react-player';

interface Video {
  date: string;
  caption: string;
  url: string;
}

const VideoGallery: React.FC = () => {
  const { galleryId } = useParams<{ galleryId: string }>();
  const [videos, setVideos] = useState<Video[]>([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const loadVideos = async () => {
      if (!galleryId || !isAuthenticated) return;
      try {
        const videoData = await import(`../data/videos/${galleryId}.json`);
        setVideos(videoData.default);
      } catch (error) {
        console.error('Failed to load videos:', error);
        setVideos([]);
      }
    };
    loadVideos();
  }, [galleryId, isAuthenticated]);

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === 'FamilyVideos2025!') {
      setIsAuthenticated(true);
      setError('');
    } else {
      setError('Incorrect password. Please try again.');
    }
  };

  // Extracts the file ID from a Google Drive URL
  const getFileId = (driveUrl: string) => {
    const match = driveUrl.match(/\/d\/([a-zA-Z0-9_-]+)/);
    return match ? match[1] : '';
  };

  // Returns a direct downloadable link for react-player
  const getDirectVideoUrl = (driveUrl: string) => {
    const fileId = getFileId(driveUrl);
    return fileId ? `https://drive.google.com/uc?id=${fileId}` : '';
  };

  // Returns the Google Drive preview link for "Open Full Screen"
  const getFullScreenUrl = (driveUrl: string) => {
    const fileId = getFileId(driveUrl);
    return fileId ? `https://drive.google.com/file/d/${fileId}/view` : driveUrl;
  };

  const galleryTitle = galleryId === 'delbert' ? 'Delbert Donald Gennetten' : 'Dorothy Virginia Gennetten';

  if (!isAuthenticated) {
    return (
      <div className="max-w-md mx-auto px-4 py-16">
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <div className="text-center mb-6">
            <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Lock className="h-8 w-8 text-amber-600" />
            </div>
            <h1 className="text-2xl font-bold text-stone-800 mb-2">Video Gallery Access</h1>
            <p className="text-stone-600">This video gallery is password protected.</p>
          </div>
          
          <form onSubmit={handlePasswordSubmit} className="space-y-4">
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-stone-700 mb-2">
                Password
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 border border-stone-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-colors"
                placeholder="Enter password"
              />
            </div>
            
            {error && (
              <p className="text-red-600 text-sm">{error}</p>
            )}
            
            <button
              type="submit"
              className="w-full bg-amber-600 hover:bg-amber-700 text-white font-medium py-3 px-4 rounded-lg transition-colors"
            >
              Access Gallery
            </button>
          </form>

          <div className="mt-6 text-center">
            <Link 
              to="/"
              className="inline-flex items-center space-x-2 text-amber-600 hover:text-amber-700 transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Back to Home</span>
            </Link>
          </div>
        </div>
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

      {/* Header */}
      <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
        <h1 className="text-3xl font-bold text-stone-800 text-center mb-4">
          Video Memories - {galleryTitle}
        </h1>
        <p className="text-stone-600 text-center">
          Precious video memories to cherish and remember
        </p>
        
      </div>
<div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4" role="alert">
  <p className="font-bold">Warning</p>
  <p>Thumbnail player is not working. Use full screen link.</p>
</div>
      {/* Video Grid */}
      {videos.length > 0 ? (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {videos.map((video, index) => {
            const directUrl = getDirectVideoUrl(video.url);
            return (
              <div key={index} className="bg-white rounded-xl shadow-lg overflow-hidden">
                <div className="relative aspect-video bg-stone-100 flex items-center justify-center">
                  <ReactPlayer
                    url={directUrl}
                    controls
                    width="100%"
                    height="100%"
                    light // shows preview with play button
                    playIcon={
                      <div className="flex items-center justify-center w-full h-full">
                        <div className="bg-black/40 rounded-full p-4">
                          <svg width="48" height="48" fill="none" viewBox="0 0 24 24">
                            <circle cx="12" cy="12" r="12" fill="black" fillOpacity="0.4"/>
                            <polygon points="10,8 16,12 10,16" fill="white"/>
                          </svg>
                        </div>
                      </div>
                    }
                    style={{ borderRadius: '0.75rem', overflow: 'hidden' }}
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-stone-800 mb-2">{video.caption}</h3>
                  <p className="text-sm text-stone-600 mb-3">{video.date}</p>
                  <a
                    href={getFullScreenUrl(video.url)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center space-x-2 text-amber-600 hover:text-amber-700 text-sm transition-colors"
                  >
                    <ExternalLink className="h-4 w-4" />
                    <span>Open Full Screen</span>
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
          <p className="text-stone-600">No videos available for this gallery.</p>
        </div>
      )}
    </div>
  );
};

export default VideoGallery;