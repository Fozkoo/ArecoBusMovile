import React, { useEffect, useState } from "react";
import {
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonIcon,
} from "@ionic/react";
import { Link } from "react-router-dom";
import helper from "../service/Helper";
import { getNextSchedule } from "../service/FunctionsHelper";
import { notificationsCircleOutline } from "ionicons/icons";
import { IonButton } from "@ionic/react";
import { addCircleOutline } from "ionicons/icons";
import Loader from "..//components/LoaderCard";
import TestPage from "../pages/TestPage";
import moment from "moment";
interface Bus {
  id: number;
  path: string;
  image: string;
  empresaNombre: string;
  destino: string;
  precio: number;
  horarios: string[];
}

function Card2() {
  const [data, setData] = useState<Bus[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const horaActual = moment().format("HH:mm:ss");
  console.log(horaActual);
  const proximoColectivo = (horarios: any[]) => {
    let proximo=horarios.find(horario => moment(horario, 'HH:mm:ss').isAfter(moment(horaActual, 'HH:mm:ss')));
    if (proximo) {
      
      const proximoHorario = moment(proximo, 'HH:mm:ss').format('HH:mm');
      return proximoHorario
    } else {
      return "No hay más viajes por hoy";
    }
    
  
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await helper.realData();
        console.log(data);
        setData(data);
      } catch (err) {
        setError("Error al cargar los datos.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();

    const intervalId = setInterval(() => {
      fetchData();
    }, 60000);

    return () => clearInterval(intervalId);
  }, []);

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return (
      <div className="h-full">
        <TestPage />
      </div>
    );
  }

  if (!setData) {
    return (
      <div className="h-full">
        <TestPage />
      </div>
    );
  }

  return (
    <div className="card-container justify-center flex gap-3 flex-wrap">
      {data.map((bus) => (
        <IonCard key={bus.id} className="fixed-card-size w-[300px] h-[1O0%]">
          <div className="container-notificacion  hidden items-center absolute w-full h-[70px]">
            <IonIcon
              onClick={() => alert("Desea activar las notificaciones?")}
              className="text-white text-[45px] ml-auto mr-4 transition-transform duration-300 ease-in-out transform hover:scale-125 cursor-pointer"
              icon={notificationsCircleOutline}
            />
          </div>
          <img
            alt={bus.empresaNombre}
            src={bus.image}
            className="card-image w-[100%] h-[200px] object-cover"
          />

          <IonCardHeader>
            <IonCardTitle>{bus.empresaNombre}</IonCardTitle>
            <IonCardSubtitle>
              <div className="flex gap-1">
                <p>Destino:</p>
                <p className="font-semibold text-black">{bus.destino}</p>
              </div>
            </IonCardSubtitle>
          </IonCardHeader>

          <IonCardContent>
            <div className="flex gap-1">
              <p>Precio: </p>
              <p className="text-black font-bold !font-semibold">
                $ {bus.precio}
              </p>
            </div>
            <div className="flex gap-1 items-center">
              <p>Próximo horario:</p>
              <p className="text-black text-center !font-semibold">
                {proximoColectivo(bus.horarios)}
              </p>
            </div>
            <Link
              to={bus.path}
              className="text-black flex items-center mt-3 gap-1"
            >
              <IonButton
                className="w-full"
                style={{ "--background": "#6464f2" }}
              >
                Ver más detalles
                <IonIcon slot="end" icon={addCircleOutline}></IonIcon>
              </IonButton>
            </Link>
          </IonCardContent>
        </IonCard>
      ))}
    </div>
  );
}

export default Card2;
