// MapContainer.js
import React, { useEffect, useState } from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

const MapContainer = ({ apiKey }) => {
  const [currentLocation, setCurrentLocation] = useState(null);

  useEffect(() => {
    // Get the user's current location
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setCurrentLocation({ lat: latitude, lng: longitude });
      },
      (error) => {
        console.error('Error getting current location:', error);
      }
    );
  }, []);

  const mapStyles = {
    height: '500px',
    width: '100%',
  };

  return (
    <div>
      <h2>Current Location:</h2>
      {currentLocation && (
        <div>
          <p>
            Latitude: {currentLocation.lat}, Longitude: {currentLocation.lng}
          </p>
          <LoadScript googleMapsApiKey={apiKey}>
            <GoogleMap
              mapContainerStyle={mapStyles}
              zoom={15}
              center={currentLocation}
            >
              {currentLocation && <Marker position={currentLocation} />}
            </GoogleMap>
          </LoadScript>
        </div>
      )}
    </div>
  );
};

export default MapContainer;
