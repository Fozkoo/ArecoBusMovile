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
  const [rutabusAPDataDomingo, setRutabusAPDataDomingo] = useState<rutabusAPData | null>(null);
  const [rutabusAPDataLunes, setRutabusAPDataLunes] = useState<rutabusAPData | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data1 = await Helper.rutabusInfoHorariosLunes();
        if (Array.isArray(data1) && data1.length > 0) {
          data1[0].horarios.sort();
          setRutabusAPData({
            ...data1[0],
            proximoHorario: helperExport.proximoColectivo(data1[0].horarios),
          });


          setIsActive(isActiveFunction());
        } else {
          console.error("Unexpected data format:", data1);
        }
      } catch (err) {
        console.error("Error fetching data:", err);
      }
    };

    fetchData();


    const updateNextBusInterval = setInterval(() => {
      setRutabusAPData((prevData) =>
        prevData
          ? {
            ...prevData,
            proximoHorario: helperExport.proximoColectivo(prevData.horarios),
          }
          : prevData
      );
    }, 10000);

    return () => {
      clearInterval(updateNextBusInterval);
    };
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


  function isActiveFunction() {
    const now = new Date(); // Obtiene la hora actual
    const hour = now.getHours(); // Obtiene la hora en formato 24 horas
    const minute = now.getMinutes(); // Obtiene los minutos actuales

    // Convierte la hora actual a minutos desde la medianoche
    const currentTime = hour * 60 + minute;

    // Definir el rango de tiempo en minutos
    const startTime = 6 * 60; // 6:00 AM -> 6 * 60 = 360 minutos
    const endTime = 23 * 60 + 50; // 23:50 PM -> 23 * 60 + 50 = 1430 minutos

    // Verifica si la hora actual está dentro del rango
    return currentTime >= startTime && currentTime <= endTime;
  }




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
            proximo={rutabusAPData.proximoHorario || rutabusAPData.horarios[0]}
            formatHoraAmPm={helperExport.formatHoraAmPm}
            metodo="EFECTIVO"
            precio="$1250"
          />

          {rutabusAPDataLunes && (
            <SchedulesTable
              dias="Lunes a Viernes"
              horarios={rutabusAPDataLunes.horarios}
              destino={rutabusAPData.destino}
              formatHoraAmPm={helperExport.formatHoraAmPm}
              showAll={showAll}
              setShowAll={setShowAll}
            />
          )}

          {rutabusAPDataDomingo && (
            <SchedulesTable
              dias="Sabados, Domingos y Feriados"
              horarios={rutabusAPDataDomingo.horarios}
              destino={rutabusAPData.destino}
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

export default RutabusAP;