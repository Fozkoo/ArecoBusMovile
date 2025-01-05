import { useEffect, useRef, useState } from 'react';
import Helper from '../service/Helper';
import helperExport from "../service/FunctionsHelper";
import { IonContent } from '@ionic/react';
import Loader from '../components/Loader';
import Change from '../components/Change';
import Up from '../components/Up';
import SchedulesTable from '../components/SchedulesTable';
import MainInfo from '../components/MainInfo';
import Banner from '../components/Banner';

interface RicarditoAvData {
  image: string;
  empresaNombre: string;
  origen: "Areco";
  destino: string;
  horarios: string[];
  puntoPartida: string;
  proximoHorario?: string;
}

const RicarditoAV: React.FC = () => {
  const [ricarditoAvData, setRicarditoAvData] = useState<RicarditoAvData | null>(null);
  const [showAll, setShowAll] = useState<boolean>(false);
  const ionContentRefDo = useRef<HTMLIonContentElement>(null);
  const [isActive, setIsActive] = useState<boolean>(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [ricarditoAvDataLunes, setRicarditoAvDataLunes] = useState<RicarditoAvData | null>(null);
  const [proximo, setProximo] = useState<string | null>(null);
  const [ricarditoAvDataDomingo, setRicarditoAvDataDomingo] = useState<RicarditoAvData | null>(null);
  const [ricarditoAvDataSabados, setRicarditoAvDataSabados] = useState<RicarditoAvData | null>(null);
  const [data, setData] = useState<RicarditoAvData[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        let data;
        if (helperExport.diaHoy >= 1 && helperExport.diaHoy <= 5) {
          data = await Helper.ricarditoVillaLiaInfoHorariosLunes();
        } else if (helperExport.diaHoy === 6) {
          data = await Helper.ricarditoVillaLiaInfoSabados();
        } else if (helperExport.diaHoy === 7) {
          data = await Helper.ricarditoVillaLiaInfoDomingo();
        }

        setData(data);
        const proximoHorario = helperExport.proximoColectivo(data[0].horarios);
        setProximo(proximoHorario);
      } catch (err) {
        setError("Error al cargar los datos.");
      }
    };

    
    fetchData();
 
    const intervalId = setInterval(() => {
      fetchData();
    }, 30000);

    
    return () => clearInterval(intervalId);

  }, []);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const [data1, data2, data3, data4] = await Promise.all([
          Helper.ricarditoVillaLiaInfo(),
          Helper.ricarditoVillaLiaInfoHorariosLunes(),
          Helper.ricarditoVillaLiaInfoSabados(),
          Helper.ricarditoVillaLiaInfoDomingo(),
        ])

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
        setRicarditoAvDataSabados(data3.length > 0 ? data3[0] : null);
        setRicarditoAvDataDomingo(data4.length > 0 ? data4[0] : null);


      } catch (err) {
        console.error("Error fetching data:", err);
        setError("Error al cargar los datos");
      } finally {
        setLoading(false);
      }

    }
    fetchData();
  }, []);


  if (loading) {
    return <Loader />;
  }


  return (
    <IonContent ref={ionContentRefDo}>
      {ricarditoAvData && (
        <>
          <Banner
            image={ricarditoAvData.image}
            empresaNombre={ricarditoAvData.empresaNombre}
            origen="Areco"
            destino={ricarditoAvData.destino}
            isActive={isActive}
          />

          <MainInfo
            proximo={proximo || ''}
            formatHoraAmPm={helperExport.formatHoraAmPm}
            metodo="EFECTIVO"
            precio="$1250"
          />

          {ricarditoAvDataLunes && (
            <SchedulesTable
              dias="Lunes a Viernes"
              horarios={ricarditoAvDataLunes.horarios}
              destino={ricarditoAvData.destino}
              formatHoraAmPm={helperExport.formatHoraAmPm}
              showAll={showAll}
              setShowAll={setShowAll}
            />
          )}

          {ricarditoAvDataSabados && (
            <SchedulesTable
              dias="Sábados"
              horarios={ricarditoAvDataSabados.horarios}
              destino={ricarditoAvData.destino}
              formatHoraAmPm={helperExport.formatHoraAmPm}
              showAll={showAll}
              setShowAll={setShowAll}
            />
          )}

          {ricarditoAvDataDomingo && (
            <SchedulesTable
              dias="Domingos y Feriados"
              horarios={ricarditoAvDataDomingo.horarios}
              destino={ricarditoAvData.destino}
              formatHoraAmPm={helperExport.formatHoraAmPm}
              showAll={showAll}
              setShowAll={setShowAll}
            />
          )}
          {/* 
          <RecorridosParadas />
        */}
          <Change path="/home" />
          <Up ionContentRef={ionContentRefDo} />
        </>
      )}
    </IonContent>
  );
}

export default RicarditoAV;
