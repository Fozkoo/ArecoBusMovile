import React, { useEffect, useState } from 'react';
import Helper from '../service/Helper';
import { IonContent } from '@ionic/react';

interface MasterbusData {
  image: string;
  empresaNombre: string;
  destino: string;
  horarios: string[];
  puntoPartida: string;
}

function MasterbusAG() {
  const [masterbusData, setMasterbusData] = useState<MasterbusData | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data: MasterbusData[] = await Helper.masterbusInfo();
        const singleObject = data.length === 1 ? data[0] : null;
        setMasterbusData(singleObject);
        console.log(singleObject);
      } catch (err) {
        console.log(err + " error");
      }
    };
    fetchData();
  }, []);

  if (!masterbusData) {
    return <div>Loading...</div>; // Mostrar un mensaje de carga mientras se obtienen los datos
  }

  return (
    <>
    <IonContent>
        <div className="container-title-and-info overflow-hidden flex flex-col justify-center items-center w-full h-[180px] mt-7">
          <img className="w-[100%] h-[600px] brightness-50" src={masterbusData.image} alt="Imagen de la empresa" />
          <section className="absolute">
            <div className="container-title flex justify-center w-full">
              <h1 className="font-bold text-6xl max-lg:text-4xl text-white">
                {masterbusData.empresaNombre}
              </h1>
            </div>
            <div className="destination w-full flex justify-center">
              <p className="font-semibold text-2xl max-lg:text-xl text-white">
                Areco - {masterbusData.destino}
              </p>
            </div>
          </section>
        </div>

        <div className="container-horarios flex flex-col items-center mb-5 p-5">
          <h2 className="font-semibold text-4xl mt-5">HORARIOS</h2>

          <section className="lun-sab">
            <div className="container-lun-sab flex flex-col flex-wrap items-center justify-center mt-8 mb-8 w-full">
              <div className="container-title">
                <h2 className="font-semibold text-2xl">LUNES A SÁBADOS</h2>
              </div>

              <div className="container-options-lun-sab w-[60%] flex justify-center flex-wrap gap-5 mt-5 max-lg:w-[80%]">
                {masterbusData.horarios?.map((hora, index) => (
                  <button
                    key={index}
                    type="button"
                    className="focus:outline-none text-white text-sm py-2.5 px-5 border-b-4 border-blue-600 rounded-md bg-blue-500 hover:bg-blue-400"
                  >
                    {hora}
                  </button>
                ))}
              </div>
            </div>
          </section>
        </div>

        <section className="punto-partida ">
          <div className="container-punto-de-partida flex justify-center  h-[600px]">
            <div className="title-punto-partida flex flex-col w-[60%]">
              <div className="container-title-punto-partida flex flex-col  justify-center items-center">
                <h2 className="font-semibold text-2xl">PUNTO DE PARTIDA</h2>
                <h2 className='font-semibold text-xl text-gray-600'>{masterbusData.puntoPartida}</h2>
              </div>

              <div className="container-iframe flex  justify-center mt-5 h-[500px] rounded-xl overflow-hidden">
              </div>
            </div>
          </div>
        </section>

        <section className="precios flex justify-center h-[500px]">
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

export default MasterbusAG;
