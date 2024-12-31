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
import FunctionsHelper from "..//service/FunctionsHelper";

function PuntosSube() {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<any[]>([]);
  const [userLocation, setUserLocation] = useState<{ latitude: number, longitude: number } | null>(null);


    // revisar 
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


  useEffect(() => {
    FunctionsHelper.obtenerUbicacion();
  }, []);

  

  const puntosOrdenados = data
    .map((punto) => {
      if (userLocation) {
        const [lat, lon] = punto.geocode;
        const distance = FunctionsHelper.calcularDistancia(
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

            <div className="container-page pt-[35px] flex items-center mt-7 p-0 flex-col h-[88vh]">
              <div className="container-map z-20 mt-0 flex w-full h-[100vh] shadow-2xl overflow-hidden items-center justify-center">
                <MapView />
              </div>

            </div>
          </div>
        )}
      </IonContent>
    </IonApp>
  );
}

export default PuntosSube;
