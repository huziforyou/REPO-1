// src/pages/Gallery.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Gallery = () => {
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    axios.get('http://localhost:4000/photos/list')
      .then(res => {
        setPhotos(res.data.mediaItems || []);
        setLoading(false);
      })
      .catch(err => {
        console.error('Failed to fetch photos:', err);
        setError(true);
        setLoading(false);
      });
  }, []);

  return (
    <div>
      <h2>Your Google Photos</h2>
      {loading ? (
        <p>Loading photos...</p>
      ) : error ? (
        <p style={{ color: 'red' }}>❌ Failed to load photos. <a href="http://localhost:4000/photos/login">Login Again</a></p>
      ) : (
        <div style={{ display: 'flex', flexWrap: 'wrap' }}>
          {photos.map(photo => (
            <img
              key={photo.id}
              src={photo.baseUrl}
              alt={photo.filename}
              width="200"
              style={{ margin: '10px' }}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Gallery;
