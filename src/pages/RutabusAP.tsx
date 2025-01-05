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

interface rutabusAPData {
  image: string;
  empresaNombre: string;
  origen: "Areco";
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

const RutabusAP: React.FC = () => {
  const [rutabusAPData, setRutabusAPData] = useState<rutabusAPData | null>(null);
  const [showAll, setShowAll] = useState<boolean>(false);
  const ionContentRefDo = useRef<HTMLIonContentElement>(null);
  const [isActive, setIsActive] = useState<boolean>(false);
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [proximo, setProximo] = useState<string | null>(null);
  const [rutabusAPDataDomingo, setRutabusAPDataDomingo] = useState<rutabusAPData | null>(null);
  const [rutabusAPDataLunes, setRutabusAPDataLunes] = useState<rutabusAPData | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        let data;
        if (helperExport.diaHoy >= 1 && helperExport.diaHoy <= 5) {
          data = await Helper.rutabusInfoHorariosLunes();
        } else if (helperExport.diaHoy === 6 || helperExport.diaHoy === 7) {
          data = await Helper.rutabusInfoHorariosDomingo();
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
          Helper.rutabusInfo(),
          Helper.rutabusInfoHorariosLunes(),
          Helper.rutabusInfoHorariosDomingo(),
        ]);

        if (data3.length > 0) {
          data3[0].horarios.sort();
        }

        setRutabusAPData(data1.length > 0 ? data1[0] : null);
        setRutabusAPDataLunes(data2.length > 0 ? data2[0] : null);
        setRutabusAPDataDomingo(data3.length > 0 ? data3[0] : null);
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

  return (
    <IonContent ref={ionContentRefDo}>
      {rutabusAPData && (
        <>
          <Banner
            image={rutabusAPData.image}
            empresaNombre={rutabusAPData.empresaNombre}
            origen="Areco"
            destino={rutabusAPData.destino}
            isActive={isActive}
          />

          <MainInfo
            proximo={proximo || ''}
            metodo={rutabusAPData.metodo || ''}
            precio={rutabusAPData.precio || ''}
          />

          {rutabusAPDataLunes && (
            <SchedulesTable
              dias="Lunes a Viernes"
              horarios={rutabusAPDataLunes.horarios}
              destino={rutabusAPData.destino}
              showAll={showAll}
              setShowAll={setShowAll}
            />
          )}

          {rutabusAPDataDomingo && (
            <SchedulesTable
              dias="Sabados, Domingos y Feriados"
              horarios={rutabusAPDataDomingo.horarios}
              destino={rutabusAPData.destino}
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

export default RutabusAP;