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
import methods from "../service/Helper";
import { MapContainer, TileLayer, useMap } from "react-leaflet";

import "..//theme/variables.css"
import RecorridosParadas from "../components/RecorridosParadas";

interface MasterbusData {
  image: string;
  empresaNombre: string;
  origen: "Areco";
  destino: string;
  horarios: string[];
  puntoPartida: string;
  proximoHorario?: string;
}

const PruebaRapida: React.FC = () => {
  const [masterbusData, setMasterbusData] = useState<MasterbusData | null>(null);
  const [showAll, setShowAll] = useState<boolean>(false);
  const ionContentRefDo = useRef<HTMLIonContentElement>(null);
  const [isActive, setIsActive] = useState<boolean>(false);
  const [data, setData] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
 const [masterbusDataDomingo, setMasterbusDataDomingo] = useState<MasterbusData | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data1 = await Helper.masterbusInfo();
        if (Array.isArray(data1) && data1.length > 0) {
          data1[0].horarios.sort();
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






  return (
    <>
      <IonContent ref={ionContentRefDo}>
        {masterbusData ? (
          <>

            <Banner
              image={masterbusData.image}
              empresaNombre={masterbusData.empresaNombre}
              origen="Areco"
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
              dias="Lunes a Viernes"
              horarios={masterbusData.horarios}
              destino={masterbusData.destino}
              formatHoraAmPm={helperExport.formatHoraAmPm}
              showAll={showAll}
              setShowAll={setShowAll}
            />

            {masterbusDataDomingo && (
              <SchedulesTable
                dias="Sabados, Domingos y Feriados"
                horarios={masterbusDataDomingo.horarios}
                destino={masterbusData.destino}
                formatHoraAmPm={helperExport.formatHoraAmPm}
                showAll={showAll}
                setShowAll={setShowAll}
              />
            )}

            <RecorridosParadas/>
            
            
            <Change 
            path="/home"
            />
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