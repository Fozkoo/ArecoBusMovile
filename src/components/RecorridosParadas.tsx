import React, { useEffect, useState } from "react";
import { MapContainer, Marker, Polyline, Popup, TileLayer } from "react-leaflet";
import { LatLngExpression, LatLngTuple } from "leaflet";
import methods from "../service/Helper";
import logo from '..//..//public/posibleIconoEnAzul (1).svg';
import L, { Icon } from "leaflet";
import Loader from "..//components/Loader";

let coordenadasExternas: LatLngExpression[][] = [];
let coordenadasParadas: LatLngExpression[][] = [];

const userLocationIcon = new Icon({
  iconUrl: 'https://cdn-icons-png.flaticon.com/512/684/684908.png',
  iconSize: [25, 25],
});

interface RecorridosParadasProps {
  recorridoId: string;
  center: LatLngTuple;
}

const RecorridosParadas: React.FC<RecorridosParadasProps> = ({ recorridoId, center }) => {
  const [coordenadas, setCoordenadas] = useState<LatLngExpression[]>([]);
  const [userLocation, setUserLocation] = useState<LatLngTuple | null>(null);
  const [loading, setLoading] = useState(true);
  const [paradas, setParadas] = useState<any[]>([]);

  const [markers, setMarkers] = useState<{
    logitud: string,
    latitud: string,
    descripcion: string;
    url: string;
    idRecorrido: string;
    geocode: LatLngTuple;
  }[]>([]);




  const IconBusStop = new L.Icon({
    iconUrl: logo,
    iconSize: [20, 20],
    iconAnchor: [10, 10],
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await methods.getCordenadasById(recorridoId);
        setCoordenadas(data);
        coordenadasExternas = data.coordenadas;
        setLoading(false);
      } catch (err) {
        console.error("Error fetching data:", err);
      }
    };
    fetchData();
  }, [recorridoId]);

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
    return () => {
      if (navigator.geolocation && watchId) {
        navigator.geolocation.clearWatch(watchId);
      }
    };
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await methods.getParadasByIdRecorrido(recorridoId);
        setParadas(response);

        const markersData = response.map((punto: {
          logitud: string;
          latitud: string;
          descripcion: string;
          url: string;
          idRecorrido: string;
        }) => {
          const geocode: [number, number] = [
            parseFloat(punto.logitud),
            parseFloat(punto.latitud)
          ];
          console.log(geocode);

          return {
            ...punto,
            geocode
            
          };
        });
        setMarkers(markersData)
      } catch (err) {
        console.error("Error fetching data:", err);
      }
    };

    fetchData();
  }, []);


  if (loading) {
    return <Loader />;
  }

  return (
    <>
      <div className="container-table-horarios p-8 ">
        <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="p-6 bg-blue-600 text-white">
            <h1 className="text-3xl font-bold mb-2">Recorrido y paradas</h1>
            <p className="text-white font-medium">Lunes a Viernes</p>
          </div>

          <div className="container-map relative  py-2 px-2 rounded-2xl w-full h-full shadow-2xl">
            <MapContainer
              center={center}
              zoom={14}
              zoomControl={false}
              style={{ height: "400px", width: "100%", borderRadius: "10px", zIndex: 20 }}
            >
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              />

              {markers.map((marker, index) => (
                <Marker key={index} position={marker.geocode} icon={IconBusStop}>
                  <Popup autoPan={false} closeButton={false}>
                  </Popup>
                </Marker>
              ))}

              <Polyline positions={coordenadasExternas} />

              {userLocation && (
                <Marker
                  position={userLocation}
                  icon={userLocationIcon}
                />
              )}
            </MapContainer>
          </div>
        </div>
      </div>
    </>
  );
};

export default RecorridosParadas;
