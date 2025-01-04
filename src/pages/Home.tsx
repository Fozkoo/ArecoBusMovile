import { useEffect, useState } from 'react';
import { IonApp, IonButton, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonContent, IonIcon } from '@ionic/react';
import '../theme/variables.css';
import Loader from '../components/Loader';
import TestPage from './ErrorPage';
import helper from "../service/Helper";
import helperExport from "..//service/FunctionsHelper";
import { Link } from 'react-router-dom';
import "..//theme/variables.css";


interface Bus {
  id: number;
  path: string;
  image: string;
  origen: string;
  empresaNombre: string;
  destino: string;
  precio: number;
  horarios: string[];
}

function Home() {
  const [loading, setLoading] = useState(true);
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const [data, setData] = useState<Bus[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loadedImages, setLoadedImages] = useState<string[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        let data;
        if (helperExport.diaHoy >= 1 && helperExport.diaHoy <= 5) {
          data = await helper.infoBusesIdLunes();
        } else if (helperExport.diaHoy === 6) {
          data = await helper.infoBusesIdSabados();
        } else if (helperExport.diaHoy === 7) {
          data = await helper.infoBusesIdDomingo();
        }

        setData(data);
      } catch (err) {
        setError("Error al cargar los datos.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();

    const intervalId = setInterval(fetchData, 60000);
    const updateNextBusInterval = setInterval(() => {
      setData((prevData) =>
        prevData.map((bus) => ({
          ...bus,
          proximoHorario: helperExport.proximoColectivo(bus.horarios)
        }))
      );
    }, 10000);

    return () => {
      clearInterval(intervalId);
      clearInterval(updateNextBusInterval);
    };
  }, [helperExport.diaHoy]);

  useEffect(() => {
    if (!loading && data.length > 0) {
      const totalImages = data.length;
      let loadedImagesCount = 0;

      data.forEach((bus) => {
        const cachedImage = localStorage.getItem(bus.image);
        if (cachedImage) {
           // console.log(`Imagen cargada desde la caché: ${bus.image}`);
          loadedImagesCount += 1;
          setLoadedImages((prev) => [...prev, bus.image]);
          if (loadedImagesCount === totalImages) {
            setImagesLoaded(true);
          }
        } else {
          const img = new Image();
          img.src = bus.image;
          img.onload = () => {
            // console.log(`Imagen cargada desde la URL: ${bus.image}`);
            loadedImagesCount += 1;
            setLoadedImages((prev) => [...prev, bus.image]);
            localStorage.setItem(bus.image, bus.image);
            if (loadedImagesCount === totalImages) {
              setImagesLoaded(true);
            }
          };
          img.onerror = () => {
            console.error(`Error al cargar la imagen: ${bus.image}`);
            loadedImagesCount += 1;
            if (loadedImagesCount === totalImages) {
              setImagesLoaded(true);
            }
          };
        }
      });
    }
  }, [loading, data]);

  if (error) {
    return (
      <div className="h-full">
        <TestPage />
      </div>
    );
  }


  if (loading || !imagesLoaded) {
    return <Loader />;
  }



  return (
    <IonApp>
      <IonContent>
        {/*
        <div className="container-header fixed top-0 left-0 w-full bg-white  z-50 shadow-sm">
          <Header />
        </div>
        */}

                {/* aca saque el mt-20!!*/}
        <div className="card-container mt-5 justify-center bg-red flex gap-3  flex-wrap">
          {data.map((bus) => (
            <IonCard key={bus.id} className="fixed-card-size bg-gray-50 shadow-xl rounded-3xl w-[300px] h-[100%]">
              {loadedImages.includes(bus.image) && (
                <img
                  alt={bus.empresaNombre}
                  src={bus.image}
                  className="card-image p-2 !rounded-3xl w-[100%] h-[200px] object-cover"
                />
              )}
              <IonCardHeader>
                <IonCardTitle className="font-semibold">{bus.empresaNombre}</IonCardTitle>
                <IonCardSubtitle>
                  <div className="flex gap-1">
                    <p className="font-normal text-gray-500">Destino:</p>
                    <p className="font-semibold text-black">{bus.destino}</p>
                  </div>
                </IonCardSubtitle>
              </IonCardHeader>
              <IonCardContent>
                <div className="flex gap-1">
                  <p className="font-medium text-gray-500">Precio: </p>
                  <p className="text-black !font-semibold">${bus.precio}</p>
                </div>
                <div className="flex gap-1 items-center">
                  <p className="font-medium text-gray-500">Próximo Viaje:</p>
                  <p className="text-black text-center !font-semibold">
                    {helperExport.proximoColectivo(bus.horarios)}
                  </p>
                </div>
                <Link to={bus.path} className="flex justify-center items-center mt-3 gap-1">
                  <IonButton className="w-[75%] h-6 text-center hover:scale-105 transition-transform duration-200">
                    Ver más detalles
                  </IonButton>
                </Link>
              </IonCardContent>
            </IonCard>
          ))}
        </div>
      </IonContent>
    </IonApp>
  );
}

export default Home;