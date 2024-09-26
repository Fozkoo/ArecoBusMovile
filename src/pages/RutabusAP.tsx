  import React, { useEffect, useState } from 'react';
  import Helper from '../service/Helper';
  import { IonContent } from '@ionic/react';
  import Header from '../components/Header';
  import TestPage from './TestPage';
  import Loader from '../components/Loader'; // Asegúrate de importar tu componente Loader
  import ContainerTitleAndInfo from '..//components/ContainterTittleAndInfo'
  import ContainerHorarios from '..//components/ContainerHorarios'


  interface RutabusData {
    image: string;
    empresaNombre: string;
    destino: string;
    horarios: string[];
    puntoPartida: string;
  }


  function RutabusAP() {
    const [rutabusInformacion, setRutabusInformacion] = useState<RutabusData | null>(null);
    const [rutabusData, setRutabusData] = useState<RutabusData | null>(null);
    const [rutabusDataDomingo, setRutabusDataDomingo] = useState<RutabusData | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
      const fetchData = async () => {
        try {
          const [data1, data2, data3] = await Promise.all([
            Helper.rutabusInfo(),
            Helper.rutabusInfoHorariosLunes(),
            Helper.rutabusInfoHorariosDomingo(),
          ]);

          if (data2.length > 0) {
            data2[0].horarios.sort();  // Ordenar horarios de lunes a viernes
          }

          if (data3.length > 0) {
            data3[0].horarios.sort();  // Ordenar horarios de domingos y feriados
          }

          setRutabusInformacion(data1.length > 0 ? data1[0] : null);
          setRutabusData(data2.length > 0 ? data2[0] : null);
          setRutabusDataDomingo(data3.length > 0 ? data3[0] : null);
        } catch (err) {
          console.error('Error fetching data:', err);
        } finally {
          setLoading(false);
        }
      };
      fetchData();
    }, []);
    

    if (loading) {
      return <Loader />;
    }

    if (!rutabusData) {
      return (
        <div className="h-full">
          <TestPage />
        </div>
      );
    }

    return (
      <>
        <IonContent className='flex justify-center items-center'>
          <div className="container-header fixed top-0 left-0 w-full bg-white z-50 shadow-sm">
            <Header/>
          </div>

        <div className="container-global flex flex-col ">  {/*aca basicamente empece a pasar todo el codigo a limpio creando componente y pasandole la data por props asi es mas sencillo de manipular */}

            {rutabusInformacion && (


              <ContainerTitleAndInfo
                image={rutabusInformacion.image}
                empresaNombre={rutabusInformacion.empresaNombre}
                destino={rutabusInformacion.destino}
              />
            )}

            <ContainerHorarios title="LUNES A VIERNES" horarios={rutabusData.horarios} />
            {rutabusDataDomingo && <ContainerHorarios title="SÁBADOS, DOMINGOS Y FERIADOS" horarios={rutabusDataDomingo.horarios} />}
            

            
          </div>

            


        </IonContent>
      </>
    );
  }

  export default RutabusAP;