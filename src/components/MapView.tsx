import React from 'react';
import { MapContainer, TileLayer, Marker } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import '../theme/variables.css';
import { Markers, customIcon } from '../service/Markers';
import { LatLngTuple } from 'leaflet';





const MapView: React.FC = () => {
  return (  
    <MapContainer
      center={[-34.243774, -59.473800] as LatLngTuple}
      zoom={14}
      style={{ height: '100%', width: '100%' }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      {Markers.map((marker, index) => (
        <Marker 
          key={index}
          position={marker.geocode as LatLngTuple}
          icon={customIcon}
        />
      ))}
    </MapContainer>
  );
};

export default MapView;
