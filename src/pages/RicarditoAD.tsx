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


interface RicarditoAdData {
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

const RicarditoAD: React.FC = () => {
  const [ricarditoAdData, setRicarditoAdData] = useState<RicarditoAdData | null>(null);
  const [showAll, setShowAll] = useState<boolean>(false);
  const ionContentRefDo = useRef<HTMLIonContentElement>(null);
  const [isActive, setIsActive] = useState<boolean>(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [proximo, setProximo] = useState<string | null>(null);
  const [ricarditoAdDataLunes, setRicarditoAdDataLunes] = useState<RicarditoAdData | null>(null);
  const [ricarditoAdDataDomingo, setRicarditoAdDataDomingo] = useState<RicarditoAdData | null>(null);
  const [ricarditoAdDataSabado, setRicarditoAdDataSabado] = useState<RicarditoAdData | null>(null);
  const [data, setData] = useState<any>(null);  

  useEffect(() => {
    const fetchData = async () => {
      try {
        let data;
        if (helperExport.diaHoy >= 1 && helperExport.diaHoy <= 5) {
          data = await Helper.getHorariosByIdBusIdDia(5,1);
        } else if (helperExport.diaHoy === 6) {
          data = await Helper.getHorariosByIdBusIdDia(5,6);
        } else if (helperExport.diaHoy === 7) {
          data = await Helper.getHorariosByIdBusIdDia(5,7);
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
          Helper.busInfoById(5),
          Helper.getHorariosByIdBusIdDia(5,1),
          Helper.getHorariosByIdBusIdDia(5,6),
          Helper.getHorariosByIdBusIdDia(5,7),
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

        setRicarditoAdData(data1.length > 0 ? data1[0] : null);
        setRicarditoAdDataLunes(data2.length > 0 ? data2[0] : null);
        setRicarditoAdDataSabado(data3.length > 0 ? data3[0] : null);
        setRicarditoAdDataDomingo(data4.length > 0 ? data4[0] : null);


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
      {ricarditoAdData && (
        <>
          <Banner
            image={ricarditoAdData.image}
            empresaNombre={ricarditoAdData.empresaNombre}
            origen="Areco"
            destino={ricarditoAdData.destino}
            isActive={isActive}
          />

          <MainInfo
            proximo={proximo || ""}
            metodo={ricarditoAdData.metodo}
            precio={ricarditoAdData.precio}
          />

          {ricarditoAdDataLunes && (
            <SchedulesTable
              dias="Lunes a iernes"
              horarios={ricarditoAdDataLunes.horarios}
              destino={ricarditoAdData.destino}
              showAll={showAll}
              setShowAll={setShowAll}
            />
          )}

          {ricarditoAdDataSabado && (
            <SchedulesTable
              dias="Sábados"
              horarios={ricarditoAdDataSabado.horarios}
              destino={ricarditoAdData.destino}
              showAll={showAll}
              setShowAll={setShowAll}
            />
          )}

          {ricarditoAdDataDomingo && (
            <SchedulesTable
              dias="Sábados, domingos y feriados."
              horarios={ricarditoAdDataDomingo.horarios}
              destino={ricarditoAdData.destino}
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

export default RicarditoAD;
