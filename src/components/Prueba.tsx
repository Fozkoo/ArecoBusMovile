import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap, Polyline } from 'react-leaflet';
import { LatLngExpression } from 'leaflet';

const MapViewDos: React.FC = () => {
  const position: LatLngExpression = [-34.247935, -59.471792]; // Buenos Aires
  const ruta: LatLngExpression[] = [
    [-34.245536, -59.464199],  // Buenos Aires
    [-34.240252, -59.468327],
    [-34.241481, -59.477664],
    [-34.243561, -59.477024],
    [-34.244041, -59.479456],
    [-34.251512, -59.477250],
    [-34.252388, -59.481365],
    [-34.258614, -59.479554],
    [-34.256612, -59.469105],
    [-34.255762, -59.466467],
    [-34.255090, -59.463968],
    [-34.253783, -59.458646],
    [-34.246377, -59.463682],
    [-34.246049, -59.462277],
    [-34.245948, -59.461727],
    [-34.246015, -59.461260],
    [-34.246690, -59.459917]
  ];

  const LocationMarker: React.FC = () => {
    const [userPosition, setUserPosition] = useState<LatLngExpression | null>(null);
    const map = useMap();

    const handleLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
            const newPosition: LatLngExpression = [latitude, longitude];
            setUserPosition(newPosition);
            map.flyTo(newPosition, 13);
          },
          () => {
            alert("No se pudo obtener la ubicación.");
          }
        );
      } else {
        alert("La geolocalización no es soportada por este navegador.");
      }
    };

    return (
      <>
        <button
          onClick={handleLocation}
          style={{
            position: 'absolute',
            top: '10px',
            right: '10px',
            zIndex: 1000,
            padding: '10px',
            backgroundColor: 'white',
            border: '1px solid gray',
            cursor: 'pointer',
          }}
        >
          Ubicarme
        </button>
        {userPosition && (
          <Marker position={userPosition}>
            <Popup>¡Estás aquí!</Popup>
          </Marker>
        )}
      </>
    );
  };

  return (
    <div className="container-punto-partida bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="p-6 bg-blue-600 text-white">
          <h1 className="text-3xl font-bold mb-2">Recorrido</h1>
          <p className="text-white font-medium"></p>
        </div>
        <div className="p-2 h-[450px]">
          <MapContainer className='rounded-lg' center={position} zoom={14} style={{ height: '100%', width: '100%' }}>
            <TileLayer
              url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
              attribution=''
            />
            <Polyline positions={ruta} color="blue"   />
            <LocationMarker />
          </MapContainer>
        </div>
      </div>
    </div>


  );
};

export default MapViewDos;










const position: LatLngExpression = [-34.247935, -59.471792]; // Buenos Aires
const ruta: LatLngExpression[] = [
  [-34.245536, -59.464199],  // Buenos Aires
  [-34.240252, -59.468327],
  [-34.241481, -59.477664],
  [-34.243561, -59.477024],
  [-34.244041, -59.479456],
  [-34.251512, -59.477250],
  [-34.252388, -59.481365],
  [-34.258614, -59.479554],
  [-34.256612, -59.469105],
  [-34.255762, -59.466467],
  [-34.255090, -59.463968],
  [-34.253783, -59.458646],
  [-34.246377, -59.463682],
  [-34.246049, -59.462277],
  [-34.245948, -59.461727],
  [-34.246015, -59.461260],
  [-34.246690, -59.459917]
];