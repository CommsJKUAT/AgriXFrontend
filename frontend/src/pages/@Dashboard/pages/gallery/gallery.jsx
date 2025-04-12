import { useState, useEffect } from 'react';
import DashboardNav from "../../../@Dashboard/nav";

const Gallery = () => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    
    const importImages = async () => {
      try {
        const imageContext = import.meta.glob('/src/assets/maize/*.{png,jpg,jpeg}');
        const imagePromises = Object.entries(imageContext).map(async ([path, importFn]) => {
          const imageMod = await importFn();
          return {
            url: imageMod.default,
            name: path.split('/').pop(),
            timestamp: new Date().toISOString() 
          };
        });

        const loadedImages = await Promise.all(imagePromises);
        setImages(loadedImages);
        setLoading(false);
      } catch (error) {
        console.error('Error loading images:', error);
        setLoading(false);
      }
    };

    importImages();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <>
      <DashboardNav />
      <div className="pt-16 md:pt-10">
        <div className="container mx-auto px-4">
          <h1 className="text-2xl font-bold mb-6">Image Gallery</h1>
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {images.map((image, index) => (
              <div 
                key={index} 
                className="group relative overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
              >
                <div className="aspect-w-16 aspect-h-9">
                  <img
                    src={image.url}
                    alt={image.name}
                    className="object-cover w-full h-full transform transition-transform duration-300 group-hover:scale-105"
                    loading="lazy"
                  />
                </div>
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                  <p className="text-white text-sm truncate">{image.name}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Gallery;
