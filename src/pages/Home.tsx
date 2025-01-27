import { useEffect, useState } from 'react';
import { IonApp, IonButton, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonContent } from '@ionic/react';
import '../theme/variables.css';
import Loader from '../components/Loader';
import ErrorPage from './ErrorPage';
import helper from "../service/Helper";
import helperExport from "..//service/FunctionsHelper";
import { Link } from 'react-router-dom';
import "..//theme/variables.css";
import { useMenu } from '../context/MenuContextProps';


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
  const [userLocation, setUserLocation] = useState<{ latitude: number, longitude: number } | null>(null);
  const { setMenuVisible } = useMenu();

  useEffect(() => {
    const fetchData = async () => {
      try {
        let data;
        if (helperExport.diaHoy >= 1 && helperExport.diaHoy <= 5) {
          data = await helper.infoBusesById(1);
        } else if (helperExport.diaHoy === 6) {
          data = await helper.infoBusesById(6);
        } else if (helperExport.diaHoy === 7) {
          data = await helper.infoBusesById(7);
        }

        setData(data);
        console.log(data)
      } catch (err) {
        setError("Error al cargar los datos.");
      } finally {
        setLoading(false);
        setMenuVisible(true);
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

  function obtenerUbicacion() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function (posicion) {
        const latitud = posicion.coords.latitude;
        const longitud = posicion.coords.longitude;
        setUserLocation({ latitude: latitud, longitude: longitud });
        console.log(latitud, longitud);
      }, function (error) {
        console.error("Error al obtener la ubicación: " + error.message);
        setUserLocation(null);
      });
    } else {
      console.error("La geolocalización no es soportada por este navegador.");
      setUserLocation(null);
    }
  }

  useEffect(() => {
    obtenerUbicacion();
  }, []);



  if (error) {
    return (
      <div className="h-full">
        <ErrorPage />
      </div>
    );
  }


  if (loading || !imagesLoaded) {
    return <Loader />;
  }

  return (
    <IonApp>
      <IonContent>
        <div className="min-h-screen flex items-center justify-center ">
          <div className="card-container grid gap-x-10 gap-y-4 md:grid-cols-2 lg:grid-cols-3">
            {data.map((bus) => (
              <IonCard
                key={bus.id}
                className="fixed-card-size items-center justify-center bg-gray-50 shadow-xl rounded-3xl w-[300px] h-[410px]"
              >
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
        </div>
      </IonContent>
    </IonApp>
  );
}


export default Home;