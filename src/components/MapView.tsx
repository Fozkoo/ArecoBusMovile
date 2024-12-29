import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import '../theme/variables.css';
import { customIcon } from '../service/Markers'; 
import { LatLngTuple, Icon } from 'leaflet';
import methods from '../service/Helper';
import { IonCard, IonButton, IonIcon } from '@ionic/react';
import { locate } from 'ionicons/icons';

const userLocationIcon = new Icon({
  iconUrl: 'https://cdn-icons-png.flaticon.com/512/684/684908.png',
  iconSize: [25, 25], // Tamaño del ícono
});

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
    // Obtener ubicación inicial
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setUserLocation([latitude, longitude]);
        },
        (error) => {
          console.error("Error al obtener la ubicación del usuario", error);
          setUserLocation([-34.243774, -59.473800]); // Ubicación por defecto
        }
      );
    } else {
      console.log("Geolocalización no soportada por este navegador");
      setUserLocation([-34.243774, -59.473800]); // Ubicación por defecto
    }

    // Obtener datos de puntos SUBE
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

  // Reubicar mapa según la ubicación del usuario
  const recenterMap = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setUserLocation([latitude, longitude]);
        },
        (error) => {
          console.error("Error al obtener la ubicación", error);
        }
      );
    }
  };

  // Componente para mover el mapa
  const FlyToLocation = ({ location }: { location: LatLngTuple | null }) => {
    const map = useMap();
    useEffect(() => {
      if (location) {
        map.flyTo(location, 14); // Centrar mapa en la ubicación del usuario
      }
    }, [location, map]);
    return null;
  };

  if (!userLocation) {
    return <div>Cargando mapa...</div>; 
  }

  return (
    <div className="relative w-full h-full">
      <MapContainer
        center={userLocation}
        zoom={14}
        style={{ height: '100%', width: '100%' }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        <FlyToLocation location={userLocation} />
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
        {/* Agregar marcador para la ubicación del usuario */}
        {userLocation && (
          <Marker
            position={userLocation}
            icon={userLocationIcon}
          >
            <Popup>Estás aquí</Popup>
          </Marker>
        )}
      </MapContainer>
      {/* Botón para reubicar */}
      <IonButton
        className="absolute bottom-5 right-5 z-[1000] bg-blue-500 text-white"
        onClick={recenterMap}
      >
        <IonIcon icon={locate} />
        Ubicarme
      </IonButton>
    </div>
  );
};

export default MapView;
