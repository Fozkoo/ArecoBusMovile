import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap, Polyline } from 'react-leaflet';
import { LatLng, LatLngExpression, LatLngTuple } from 'leaflet';
import { IconBusStop, Markers, customIcon } from '../service/Markers';

const MapViewDos: React.FC = () => {
  const [showMap, setShowMap] = useState(false);

  const position: LatLngExpression = [-34.247935, -59.471792]; // cordenadas iniciales de areco
  const ruta: LatLngExpression[] = [
    [-34.245536, -59.464199],
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
    [-34.246690, -59.459917],
    [-34.247202, -59.459183],
    [-34.249283, -59.457265],
    [-34.251492, -59.456445],
    [-34.256519, -59.455842],
    [-34.259746, -59.453443],
    [-34.261897, -59.449539],
    [-34.262714, -59.448940],
    [-34.262938, -59.448424],
    [-34.263001, -59.447664],
    [-34.263752, -59.445859],
    [-34.271200, -59.431127],
    [-34.273236, -59.416353],
    [-34.273542, -59.415581],
    [-34.273328, -59.415131],
    [-34.273289, -59.414649],
    [-34.273537, -59.413932],
    [-34.274318, -59.409350],
    [-34.276265, -59.395262],
    [-34.290790, -59.340389],
    [-34.291588, -59.338611],
    [-34.293391, -59.335941],
    [-34.300598, -59.326879],
    [-34.302551, -59.320198]

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
    [-34.253854, -59.458890],
    [-34.247228, -59.459179],
    [-34.249620, -59.457120],
    [-34.254971, -59.456076],
    [-34.263344, -59.446969],
    [-34.298760, -59.329279],

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
            map.flyTo(newPosition, 15);
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
          className="bg-blue-500 left-[30%] z-[1000] text-white px-4 py-2 mt-4 rounded-lg relative"
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
    <div className="container-punto-partida bg-gray-100  p-8">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="p-6 bg-blue-600 text-white">
          <h1 className="text-3xl font-bold mb-2">Recorrido y paradas</h1>
          <p className="text-white font-medium">De Lunes a Viernes.</p>
        </div>
        <div className="p-3 text-center">
          <div className={`transition-all duration-500 overflow-hidden ${showMap ? 'h-[350px]' : 'h-[150px]'}`}>


            <MapContainer className="rounded-lg" center={position} zoom={14} style={{ height: '100%', width: '100%', zIndex: '1' }}>
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              {Markers.map((marker, index) => (
                <Marker
                  key={index}
                  position={marker as LatLngTuple}
                  icon={IconBusStop}
                />
              ))}
              <Polyline positions={ruta} color="#1f2937" />
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
