// pages/PuntosSube.tsx
import { IonApp, IonContent, IonModal } from '@ionic/react';
import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import '../theme/variables.css';
import MapView from '../components/MapView';
import Loader from '../components/Loader';
import methods from '../service/Helper';
import "..//theme/variables.css"
import 'react-spring-bottom-sheet/dist/style.css'
import PersistentBottomSheet from "../components/PersistentBottomSheet";


function PuntosSube() {
  const [loading, setLoading] = useState(true);



  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);






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

            <div className="container-page bg-green-500 pt-[65px] flex items-center mt-7 p-7 flex-col min-h-[100vh]">
              <div className="container-title-punto-sube bg-orange-500 flex justify-center items-center text-center flex-col w-full">
                <h1 className="text-2xl font-bold text-black">Puntos SUBE</h1>
                <p className="text-base text-black font-semibold">Encontrá tu punto SUBE más cercano</p>
              </div>

              <div className="container-map bg-zinc-700 z-20  mt-7 flex w-[50%] h-[450px] rounded-xl shadow-2xl overflow-hidden items-center justify-center max-lg:w-[90%] max-lg:h-[500px]">
                <MapView />
              </div>
            <PersistentBottomSheet>
              asd
            </PersistentBottomSheet>




            </div>
          </div>
        )}
      </IonContent>
    </IonApp>

  );
}

export default PuntosSube;


{/*
              
  
  */}