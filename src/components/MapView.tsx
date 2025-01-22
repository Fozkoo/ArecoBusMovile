import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import '../theme/variables.css';
import { LatLngTuple, Icon } from 'leaflet';
import methods from '../service/Helper';
import { IonCard } from '@ionic/react';
import { useLocation } from 'react-router';
import Loader from '../components/Loader';
import CardPuntoSube from './CardPuntosSube';
import '../theme/variables.css';
import L from 'leaflet';
import LogoSube from '../images/pin_punto_sube.svg';

const userLocationIcon = new Icon({
  iconUrl: 'https://cdn-icons-png.flaticon.com/512/684/684908.png',
  iconSize: [25, 25],
});

const customIcon = new L.Icon({
  iconUrl: LogoSube,
  iconSize: [35, 35],
  iconAnchor: [25, 16],
});

function calcularDistancia(coord1: LatLngTuple, coord2: LatLngTuple): string {
  const R = 6371; 
  const [lat1, lon1] = coord1;
  const [lat2, lon2] = coord2;

  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distancia = R * c; 

  return distancia < 1 ? `${(distancia * 1000).toFixed(0)} m` : `${distancia.toFixed(2)} km`;
}

const MapView: React.FC = () => {
  const [data, setData] = useState([]);
  const [markers, setMarkers] = useState<{
    geocode: LatLngTuple;
    nombre: string;
    descripcion: string;
    horariosapertura: string;
    horariocierre: string;
    urlimagen: string;
    distance: string;
  }[]>([]);
  const [userLocation, setUserLocation] = useState<LatLngTuple | null>(null);
  const location = useLocation();
  const state = location.state as { state?: { latitud?: string; longitud?: string } } || {};
  const latitud = state.state?.latitud || 'null';
  const longitud = state.state?.longitud || 'null';
  const [changeLocation, setChangeLocation] = useState<LatLngTuple | null>(null);

  useEffect(() => {
    const parsedLatitud = parseFloat(latitud);
    const parsedLongitud = parseFloat(longitud);

    if (!isNaN(parsedLatitud) && !isNaN(parsedLongitud)) {
      setChangeLocation([parsedLatitud, parsedLongitud]);
    }
  }, [latitud, longitud]);

  useEffect(() => {
    let watchId: number;

    if (navigator.geolocation) {
      watchId = navigator.geolocation.watchPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setUserLocation([latitude, longitude]);
        },
        (error) => {
          console.error('Error al rastrear la ubicación del usuario', error);
          setUserLocation([-34.243774, -59.4738]);
        },
        { enableHighAccuracy: true, maximumAge: 0 }
      );
    } else {
      console.error('Geolocalización no soportada por este navegador');
      setUserLocation([-34.243774, -59.4738]);
    }

    const fetchData = async () => {
      try {
        const response = await methods.getAllPuntosSube();
        setData(response);

        const markersData = response.map((punto: {
          geocode: LatLngTuple;
          descripcion: string;
          horariosapertura: string;
          horariocierre: string;
          urlimagen: string;
        }) => {
          const distance = userLocation
            ? calcularDistancia(userLocation, punto.geocode)
            : 'Calculando...';

          return {
            ...punto,
            distance,
          };
        });

        setMarkers(markersData);
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchData();

    return () => {
      if (navigator.geolocation && watchId) {
        navigator.geolocation.clearWatch(watchId);
      }
    };
  }, [userLocation]);

  if (!userLocation) {
    return <Loader />;
  }

  return (
    <div className="relative w-full h-full">
      <MapContainer
        center={changeLocation ? changeLocation : userLocation}
        zoom={14}
        zoomControl={false}
        style={{ height: '100%', width: '100%' }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />

        {markers.map((marker, index) => (
          <Marker key={index} position={marker.geocode} icon={customIcon}>
            <Popup autoPan={false} closeButton={false}>
              <IonCard className="flex justify-center bg-white shadow-none items-center w-[200px] h-[280px]">
                <CardPuntoSube
                  nombre={marker.nombre}
                  descripcion={marker.descripcion}
                  distance={marker.distance || ''}
                  horario={`${marker.horariosapertura} - ${marker.horariocierre}`}
                  urlimagen={marker.urlimagen}
                />
              </IonCard>
            </Popup>
          </Marker>
        ))}

        {userLocation && (
          <Marker position={userLocation} icon={userLocationIcon}>
            <Popup>Estás aquí</Popup>
          </Marker>
        )}
      </MapContainer>
    </div>
  );
};

export default MapView;
