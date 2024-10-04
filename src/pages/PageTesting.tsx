import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import Helper from '../service/Helper';
import { IonContent } from '@ionic/react';

function PageTesting() {
    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await Helper.rutabusInfoHorariosLunes();
                setData(response);
            } catch (error) {
                console.log(error);
            }
        };
        fetchData();
    }, []);

    return (
        <>
            <Header />

            <IonContent>
                <div className="container-page flex flex-col m-[3%]">
                    <div className="bg-red-500 mt-[80px] bg-cover bg-center h-[177px] rounded-xl shadow-lg relative" style={{ backgroundImage: "url('https://i.ibb.co/NjKqjg2/masterbus-bus.jpg')" }}>
                        <div className="absolute inset-0 rounded-xl bg-gray-700 bg-opacity-60 flex flex-col justify-center items-center p-4">
                            <h1 className="text-white text-4xl font-bold mb-2">Rutabus</h1>
                            <nav className="text-white">
                                <ul className="flex space-x-2 text-sm">
                                    <p className='font-semibold'>Areco &gt; Pilar</p>
                                </ul>
                            </nav>
                        </div>
                    </div>

                    <section className="horarios mt-10">
                        <div className="container-title mx-5 rounded-lg p-1">
                            <h2 className="font-bold text-center text-black text-2xl tracking-wide">
                                ¡Conoce los horarios disponibles!
                            </h2>
                        </div>

                        <div className="container-lun-vier bg-white  border-gray-200 mx-2 rounded-xl shadow-lg text-black text-center flex flex-col p-6 ">
                            <h2 className="mt-2 text-2xl bg-[#6464f2] rounded-lg text-white font-semibold py-2">
                                Lunes a Viernes
                            </h2>

                            <div className="container-buttons bg-gray-100 rounded-xl p-2 mt-4 gap-2 flex flex-wrap justify-center items-center shadow-inner">
                                {data.length > 0 && data[0].horarios.map((horario, index) => (
                                    <button
                                        key={index}
                                        className="bg-[#6464f2] text-white font-semibold py-2 px-6 rounded-lg shadow-md transition-transform transform hover:scale-105 hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 m-2"
                                    >
                                        {horario.slice(0, 5)}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </section>



                </div>
            </IonContent>
        </>
    );
}

export default PageTesting;
