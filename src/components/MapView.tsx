import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import '../theme/variables.css';
import { customIcon } from '../service/Markers'; 
import { LatLngTuple } from 'leaflet';
import methods from '../service/Helper';
import { IonCard } from '@ionic/react';

const MapView: React.FC = () => {
  const [data, setData] = useState([]);
  const [markers, setMarkers] = useState<{
    geocode: LatLngTuple;
    descripcion: string;
    horariosapertura: string;
    horariocierre: string;
    urlimagen: string;
  }[]>([]);
  
  const [userLocation, setUserLocation] = useState<LatLngTuple | null>(null); 

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setUserLocation([latitude, longitude]); 
        },
        (error) => {
          console.error("Error al obtener la ubicación del usuario", error);

          setUserLocation([-34.243774, -59.473800]);
        }
      );
    } else {
      console.log("Geolocalización no soportada por este navegador");
      setUserLocation([-34.243774, -59.473800]); 
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
        }) => ({
          geocode: punto.geocode,
          descripcion: punto.descripcion,
          horariosapertura: punto.horariosapertura,
          horariocierre: punto.horariocierre,
          urlimagen: punto.urlimagen,
        }));

        setMarkers(markersData); 
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchData();
  }, []);

  if (!userLocation) {
    return <div>Cargando mapa...</div>; 
  }

  return (
    <MapContainer
      center={userLocation} 
      zoom={14}
      style={{ height: '100%', width: '100%' }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      {markers.length > 0 &&
        markers.map((marker, index) => (
          <Marker
            key={index}
            position={marker.geocode as LatLngTuple}
            icon={customIcon}
          >
            <Popup>
              <IonCard>
               
                <h3>{marker.descripcion}</h3>
                <p><strong>Horario de apertura:</strong> {marker.horariosapertura}</p>
                <p><strong>Horario de cierre:</strong> {marker.horariocierre}</p>
                <img
                  src={marker.urlimagen}
                  alt={marker.descripcion}
                  style={{ width: '100%', height: 'auto', borderRadius: '8px' }}
                />
              </IonCard>
            </Popup>
          </Marker>
        ))}
    </MapContainer>
  );
};

export default MapView;
