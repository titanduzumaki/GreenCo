import React, { createContext, useContext, useState, useEffect } from 'react';

const PhotoContext = createContext(undefined);

export function PhotoProvider({ children }) {
  const [photos, setPhotos] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('greenco-photos');
      if (saved) {
        try {
          return JSON.parse(saved);
        } catch (e) {
          console.error('Failed to parse saved photos', e);
        }
      }
    }
    return [];
  });

  useEffect(() => {
    localStorage.setItem('greenco-photos', JSON.stringify(photos));
  }, [photos]);

  const addPhotos = (newPhotos) => {
    const now = Date.now();
    const maxOrder = photos.length > 0 ? Math.max(...photos.map(p => p.order)) : -1;

    const photosWithMetadata = newPhotos.map((photo, index) => ({
      ...photo,
      id: `photo-${now}-${index}`,
      createdAt: now,
      order: maxOrder + index + 1,
    }));

    setPhotos(prev => [...prev, ...photosWithMetadata]);
  };

  const updatePhoto = (id, updates) => {
    setPhotos(prev => prev.map(photo =>
      photo.id === id ? { ...photo, ...updates } : photo
    ));
  };

  const deletePhoto = (id) => {
    setPhotos(prev => prev.filter(photo => photo.id !== id));
  };

  const toggleVisibility = (id) => {
    setPhotos(prev => prev.map(photo =>
      photo.id === id ? { ...photo, isVisible: !photo.isVisible } : photo
    ));
  };

  const reorderPhotos = (reorderedPhotos) => {
    const photosWithNewOrder = reorderedPhotos.map((photo, index) => ({
      ...photo,
      order: index,
    }));
    setPhotos(photosWithNewOrder);
  };

  const visiblePhotos = photos
    .filter(photo => photo.isVisible)
    .sort((a, b) => a.order - b.order);

  return (
    <PhotoContext.Provider
      value={{
        photos: photos.sort((a, b) => a.order - b.order),
        addPhotos,
        updatePhoto,
        deletePhoto,
        toggleVisibility,
        reorderPhotos,
        visiblePhotos,
      }}
    >
      {children}
    </PhotoContext.Provider>
  );
}

export function usePhotos() {
  const context = useContext(PhotoContext);
  if (context === undefined) {
    throw new Error('usePhotos must be used within a PhotoProvider');
  }
  return context;
}
