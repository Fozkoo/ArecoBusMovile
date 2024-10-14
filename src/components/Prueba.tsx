import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap, Polyline } from 'react-leaflet';
import { LatLng, LatLngExpression, LatLngTuple } from 'leaflet';
import { IconBusStop, Markers, customIcon } from '../service/Markers';

const MapViewDos: React.FC = () => {
  const [showMap, setShowMap] = useState(false); // Estado para controlar la visibilidad completa del mapa

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

  const Markers: LatLngTuple[] = [
    [-34.245477, -59.464183],
    [-34.241019, -59.474728],
    [-34.241268, -59.476256],
    [-34.242613, -59.477328],
    [-34.246234, -59.478837],
    [-34.249194, -59.477964],
    [-34.251285, -59.477330],
    [-34.253016, -59.479219],
    [-34.254243, -59.480833],
    [-34.256453, -59.480181],
    [-34.258376, -59.479645],
    [-34.258100, -59.476798],
    [-34.257170, -59.471813],
    [-34.256680, -59.469320],
    [-34.255502, -59.465443],
    [-34.255181, -59.464169],
    [-34.254510, -59.461468],
    [-34.253854, -59.458890]

  ]


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

  const UpdateMapSize: React.FC = () => {
    const map = useMap();
    useEffect(() => {
      map.invalidateSize();
    }, [showMap, map]);

    return null;
  };

  return (
    <div className="container-punto-partida bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="p-6 bg-blue-600 text-white">
          <h1 className="text-3xl font-bold mb-2">Recorrido y paradas</h1>
          <p className="text-white font-medium">De Lunes a Viernes.</p>
        </div>
        <div className="p-3 text-center">
          <div className={`transition-all duration-500 overflow-hidden ${showMap ? 'h-[350px]' : 'h-[150px]'}`}>
            <MapContainer className='rounded-lg' center={position} zoom={14} style={{ height: '100%', width: '100%' }}>
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution=''
              />
              {Markers.map((marker, index) => (
                <Marker
                  key={index}
                  position={marker as LatLngTuple}
                  icon={IconBusStop}
                />
              ))}
              <Polyline positions={ruta} color="blue" />
              <LocationMarker />
              <UpdateMapSize />
            </MapContainer>
          </div>

          <button
            onClick={() => setShowMap(!showMap)}
            className="bg-blue-500 text-white px-4 py-2 mt-4 rounded-lg"
          >
            {showMap ? 'Mostrar menos' : 'Ver mapa completo'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default MapViewDos;
