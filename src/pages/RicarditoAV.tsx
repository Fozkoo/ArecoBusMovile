import React, { useEffect, useState } from 'react';
import Helper from '../service/Helper';
import { IonApp, IonContent, IonHeader } from '@ionic/react';
import Header from '../components/Header';
import Loader from '../components/Loader';
import TestPage from '..//pages/TestPage';
// import ContainerTitleAndInfo from '../components/ContainterTittleAndInfo';
//import ContainerHorarios from '../components/ContainerHorarios';
//import PuntoDePartida from '../components/PuntoDePartida';

interface RicarditoAvData {
  image: string;
  empresaNombre: string;
  destino: string;
  origen: string;
  horarios: string[];
  puntoPartida: string;
}

function RicarditoAV() {
  const [ricarditoAvData, setRicarditoAvData] = useState<RicarditoAvData | null>(null);
  const [ricarditoAvDataLunes, setRicarditoAvDataLunes] = useState<RicarditoAvData | null>(null);
  const [ricarditoAvDataDomingo, setRicarditoAvDataDomingo] = useState<RicarditoAvData | null>(null);
  const [ricarditoAvDataSabados, setRicarditoAvDataSabados] = useState<RicarditoAvData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [data1, data2, data3, data4] = await Promise.all([

          Helper.ricarditoVillaLiaInfo(),
          Helper.ricarditoVillaLiaInfoHorariosLunes(),
          Helper.ricarditoVillaLiaInfoDomingo(),
          Helper.ricarditoVillaLiaInfoSabados(),
        ]);

        if (data2.length > 0) {
          data2[0].horarios.sort();
        }

        if (data3.length > 0) {
          data3[0].horarios.sort();
        }

        if (data4.length > 0) {
          data4[0].horarios.sort();
        }

        setRicarditoAvData(data1.length > 0 ? data1[0] : null);
        setRicarditoAvDataLunes(data2.length > 0 ? data2[0] : null);
        setRicarditoAvDataDomingo(data3.length > 0 ? data3[0] : null);
        setRicarditoAvDataSabados(data4.length > 0 ? data4[0] : null);
      } catch (err) {
        console.error('Error fetching data:', err);
        setError('Error al cargar la información');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [])

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return <div className='h-full'><TestPage /></div>;
  }

  if (!ricarditoAvData) {
    return <div className='h-full'><TestPage /></div>;
  }

  return (
    <>
      <IonHeader>
        <Header />
      </IonHeader>
    {/*
      <IonContent className='flex justify-center items-center'>
        <div className="container-global flex flex-col ">
          {ricarditoAvData && (
            <ContainerTitleAndInfo
              image={ricarditoAvData.image}
              empresaNombre={ricarditoAvData.empresaNombre}
              origen={ricarditoAvData.origen}
              destino={ricarditoAvData.destino}
            />
          )}
          <h2 className='font-semibold mt-8 text-center text-3xl '>HORARIOS</h2>

          <div className="container-horarios  flex flex-col pl-[10%] pr-[10%] max-xl:pl-[0%] max-xl:pr-[0%]">
            <ContainerHorarios title="LUNES A VIERNES" horarios={ricarditoAvData.horarios} />
            {ricarditoAvDataDomingo && <ContainerHorarios title="SÁBADOS, DOMINGOS Y FERIADOS" horarios={ricarditoAvDataDomingo.horarios} />}

            {ricarditoAvData && <PuntoDePartida puntoPartida={ricarditoAvData.puntoPartida} />}
          </div>
        </div>
      </IonContent>

      */}
    </>
  );
}

export default RicarditoAV;
