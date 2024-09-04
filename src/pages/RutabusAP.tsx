import React, { useEffect, useState } from 'react';
import Helper from '../service/Helper';
import { IonContent } from '@ionic/react';
import Header from '../components/Header';
import TestPage from './TestPage';
import Loader from '../components/Loader'; // Asegúrate de importar tu componente Loader


interface RutabusData {
  image: string;
  empresaNombre: string;
  destino: string;
  horarios: string[];
  puntoPartida: string;
}


function RutabusAP() {
  const [rutabusInformacion, setRutabusInformacion] = useState<RutabusData | null>(null);
  const [rutabusData, setRutabusData] = useState<RutabusData | null>(null);
  const [rutabusDataDomingo, setRutabusDataDomingo] = useState<RutabusData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [data1, data2, data3] = await Promise.all([
          Helper.rutabusInfo(),
          Helper.rutabusInfoHorariosLunes(),
          Helper.rutabusInfoHorariosDomingo(),
        ]);

        if (data2.length > 0) {
          data2[0].horarios.sort();  // Ordenar horarios de lunes a viernes
        }

        if (data3.length > 0) {
          data3[0].horarios.sort();  // Ordenar horarios de domingos y feriados
        }

        setRutabusInformacion(data1.length > 0 ? data1[0] : null);
        setRutabusData(data2.length > 0 ? data2[0] : null);
        setRutabusDataDomingo(data3.length > 0 ? data3[0] : null);
      } catch (err) {
        console.error('Error fetching data:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);
  

  if (loading) {
    return <Loader />;
  }

  if (!rutabusData) {
    return (
      <div className="h-full">
        <TestPage />
      </div>
    );
  }

  return (
    <>
      <IonContent>
        <div className="container-header fixed top-0 left-0 w-full bg-white z-50 shadow-sm">
          <Header/>
        </div>

        <div className="container-title-and-info overflow-hidden flex flex-col justify-center items-center w-full h-[180px] mt-10">
          {rutabusInformacion && <img className="w-[100%] h-[600px] brightness-50" src={rutabusInformacion.image} alt="Imagen de la empresa" />}
          <section className="absolute">
            <div className="container-title flex justify-center w-full">
              <h1 className="font-bold text-6xl max-lg:text-4xl text-white">
                {rutabusInformacion?.empresaNombre}
              </h1>
            </div>
            <div className="destination w-full flex justify-center">
              <p className="font-semibold text-2xl max-lg:text-xl text-white">
                Areco - {rutabusInformacion?.destino}
              </p>
            </div>
          </section>
        </div>

        <div className="container-horarios flex flex-col items-center   p-5">
          <h2 className="font-semibold text-4xl mt-5">HORARIOS</h2>
          <section className="lun-sab">
            <div className="container-lun-sab flex flex-col flex-wrap items-center justify-center mt-8 mb-8 w-full">
              <div className="container-title">
                <h2 className="font-semibold text-2xl">LUNES A VIERNES</h2>
              </div>
              <div className="container-options-lun-sab w-[60%] flex justify-center flex-wrap gap-5 mt-5 max-lg:w-[80%]">
              {rutabusData.horarios?.map((hora, index) => (
                  <button
                    key={index}
                    type="button"
                    className="focus:outline-none text-white text-sm py-2.5 px-5 border-b-4 border-blue-600 rounded-md bg-blue-500 hover:bg-blue-400"
                  >
                    {hora.slice(0, 5)}  {/* Esto corta la cadena desde el primer carácter hasta el quinto */}
                  </button>
                ))}
              </div>
            </div>
          </section>

          <section className="sab-dom-fer">
              <div className="container-sab-dom-fer flex flex-col flex-wrap items-center justify-center mt-8 mb-8 w-full">
                <div className="container-title flex justify-center items-center text-center ">
                  <h2 className="font-semibold text-2xl">SABADOS, DOMINGOS Y FERIADOS</h2>
                </div>

                <div className="container-options-sab-dom-fer w-[60%] flex justify-center flex-wrap gap-5 mt-5 max-lg:w-[80%]">
                  {rutabusDataDomingo?.horarios?.map((hora, index) => (
                    <button
                      key={index}
                      type="button"
                      className="focus:outline-none text-white text-sm py-2.5 px-5 border-b-4 border-blue-600 rounded-md bg-blue-500 hover:bg-blue-400"
                    >
                      {hora.slice(0, 5)}
                    </button>
                  ))}
                </div>
              </div>
            </section>









        </div>

        <section className="punto-partida ">
          <div className="container-punto-de-partida flex justify-center  h-[700px]">

            <div className="title-punto-partida flex  flex-col w-[100%] p-11 ">


              <div className="container-title-punto-partida flex flex-col   justify-center items-center">
                <h2 className="font-semibold text-2xl">PUNTO DE PARTIDA</h2>
                <h2 className='font-semibold text-xl text-gray-600'>{rutabusInformacion?.puntoPartida}</h2>
              </div>



              <div className="container-iframe flex  justify-center mt-5 h-[100%] rounded-xl overflow-hidden">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!4v1725291140712!6m8!1m7!1sVep0fKFlLubfdTr_li-IMQ!2m2!1d-34.24556233752934!2d-59.46422813436158!3f91.3146240670629!4f-12.334637154740648!5f0.7820865974627469"
                width="100%"
                height="100%"
                style={{ border: '0' }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
              </div>
            </div>
          </div>
        </section>










        <section className="precios hidden justify-center h-[500px]">
          <div className="container-price flex flex-col items-center  mt-5 mb-5 w-[60%]">
            <div className="container-title-price mt-5 mb-5">
              <h2 className="font-semibold text-3xl">PRECIOS</h2>
            </div>
            <div className="container-table ">
              <table className="w-[1000px] h-[130px] bg-white shadow-lg rounded-xl max-lg:w-[80%]">
                <thead>
                  <tr className="bg-blue-gray-100 text-lg text-gray-700 shadow-sm max-lg:text-sm">
                    <th className="py-3 px-4 text-center">Destino</th>
                    <th className="py-3 px-4 text-center">General</th>
                    <th className="py-3 px-4 text-center">Estudiante</th>
                    <th className="py-3 px-4 text-center">Discapacidad</th>
                  </tr>
                </thead>
                <tbody className="text-blue-gray-900 text-lg font-semibold max-lg:text-sm">
                  <tr className="border-b border-blue-gray-200">
                    <td className="py-3 px-4 text-center">Pilar</td>
                    <td className="py-3 px-4 text-center">980$</td>
                    <td className="py-3 px-4 text-center">500$</td>
                    <td className="py-3 px-4 text-center">0$</td>
                  </tr>
                  <tr className="border-b border-blue-gray-200">
                    <td className="py-3 px-4 text-center">Parque Sakura</td>
                    <td className="py-3 px-4 text-center">680$</td>
                    <td className="py-3 px-4 text-center">350$</td>
                    <td className="py-3 px-4 text-center">0$</td>
                  </tr>
                </tbody>
              </table>
              <div className="w-full pt-5 px-4 mb-8 mx-auto "></div>
            </div>
          </div>
        </section>

      </IonContent>
    </>
  );
}

export default RutabusAP;