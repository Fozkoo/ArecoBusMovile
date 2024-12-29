import { IonApp, IonContent } from '@ionic/react';
import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import '../theme/variables.css';
import MapView from '../components/MapView';
import Loader from '../components/Loader';
import methods from '../service/Helper';
import "../theme/variables.css";
import 'react-spring-bottom-sheet/dist/style.css';
import PersistentBottomSheet from "../components/PersistentBottomSheet";
import CardPuntoSube from '../components/CardPuntosSube';

function PuntosSube() {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<any[]>([]);
  const [userLocation, setUserLocation] = useState<{ latitude: number, longitude: number } | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await methods.getAllPuntosSube();
        setData(response);
        console.log(response);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);


  function obtenerUbicacion() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function (posicion) {
        const latitud = posicion.coords.latitude;
        const longitud = posicion.coords.longitude;
        setUserLocation({ latitude: latitud, longitude: longitud });
      }, function (error) {
        console.error("Error al obtener la ubicación: " + error.message);
        setUserLocation(null);
      });
    } else {
      console.error("La geolocalización no es soportada por este navegador.");
      setUserLocation(null); 
    }
  }

  useEffect(() => {
    obtenerUbicacion();
  }, []);

  
  const calcularDistancia = (lat1: number, lon1: number, lat2: number, lon2: number) => {
    const R = 6371; 
    const dLat = (lat2 - lat1) * (Math.PI / 180); 
    const dLon = (lon2 - lon1) * (Math.PI / 180); 
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distancia = R * c; 
    return distancia;
  };

  const puntosOrdenados = data
    .map((punto) => {
      if (userLocation) {
        const [lat, lon] = punto.geocode;
        const distance = calcularDistancia(
          userLocation.latitude,
          userLocation.longitude,
          parseFloat(lat),
          parseFloat(lon)
        );
        return { ...punto, distance };
      }
      return { ...punto, distance: Infinity };
    })
    .sort((a, b) => a.distance - b.distance); 

  return (
    <IonApp>
      <IonContent className="relative !z-50">
        {loading ? (
          <Loader />
        ) : (
          <div>
            <div className="container-header fixed top-0 left-0 w-full bg-white z-50 shadow-sm">
              <Header />
            </div>

            <div className="container-page pt-[35px] flex items-center mt-7 p-0 flex-col h-[87vh]">
              <div className="container-map z-20 mt-0 flex w-full h-[100vh] shadow-2xl overflow-hidden items-center justify-center">
                <MapView />
              </div>

              <PersistentBottomSheet>
                <div className="container-title-punto-sube flex justify-center items-center text-center flex-col w-full">
                  <h2 className="text-2xl font-bold text-black">Puntos SUBE</h2>
                  <p className="text-base text-black bg-bl font-semibold">
                    Encontrá tu punto SUBE más cercano
                  </p>
                </div>

                <div className="container-cards flex flex-col gap-3 my-3">
                  {puntosOrdenados.map((punto, index) => {
                    let distanceLabel =
                      punto.distance < 1
                        ? `${(punto.distance * 1000).toFixed(0)} m`
                        : `${punto.distance.toFixed(2)} km`;

                    return (
                      <CardPuntoSube
                        key={index}
                        nombre={punto.nombre}
                        descripcion={punto.descripcion}
                        distance={userLocation ? distanceLabel : "Ubicación no disponible"}
                        horario={punto.horariosapertura}
                        urlimagen={punto.urlimagen}
                        urllogo={punto.urlimagen}
                      />
                    );
                  })}
                </div>
              </PersistentBottomSheet>
            </div>
          </div>
        )}
      </IonContent>
    </IonApp>
  );
}

export default PuntosSube;
