import { useState, useEffect } from 'react';
import DashboardNav from "../../../@Dashboard/nav";

const Gallery = () => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const isProcessing = (timestamp) => {
    if (!timestamp) return false;
    const imageTime = new Date(timestamp);
    const currentTime = new Date();
    const diffInMinutes = (currentTime - imageTime) / (1000 * 60);
    return diffInMinutes < 8;
  };

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await fetch('https://agroxsat.onrender.com/backendapi/images/');
        const data = await response.json();
        if (data && Array.isArray(data)) {
          const processedImages = data.map(img => ({
            ...img,
            imageUrl: `data:image/jpeg;base64,${img.image}`,
            isProcessing: isProcessing(img.timestamp)
          }));
          setImages(processedImages);
        }
      } catch (err) {
        console.error('Error fetching images:', err);
        setError('Failed to load images');
      } finally {
        setLoading(false);
      }
    };

    fetchImages();
    // Refresh every minute to update processing status
    const interval = setInterval(fetchImages, 60000);
    return () => clearInterval(interval);
  }, []);

  if (loading) return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-xl">Loading images...</div>
    </div>
  );

  if (error) return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-xl text-red-500">{error}</div>
    </div>
  );

  return (
    <>
      <DashboardNav />
      <div className="pt-16 md:pt-10">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 p-4 md:p-16">
          {images.map((image, index) => (
            <div key={index} className="relative group">
              {image.isProcessing ? (
                <div className="h-64 bg-gray-100 rounded-lg flex items-center justify-center">
                  <div className="text-center p-4">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
                    <p className="text-gray-600">Processing incoming image...</p>
                    <p className="text-sm text-gray-400">Please wait</p>
                  </div>
                </div>
              ) : (
                <>
                  <img
                    className="h-auto max-w-full rounded-lg transition-transform duration-200 group-hover:scale-105"
                    src={image.imageUrl}
                    alt={`Satellite Image ${index + 1}`}
                    loading="lazy"
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white p-2 rounded-b-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                    {new Date(image.timestamp).toLocaleString()}
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Gallery;
