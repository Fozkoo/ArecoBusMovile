import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import '../theme/variables.css';
import { LatLngTuple, Icon } from 'leaflet';
import methods from '../service/Helper';
import { IonCard } from '@ionic/react';
import { useLocation } from 'react-router';
import Loader from '..//components/Loader';
import CardPuntoSube from './CardPuntosSube';
import "..//theme/variables.css"
import L from "leaflet";
import LogoSube from '../images/pin_punto_sube.svg';



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
  const location = useLocation();
  const state = location.state as { state?: { latitud?: string; longitud?: string } } || {};
  const latitud = state.state?.latitud || "null";
  const longitud = state.state?.longitud || "null";
  const [changeLocation, setChangeLocation] = useState<LatLngTuple | null>(null);

  const customIcon = new L.Icon({
    iconUrl: LogoSube,
    iconSize: [35, 35],
    iconAnchor: [25, 16]
  });



  useEffect(() => {

    const parsedLatitud = parseFloat(latitud);
    const parsedLongitud = parseFloat(longitud);

    if (!isNaN(parsedLatitud) && !isNaN(parsedLongitud)) {
      setChangeLocation([parsedLatitud, parsedLongitud]);
    }
  }, []);


  useEffect(() => {
    let watchId: number;

    if (navigator.geolocation) {

      watchId = navigator.geolocation.watchPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setUserLocation([latitude, longitude]);
        },
        (error) => {
          console.error("Error al rastrear la ubicación del usuario", error);
          setUserLocation([-34.243774, -59.473800]);
        },
        { enableHighAccuracy: true, maximumAge: 0 }
      );
    } else {
      console.log("Geolocalización no soportada por este navegador");
      setUserLocation([-34.243774, -59.473800]);
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


    return () => {
      if (navigator.geolocation && watchId) {
        navigator.geolocation.clearWatch(watchId);
      }
    };
  }, []);



  if (!userLocation) {
    return <Loader />
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

        {markers.length > 0 &&
          markers.map((marker, index) => (
            <Marker
              key={index}
              position={marker.geocode as LatLngTuple}
              icon={customIcon}
            >
              <Popup className="" autoPan={false} closeButton={false}>
                <IonCard className="flex justify-center bg-white shadow-none items-center w-[200px] h-[280px]">
                  <CardPuntoSube
                    nombre="Punto SUBE"
                    descripcion={marker.descripcion}
                    distance="100m"
                    horario={`${marker.horariosapertura} - ${marker.horariocierre}`}
                    urlimagen={marker.urlimagen}
                  />
                </IonCard>
                {/* Botón personalizado */}

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
    </div>
  );
};

export default MapView;
