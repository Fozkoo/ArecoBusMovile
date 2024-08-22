import React, { useEffect, useState } from 'react';
import { IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle } from '@ionic/react';
import { Link } from 'react-router-dom';
import helper from '../service/Helper';

interface Bus {
  id: number;
  path: string;
  image: string;
  empresaNombre: string;
  destino: string;
  precio: number;
  horarios: string[];
}

function getNextSchedule(horarios: string[]): string | null {
  const now = new Date();
  const nowTime = now.getHours() * 60 + now.getMinutes(); // Tiempo actual en minutos

  let nextSchedule: string | null = null;
  let nextTimeDifference = Number.MAX_VALUE;

  for (const horario of horarios) {
    const [hours, minutes] = horario.split(':').map(Number);
    const scheduleTime = hours * 60 + minutes; // Horario en minutos desde medianoche
    const timeDifference = scheduleTime - nowTime;

    if (timeDifference > 0 && timeDifference < nextTimeDifference) {
      nextTimeDifference = timeDifference;
      nextSchedule = horario;
    }
  }

  if (nextSchedule) {
    // Convertir a formato "HH:mm" con ceros a la izquierda si es necesario
    const [hours, minutes] = nextSchedule.split(':').map(Number);
    const formattedHours = hours.toString().padStart(2, '0');
    const formattedMinutes = minutes.toString().padStart(2, '0');
    return `${formattedHours}:${formattedMinutes}`;
  }

  return null;
}

function Card2() {
  const [data, setData] = useState<Bus[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await helper.realData();
        setData(data);
      } catch (err) {
        console.log(err + " error");
      } finally {
        setLoading(false);
      }
    };

    fetchData();

    // Set interval to refresh data every minute (60000 ms)
    const intervalId = setInterval(() => {
      fetchData();
    }, 60000);

    // Clear interval on component unmount
    return () => clearInterval(intervalId);
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="card-container flex gap-3 flex-wrap">
      {data.map((bus) => (
        <IonCard
          key={bus.id}
          className="fixed-card-size w-[300px] h-[400px] transition-transform duration-300 ease-in-out transform hover:scale-105"
        >
          <img
            alt={bus.empresaNombre}
            src={bus.image}
            className="card-image w-[100%] h-[200px] object-cover"
          />
          <IonCardHeader>
            <IonCardTitle>{bus.empresaNombre}</IonCardTitle>
            <IonCardSubtitle>
              <div className='flex gap-1'>
                Destino: 
                <p className='font-bold text-black'>{bus.destino}</p>
              </div>
            </IonCardSubtitle>
          </IonCardHeader>

          <IonCardContent>
            <div className="flex gap-1">
              <p>Precio: </p> 
              <p className="text-black font-bold">$ {bus.precio}</p>
            </div>
            <div className='flex gap-1'>
              <p>Próximo horario:</p>
              <p className='text-black font-bold'>{getNextSchedule(bus.horarios)}</p>
            </div>
            <Link to={bus.path} className='text-black'>Ver más detalles</Link>
          </IonCardContent>
        </IonCard>
      ))}
    </div>
  );
}

export default Card2;
