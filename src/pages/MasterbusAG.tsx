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
  metodo: string;
  precio: string;
}

const MasterbusAG: React.FC = () => {
  const [masterbusData, setMasterbusData] = useState<MasterbusData | null>(null);
  const [showAll, setShowAll] = useState<boolean>(false);
  const ionContentRefDo = useRef<HTMLIonContentElement>(null);
  const [isActive, setIsActive] = useState<boolean>(false);
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [proximo, setProximo] = useState<string | null>(null);
  const [masterbusDataDomingo, setMasterbusDataDomingo] = useState<MasterbusData | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        let data;
        if (helperExport.diaHoy >= 1 && helperExport.diaHoy <= 5) {
          data = await Helper.getHorariosByIdBusIdDia(4,1);
        } else if (helperExport.diaHoy === 6 || helperExport.diaHoy === 7) {
          data = await Helper.getHorariosByIdBusIdDia(4,7);
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
        const [data1, data3] = await Promise.all([
          Helper.busInfoById(4),
          Helper.getHorariosByIdBusIdDia(4,7)
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
  }, [])


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
              proximo={proximo || ""}
              metodo={masterbusData.metodo}
              precio={masterbusData.precio}
            />

            <SchedulesTable
              dias="Lunes a viernes"
              horarios={masterbusData.horarios}
              destino={masterbusData.destino}
              showAll={showAll}
              setShowAll={setShowAll}
            />

            {masterbusDataDomingo && (
              <SchedulesTable
                dias="Sábados, domingos y feriados."
                horarios={masterbusDataDomingo.horarios}
                destino={masterbusData.destino}
                showAll={showAll}
                setShowAll={setShowAll}
              />
            )}

            {/* 
          <RecorridosParadas />
        */}


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

export default MasterbusAG;