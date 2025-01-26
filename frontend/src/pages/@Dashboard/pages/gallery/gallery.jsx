import { useState, useEffect } from 'react';
import DashboardNav from "../../../@Dashboard/nav";

const Gallery = () => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await fetch('http://localhost:8000/api/images/');  // Adjust URL as needed
        const data = await response.json();
        if (data && Array.isArray(data)) {
          // Convert base64 strings back to displayable images
          const processedImages = data.map(img => ({
            ...img,
            imageUrl: `data:image/jpeg;base64,${img.image}`
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
              <img
                className="h-auto max-w-full rounded-lg transition-transform duration-200 group-hover:scale-105"
                src={image.imageUrl}
                alt={`Satellite Image ${index + 1}`}
                loading="lazy"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white p-2 rounded-b-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                Image {index + 1}
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Gallery;
