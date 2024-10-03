import React, { useEffect, useState } from 'react';
import Helper from '../service/Helper';
import { IonApp, IonContent, IonHeader } from '@ionic/react';
import Header from '../components/Header';
import Loader from '../components/Loader';
import TestPage from '..//pages/TestPage';
import ContainerTitleAndInfo from '../components/ContainterTittleAndInfo';
import PuntoDePartida from '../components/PuntoDePartida';
import ContainerHorarios from '../components/ContainerHorarios';

interface RicarditoAdData {
  image: string;
  empresaNombre: string;
  destino: string;
  horarios: string[];
  puntoPartida: string;
}

function RicarditoAD() {
  const [ricarditoAdData, setRicarditoAdData] = useState<RicarditoAdData | null>(null);
  const [ricarditoAdDataLunes, setRicarditoAdDataLunes] = useState<RicarditoAdData | null>(null);
  const [ricarditoAdDataDomingo, setRicarditoAdDataDomingo] = useState<RicarditoAdData | null>(null);
  const [ricarditoAdDataSabado, setRicarditoAdDataSabado] = useState<RicarditoAdData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fecthData = async () => {
      try {
        const [data1, data2, data3, data4] = await Promise.all([
          Helper.ricarditoDugganInfo(),
          Helper.ricarditoDugganInfoHorariosLunes(),
          Helper.ricarditoDugganInfoDomingo(),
          Helper.ricarditoDugganInfoSabado(),
        ]);

        if (data2.length > 0) {
          data2[0].horarios.sort();  // Ordenar horarios de lunes a viernes
        }

        if (data3.length > 0) {
          data3[0].horarios.sort();  // Ordenar horarios de domingos y feriados
        }

        if (data4.length > 0) {
          data4[0].horarios.sort();  // Ordenar horarios de domingos y feriados
        }
        setRicarditoAdData(data1.length > 0 ? data1[0] : null);
        setRicarditoAdDataLunes(data2.length > 0 ? data2[0] : null);
        setRicarditoAdDataDomingo(data3.length > 0 ? data3[0] : null);
        setRicarditoAdDataSabado(data4.length > 0 ? data4[0] : null);
      } catch (err) {
        console.error('Error fetching data:', err);
        setError('Error al cargar la información');
      } finally {
        setLoading(false);
      }
    };
    
    fecthData();
  },[])

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return <div className='h-full'><TestPage /></div>;
  }

  if (!ricarditoAdData) {
    return <div className='h-full'><TestPage /></div>;
  }

  return (
    <>
    <IonHeader>
      <Header/>
    </IonHeader>

    <IonContent className='flex justify-center items-center'>

    <div className="container-global flex flex-col ">

        {ricarditoAdData && (


          <ContainerTitleAndInfo
            image={ricarditoAdData.image}
            empresaNombre={ricarditoAdData.empresaNombre}
            destino={ricarditoAdData.destino}
          />
        )}

      <h2 className='font-semibold mt-8 text-center text-3xl '>HORARIOS</h2>


      <div className="container-horarios  flex flex-col pl-[10%] pr-[10%] max-xl:pl-[0%] max-xl:pr-[0%]">
        <ContainerHorarios title="LUNES A VIERNES" horarios={ricarditoAdData.horarios} />
          {ricarditoAdDataDomingo && <ContainerHorarios title="SÁBADOS, DOMINGOS Y FERIADOS" horarios={ricarditoAdDataDomingo.horarios} />}
          
          {ricarditoAdData && <PuntoDePartida puntoPartida={ricarditoAdData.puntoPartida}/>}
      </div>

        
        
    </div>
    </IonContent>
  </>
  );
}

export default RicarditoAD;
