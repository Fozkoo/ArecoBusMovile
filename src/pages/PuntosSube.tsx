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
import { BottomSheet } from 'react-spring-bottom-sheet'


function PuntosSube() {
  const [loading, setLoading] = useState(true);

  const [open, setOpen] = useState(true);

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

            <div className="container-page pt-[65px] flex items-center mt-7 p-7 flex-col min-h-[100vh]">
              <div className="container-title-punto-sube flex justify-center items-center text-center flex-col w-full">
                <h1 className="text-2xl font-bold text-black">Puntos SUBE</h1>
                <p className="text-base text-black font-semibold">Encontrá tu punto SUBE más cercano</p>
              </div>

              <div className="container-map mt-7 flex w-[50%] h-[450px] rounded-xl shadow-2xl overflow-hidden items-center justify-center max-lg:w-[90%] max-lg:h-[500px]">
                <MapView />
              </div>

              <div className="other-text flex justify-center text-center w-full mt-7 font-semibold">
                <p>Recorda que también podés recargar tu tarjeta SUBE desde Mercado Pago!</p>
              </div>

              <div className=''>
                <IonModal
                  isOpen={open}
                  breakpoints={[0.3, 0.3, 0.6]}  // Puntos de interrupción para 30%, 60% y 100%
                  initialBreakpoint={0.3}  // Empieza con el modal a 30% de altura
                  className="custom-modal mb-[70px]"
                  canDismiss={true}  // Permite que el modal se cierre al arrastrar  // Elimina el fondo oscuro
                >
                  <div className="flex justify-center  h-[500px]">
                    Hello!!!
                  </div>
                </IonModal>
              </div>





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