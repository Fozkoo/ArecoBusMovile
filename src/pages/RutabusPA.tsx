import { useEffect, useRef, useState } from "react";
import Helper from "../service/Helper";
import helperExport from "../service/FunctionsHelper";
import { IonContent } from "@ionic/react";
import Banner from "../components/Banner";
import MainInfo from "../components/MainInfo";
import SchedulesTable from "../components/SchedulesTable";
import RecorridosParadas from "../components/RecorridosParadas";
import Change from "../components/Change";
import Up from "../components/Up";
import Loader from "../components/Loader";
import { useMenu } from '../context/MenuContextProps';

interface rutabusPAData {
  image: string;
  empresaNombre: string;
  origen: string;
  destino: string;
  horarios: string[];
  puntoPartida: string;
  proximoHorario?: string;
  metodo: string;
  precio: string;
}

interface rutabusAPDataLunes {
  horarios: string[];
}

const RutabusPA: React.FC = () => {
  const [rutabusPAData, setRutabusPAData] = useState<rutabusPAData | null>(null);
  const [showAll, setShowAll] = useState<boolean>(false);
  const ionContentRefDo = useRef<HTMLIonContentElement>(null);
  const [isActive, setIsActive] = useState<boolean>(false);
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [proximo, setProximo] = useState<string | null>(null);
  const [rutabusPADataDomingo, setRutabusPADataDomingo] = useState<rutabusPAData | null>(null);
  const [rutabusPADataLunes, setRutabusPADataLunes] = useState<rutabusPAData | null>(null);
  const { setMenuVisible } = useMenu();
  const [paradas, setParadas] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        let data;
        if (helperExport.diaHoy >= 1 && helperExport.diaHoy <= 5) {
          data = await Helper.getHorariosByIdBusIdDia(9, 1);
        } else if (helperExport.diaHoy === 6 || helperExport.diaHoy === 7) {
          data = await Helper.getHorariosByIdBusIdDia(9, 7);
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
        const [data1, data2, data3] = await Promise.all([
          Helper.busInfoById(9),
          Helper.getHorariosByIdBusIdDia(9, 1),
          Helper.getHorariosByIdBusIdDia(9, 7),
        ]);

        if (data3.length > 0) {
          data3[0].horarios.sort();
        }
        setRutabusPAData(data1.length > 0 ? data1[0] : null);
        setRutabusPADataLunes(data2.length > 0 ? data2[0] : null);
        setRutabusPADataDomingo(data3.length > 0 ? data3[0] : null);

      } catch (err) {
        console.error('Error fetching data:', err);
        setError('Error al cargar la información');
      } finally {
        setLoading(false);
        setMenuVisible(true);
      }
    };
    fetchData();
  }, [])

  if (loading) {
    return <Loader />;
  }

  return (
    <IonContent ref={ionContentRefDo}>
      {rutabusPAData && (
        <>
          <Banner
            image={rutabusPAData.image}
            empresaNombre={rutabusPAData.empresaNombre}
            origen={rutabusPAData.origen}
            destino={rutabusPAData.destino}
            isActive={isActive}
          />

          <MainInfo
            proximo={proximo || ''}
            metodo={rutabusPAData.metodo || ''}
            precio={rutabusPAData.precio || ''}
          />

          {rutabusPADataLunes && (
            <SchedulesTable
              dias="Lunes a viernes"
              horarios={rutabusPADataLunes.horarios}
              destino={rutabusPAData.destino}
              showAll={showAll}
              setShowAll={setShowAll}
            />
          )}

          {rutabusPADataDomingo && (
            <SchedulesTable
              dias="Sábados, domingos y feriados."
              horarios={rutabusPADataDomingo.horarios}
              destino={rutabusPAData.destino}
              showAll={showAll}
              setShowAll={setShowAll}
            />
          )}



          <RecorridosParadas recorridoId="6" center={[-34.46626790546053, -58.91531040524515]} />
          
          <Change path="/home" />
          <Up ionContentRef={ionContentRefDo} />
        </>
      )}
    </IonContent>


  );
}

export default RutabusPA;