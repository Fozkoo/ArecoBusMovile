import { IonApp, IonContent} from '@ionic/react';
import { useState, useEffect } from 'react';
import '../theme/variables.css';
import MapView from '../components/MapView';
import Loader from '../components/Loader';
import methods from '../service/Helper';
import "../theme/variables.css";
import 'react-spring-bottom-sheet/dist/style.css';
import PersistentBottomSheet from "../components/PersistentBottomSheet";
import CardPuntoSube from '../components/CardPuntosSube';
import FunctionsHelper from "..//service/FunctionsHelper";
import { FiSearch } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import "..//theme/variables.css";
import { useMenu } from '../context/MenuContextProps';


function PuntosSube() {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<any[]>([]);
  const [userLocation, setUserLocation] = useState<{ latitude: number, longitude: number } | null>(null);
  const [error, setError] = useState<string | null>(null);
  const { setMenuVisible } = useMenu();


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await methods.getAllPuntosSube();
        setData(response);
      } catch (error) {
        console.error(error);
        setError("Error al cargar los datos." + error);
      } finally {
        setLoading(false);
        setMenuVisible(true);
      }
    };
    fetchData();
  }, []);





  function obtenerUbicacion() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function (posicion) {
        const latitud = posicion.coords.latitude;
        const longitud = posicion.coords.longitude;
        setUserLocation({ latitude: latitud, longitude: longitud });
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



  const puntosOrdenados = data
    .map((punto) => {
      if (userLocation) {
        const [lat, lon] = punto.geocode;
        const distance = FunctionsHelper.calcularDistancia(
          userLocation.latitude,
          userLocation.longitude,
          parseFloat(lat),
          parseFloat(lon)
        );
        return { ...punto, distance };
      }
      return { ...punto, distance: Infinity };
    })
    .sort((a, b) => a.distance - b.distance);


  return (
    <IonApp>
      <IonContent className="relative !z-50">
        {loading ? (
          <Loader />
        ) : (
          <div className=''>
            <Link to="/SearchLocality">
              <div className="flex absolute items-center justify-center mt-5 w-full z-50">
                <div className='flex justify-center items-center w-[95%]  rounded-full shadow-md px-4 py-2 bg-white'>
                  <FiSearch className="text-gray-500 mr-2" size={20} />
                  <input
                    type="text"
                    placeholder="Buscar por localidad"
                    className="w-full outline-none text-gray-700 placeholder-gray-400"
                  />
                </div>
              </div>
            </Link>

            <div className="container-page h-full pt-[0px] flex items-center mt-0 p-0 flex-col">
              <div className="container-map z-20 mt-0 flex w-full h-[100vh] shadow-2xl overflow-hidden items-center justify-center">
                <MapView />
              </div>

              <PersistentBottomSheet>
                <div className="container-title-punto-sube flex justify-center items-center text-center flex-col w-full">
                  <p className="persistentbottomtitle text-base text-white w-11/12 bg-[#3B82F6]   p-1 rounded-full font-semibold ">
                    ¡Descubre tu punto SUBE más cercano!
                  </p>
                </div>

                <div className="container-cards flex flex-col gap-3 my-3">
                  {puntosOrdenados.map((punto, index) => {
                    let distanceLabel =
                      punto.distance < 1
                        ? `${(punto.distance * 1000).toFixed(0)} m`
                        : `${punto.distance.toFixed(2)} km`
                    return (
                      <CardPuntoSube
                        key={index}
                        nombre={punto.nombre}
                        descripcion={punto.descripcion}
                        distance={userLocation ? distanceLabel : "Ubicación no disponible"}
                        horario={punto.horariosapertura}
                        urlimagen={punto.urlimagen}
                        urllogo={punto.urlimagen}
                      />
                    );
                  })}
                </div>
              </PersistentBottomSheet>
            </div>
          </div>


        )}
      </IonContent>
    </IonApp>
  );
}
export default PuntosSube;

