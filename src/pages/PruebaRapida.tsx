import React, { useState, useEffect, useRef } from "react";
import { IonContent, IonHeader } from "@ionic/react";
import Helper from "../service/Helper";
import Header from "../components/Header";
import Up from "../components/Up";
import Banner from "../components/Banner";
import SchedulesTable from "../components/SchedulesTable";
import StartPoint from "../components/StartPoint";
import Loader from "../components/Loader";
import MainInfo from "../components/MainInfo";
import Change from "../components/Change";
import MapViewDos from "../components/Prueba";
import helperExport from "../service/FunctionsHelper"; 

interface MasterbusData {
  image: string;
  empresaNombre: string;
  origen: string;
  destino: string;
  horarios: string[];
  puntoPartida: string;
  proximoHorario?: string; // Añadir campo para el próximo horario
}

const PruebaRapida: React.FC = () => {
  const [masterbusData, setMasterbusData] = useState<MasterbusData | null>(null);
  const [showAll, setShowAll] = useState<boolean>(false);
  const ionContentRefDo = useRef<HTMLIonContentElement>(null);
  const [isActive, setIsActive] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data1 = await Helper.masterbusInfo();
        if (Array.isArray(data1) && data1.length > 0) {
          data1[0].horarios.sort(); // Ordena los horarios
          setMasterbusData({
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
      setMasterbusData((prevData) =>
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

  const iframeSrc = "https://maps.google.com/?q=Punto+de+Partida&output=embed";

  return (
    <>
      <IonContent ref={ionContentRefDo}>
        {masterbusData ? (
          <>
            <IonHeader>
              <Header />
            </IonHeader>
            <Banner
              image={masterbusData.image}
              empresaNombre={masterbusData.empresaNombre}
              origen={masterbusData.origen}
              destino={masterbusData.destino}
              isActive={isActive}
            />

            <MainInfo
              proximo={masterbusData.proximoHorario || masterbusData.horarios[0]} 
              formatHoraAmPm={helperExport.formatHoraAmPm}
              metodo="EFECTIVO"
              precio="$1250"
            />

            <SchedulesTable
              horarios={masterbusData.horarios}
              destino={masterbusData.destino}
              formatHoraAmPm={helperExport.formatHoraAmPm}
              showAll={showAll}
              setShowAll={setShowAll}
            />

            <StartPoint puntoPartida={masterbusData.puntoPartida} src={iframeSrc} />

            <MapViewDos />

            <Change />
            <Up ionContentRef={ionContentRefDo} />
          </>
        ) : (
          <Loader />
        )}
      </IonContent>
    </>
  );
};

export default PruebaRapida;
