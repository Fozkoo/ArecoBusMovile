import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Polyline } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import Helper from '../service/Helper';

type LatLng = [number, number];

interface BusRoute {
  name: string;
  coordinates: LatLng[];
}

const MapWithRoutes: React.FC = () => {
  const [routes, setRoutes] = useState<BusRoute[]>([]);

  // Cargar los datos del JSON local
  useEffect(() => {
    fetch('/Cordenadas.json')
      .then((response) => response.json())
      .then((data) => setRoutes(data.busRoutes));
      console.log(routes);
  }, []);

  return (
    <MapContainer center={[-34.246482, -59.471015]} zoom={15} style={{ height: '100vh', width: '100%' }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      {routes.map((route, index) => (
        <Polyline key={index} positions={route.coordinates} color="blue" />
      ))}
    </MapContainer>
  );
};

export default MapWithRoutes;
