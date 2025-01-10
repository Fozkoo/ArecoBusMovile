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

interface pilarExpressPIData {
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

interface pilarExpressPIDataLunes {
  horarios: string[];
}

const PilarExpressPI: React.FC = () => {
  const [pilarExpressPIData, setPilarExpressPIData] = useState<pilarExpressPIData | null>(null);
  const [showAll, setShowAll] = useState<boolean>(false);
  const ionContentRefDo = useRef<HTMLIonContentElement>(null);
  const [isActive, setIsActive] = useState<boolean>(false);
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [proximo, setProximo] = useState<string | null>(null);
  const [pilarExpressPIDataDomingo, setPilarExpressPIDataDomingo] = useState<pilarExpressPIData | null>(null);
  const [pilarExpressPIDataLunes, setPilarExpressPIDataLunes] = useState<pilarExpressPIData | null>(null);
  const { setMenuVisible } = useMenu();

  useEffect(() => {
    const fetchData = async () => {
      try {
        let data;
        if (helperExport.diaHoy >= 1 && helperExport.diaHoy <= 5) {
          data = await Helper.getHorariosByIdBusIdDia(8, 1);
        } else if (helperExport.diaHoy === 6 || helperExport.diaHoy === 7) {
          data = await Helper.getHorariosByIdBusIdDia(8, 7);
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
          Helper.busInfoById(8),
          Helper.getHorariosByIdBusIdDia(8, 1),
          Helper.getHorariosByIdBusIdDia(8, 7),
        ]);

        if (data3.length > 0) {
          data3[0].horarios.sort();
        }
        setPilarExpressPIData(data1.length > 0 ? data1[0] : null);
        setPilarExpressPIDataLunes(data2.length > 0 ? data2[0] : null);
        setPilarExpressPIDataDomingo(data3.length > 0 ? data3[0] : null);

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
      {pilarExpressPIData && (
        <>
          <Banner
            image={pilarExpressPIData.image}
            empresaNombre={pilarExpressPIData.empresaNombre}
            origen={pilarExpressPIData.origen}
            destino={pilarExpressPIData.destino}
            isActive={isActive}
          />

          <MainInfo
            proximo={proximo || ''}
            metodo={pilarExpressPIData.metodo || ''}
            precio={pilarExpressPIData.precio || ''}
          />

          {pilarExpressPIDataLunes && (
            <SchedulesTable
              dias="Lunes a viernes"
              horarios={pilarExpressPIDataLunes.horarios}
              destino={pilarExpressPIData.destino}
              showAll={showAll}
              setShowAll={setShowAll}
            />
          )}

          {pilarExpressPIDataDomingo && (
            <SchedulesTable
              dias="Sábados, domingos y feriados."
              horarios={pilarExpressPIDataDomingo.horarios}
              destino={pilarExpressPIData.destino}
              showAll={showAll}
              setShowAll={setShowAll}
            />
          )}



          <RecorridosParadas recorridoId="1"/>
          
          <Change path="/home" />
          <Up ionContentRef={ionContentRefDo} />
        </>
      )}
    </IonContent>
  );
}

export default PilarExpressPI;