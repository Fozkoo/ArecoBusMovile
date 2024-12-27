import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import '../theme/variables.css';
import { customIcon } from '../service/Markers'; // Asegúrate de que customIcon está bien importado
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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await methods.getAllPuntosSube();
        setData(response);

        // Transformamos la respuesta para obtener el formato deseado, incluyendo la imagen, descripción y horarios
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

        setMarkers(markersData); // Verifica que los datos son correctos
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchData();
  }, []);

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
      {markers.length > 0 &&
        markers.map((marker, index) => (
          <Marker
            key={index}
            position={marker.geocode as LatLngTuple}
            icon={customIcon}
          >

            
            <Popup>
              <IonCard>
              
              </IonCard>
            </Popup>
          </Marker>
        ))}
    </MapContainer>
  );
};

export default MapView;



{/*
  
                  <img
                  src={marker.urlimagen}
                  alt={marker.descripcion}
                  style={{ width: '100%', height: 'auto', borderRadius: '8px' }}
                />
                <h3>{marker.descripcion}</h3>
                <p><strong>Horario de apertura:</strong> {marker.horariosapertura}</p>
                <p><strong>Horario de cierre:</strong> {marker.horariocierre}</p>
  
  */}