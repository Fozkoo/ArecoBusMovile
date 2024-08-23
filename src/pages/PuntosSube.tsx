import { IonApp, IonContent } from '@ionic/react'
import React from 'react'
import Header from '../components/Header'
import '../theme/variables.css'
import MapView from '../components/MapView'

function PuntosSube() {
  return (
    <>
      <IonApp>
        <IonContent>
          <div className="container-header fixed top-0 left-0 w-full bg-white z-50 shadow-sm">
            <Header/>
          </div>

          <div className="container-page  pt-[65px] flex items-center mt-7 p-5 flex-col h-full">

            <div className="container-title-punto-sube flex justify-center items-center flex-col  w-full">
              <h1 className="text-2xl font-bold text-black">Puntos SUBE </h1>
              <p className="text-base text-black font-semibold">Encontrá tu punto SUBE más cercano </p>
            </div>

            <div className="container-map flex rounded-xl shadow-2xl overflow-hidden items-center justify-center w-[90%] h-[500px] mt-12 bg-blue-200">
            <MapView/>
            </div>

            <div className="other-text flex justify-center text-center w-[90%] mt-7 font-semibold">
              <p>Recorda que tambien podes recargar tu tarjeta SUBE desde Mercado Pago!</p>
            </div>

            



          </div>
        </IonContent>
      </IonApp>
    </>
  )
}

export default PuntosSube