  import React, { useEffect, useState } from 'react';
  import Helper from '../service/Helper';
  import { IonContent, IonHeader } from '@ionic/react';
  import Header from '../components/Header';
  import TestPage from './TestPage';
  import Loader from '../components/Loader'; // Asegúrate de importar tu componente Loader
  import ContainerTitleAndInfo from '..//components/ContainterTittleAndInfo'
  import ContainerHorarios from '..//components/ContainerHorarios'
  import PuntoDePartida from '..//components/PuntoDePartida'


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


    // empece a mover todas las boludeces a componentes para poder manejarlos de menjor manera
    // falta mucho por arreglar pero la idea va encaminada, Cree tres componentes que son los uqe principalmente
    // se van a repetir en casi todas las pages, PuntoDePartida, ContainterTittleAndInfo
    // (tengo que arreglarle el nombre) y ContainerHorarios.
    //el manejo de los datos viaja a traves de props la cual me falta incuir el ORIGEN y
    // el url del iframe (tengo que a;adir a la bdd eso),
    // Impremente el IonHeader para probar, supuestamente tiene mejor optimizacion y 
    // la idea es ir mentiendo componentes directamente de ionic para mejorar rendimientos.
    // tengo que gestionar el tema de verificar si el usuario tiene internet apenas abre la pagina
    // en el home digamos, si no tiene, tirarlo directamente al TestPage 
    //

    return (
      <>
        

        <IonHeader>
          <Header/>
        </IonHeader>

        <IonContent className='flex justify-center items-center'>

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
            
            {rutabusData && <PuntoDePartida puntoPartida={rutabusData.puntoPartida}/>}
            
            
        </div>

            


        </IonContent>
      </>
    );
  }

  export default RutabusAP;