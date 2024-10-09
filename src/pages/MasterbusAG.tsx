import React, { useEffect, useRef, useState } from 'react';
import Helper from '../service/Helper';
import { IonApp, IonContent, IonHeader } from '@ionic/react';
import Header from '../components/Header';
import Loader from '../components/Loader'; 
import TestPage from '..//pages/TestPage'; 
import ContainerTitleAndInfo from '../components/ContainterTittleAndInfo';
import ContainerHorarios from '../components/ContainerHorarios';
import PuntoDePartida from '../components/PuntoDePartida';
import Up from '..//components/Up';
import '../theme/variables.css';

interface MasterbusData {
  image: string;
  empresaNombre: string;
  destino: string;
  origen: string;
  horarios: string[];
  puntoPartida: string;
}

function MasterbusAG() {
  const [masterbusData, setMasterbusData] = useState<MasterbusData | null>(null);
  const [masterbusDataDomingo, setMasterbusDataDomingo] = useState<MasterbusData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const ionContentRef = useRef<HTMLIonContentElement>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [data1, data3] = await Promise.all([
          Helper.masterbusInfo(),
          Helper.masterbusInfoDomingo(),
        ]);

        if (data3.length > 0) {
          data3[0].horarios.sort();  
        }

        setMasterbusData(data1.length > 0 ? data1[0] : null);
        setMasterbusDataDomingo(data3.length > 0 ? data3[0] : null);
      } catch (err) {
        console.error('Error fetching data:', err);
        setError('Error al cargar la información');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  },[])

  if (loading) {
    return <Loader />;
  }

  if (!masterbusData) {
    return (
      <div className="h-full">
        <TestPage />
      </div>
    );
  }

  return (
    <>
      <IonHeader>
        <Header/>
      </IonHeader>

      {/* Asigna la referencia ionContentRef al IonContent */}
      <IonContent ref={ionContentRef} className='flex justify-center items-center'>
        <div className="container-global flex flex-col ">
          {masterbusData && (
            <ContainerTitleAndInfo
              image={masterbusData.image}
              empresaNombre={masterbusData.empresaNombre}
              origen={masterbusData.origen}
              destino={masterbusData.destino}
            />
          )}

          <h2 className='font-semibold bg-black text-white mr-10 ml-10 rounded-lg mt-8 text-center text-2xl '>¡Conoce los horarios!</h2>

          <div className="container-horarios flex flex-col pl-[10%] pr-[10%] max-xl:pl-[0%] max-xl:pr-[0%]">
            <ContainerHorarios title="Lunes a Viernes" horarios={masterbusData.horarios} />
            {masterbusDataDomingo && <ContainerHorarios title="Sabados,Domingos y Feriados" horarios={masterbusDataDomingo.horarios} />}
            {masterbusData && <PuntoDePartida puntoPartida={masterbusData.puntoPartida}/>}
          </div>

          <Up ionContentRef={ionContentRef} />
        </div>
      </IonContent>
    </>
  );
}

export default MasterbusAG;
